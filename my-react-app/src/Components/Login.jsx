import React, { useState } from 'react'
import * as YUP from 'yup'
import { useFormik } from "formik"
import "../styles/Form.css"
import { useDispatch } from 'react-redux'
import { loginUser } from '../Redux/Slice/UserSlice.jsx'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const LoginSchemas = YUP.object({
    email: YUP.string("character should be string").required("Email is required").min(4, "Minimum 4 characters").max(50, 'Maximum 50 characters').email("Invalid Email"),
    password: YUP.string("character should be string").required("Password is required").min(6, "Minimum 6 characters").max(12, 'Maximum 12 characters'),
  })

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 5000);
  };

  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchemas,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const result = await dispatch(loginUser({ body: values })).unwrap();
        
        if (result.status) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("email", result.email);
          localStorage.setItem("userid", result.id);
          navigate("/dashboard");
        } else {
          showStatus(result.message || 'Login failed');
        }
        resetForm();
      } catch (error) {
        console.error('Login error:', error);
        showStatus(error.message || 'Unexpected login error');
      } finally {
        setIsLoading(false);
      }
    }
  })

  return (
    <div className="form-container">
      {statusMessage && (
        <div className="status-toast">
          {statusMessage}
        </div>
      )}

      <form className="premium-form" onSubmit={LoginForm.handleSubmit}>
        <div className="form-header">
          <h2 className="typography-h4">Welcome Back</h2>
          <p className="typography-caption">Login to continue your journey</p>
        </div>

        <div className="PremiumInput">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className={`custom-input ${LoginForm.touched.email && LoginForm.errors.email ? 'error' : ''}`}
            value={LoginForm.values.email}
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
          />
          {LoginForm.touched.email && LoginForm.errors.email && (
            <span className="error-text">{LoginForm.errors.email}</span>
          )}
        </div>

        <div className="PremiumInput">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Min 6 characters"
            className={`custom-input ${LoginForm.touched.password && LoginForm.errors.password ? 'error' : ''}`}
            value={LoginForm.values.password}
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
          />
          {LoginForm.touched.password && LoginForm.errors.password && (
            <span className="error-text">{LoginForm.errors.password}</span>
          )}
        </div>

        <button 
          type="submit" 
          className="custom-btn" 
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Login"}
        </button>

        <div className="form-footer">
          <p className="typography-caption">
            Don't have an account? 
            <span 
              className="link"
              onClick={() => navigate("/register")} 
            >
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login;