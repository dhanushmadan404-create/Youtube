import React from 'react'
import * as YUP from 'yup'
import { useFormik } from "formik"
import "../styles/Form.css"
import Box from "@mui/material/Box"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { loginUser } from '../Redux/Slice/UserSlice.jsx'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const LoginSchemas = YUP.object({
    email: YUP.string("character should be string").required("This value should required").min(4, "Minimum 4 character need ").max(50, 'Do not exist 50 character').email("Invalid Email"),
    password: YUP.string("character should be string").required("This value should required").min(6, "Minimum 6 character need ").max(12, 'Do not exist 12 character'),
  })


  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchemas,
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await dispatch(loginUser({ body: values })).unwrap();
        console.log('login result', result.status);

        if (result.status) {
          console.log(result.email)
          localStorage.setItem("token", result.token);
          localStorage.setItem("email", result.email);
          localStorage.setItem("userid", result.id);
          console.log(localStorage.getItem("token"))
          navigate("/dashboard")
        } else {
          alert(result.message || 'Login failed');
        }

        resetForm();
      } catch (error) {
        console.error('Login error:', error);
        alert(error.message || 'Unexpected login error');
      }
    }
  })
  return (
    <>
      <Box
        component="form"
        className="form"

        onSubmit={LoginForm.handleSubmit}
        noValidate
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>


        <TextField
          label="Email"
          type="email"

          className='Input'
          name="email"
          placeholder="Enter Your Email"
          value={LoginForm.values.email}
          onChange={LoginForm.handleChange}
          onBlur={LoginForm.handleBlur}
          error={LoginForm.touched.email && Boolean(LoginForm.errors.email)}
          helperText={LoginForm.touched.email && LoginForm.errors.email}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          className='Input'
          placeholder="Enter Your Password"
          value={LoginForm.values.password}
          onChange={LoginForm.handleChange}
          onBlur={LoginForm.handleBlur}
          error={LoginForm.touched.password && Boolean(LoginForm.errors.password)}
          helperText={LoginForm.touched.password && LoginForm.errors.password}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Typography variant='p' component="p" gutterBottom>
          Don't have an account? <span className='link' onClick={() => navigate("/register")}>Register</span>
        </Typography>

      </Box>
    </>
  )
}

export default Login