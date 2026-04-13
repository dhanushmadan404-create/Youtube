import React, { useState } from 'react';
import * as YUP from 'yup';
import { useFormik } from "formik";
import "../styles/Form.css";
import { useDispatch } from 'react-redux';
import { createUser } from '../Redux/Slice/UserSlice.jsx';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [statusMessage, setStatusMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const RegisterSchemas = YUP.object({
        name: YUP.string()
            .required("Name is required")
            .min(4, "Minimum 4 characters")
            .max(50, "Maximum 50 characters"),

        email: YUP.string()
            .required("Email is required")
            .email("Invalid Email")
            .min(4, "Minimum 4 characters")
            .max(50, "Maximum 50 characters"),

        password: YUP.string()
            .required("Password is required")
            .min(6, "Minimum 6 characters")
            .max(12, "Maximum 12 characters"),
    });

    const showStatus = (msg) => {
        setStatusMessage(msg);
        setTimeout(() => setStatusMessage(""), 5000);
    };

    const RegisterForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: RegisterSchemas,
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true);
            try {
                const submissionValues = { ...values, age: 20 };

                const result = await dispatch(createUser({ body: submissionValues })).unwrap();

                if (result.status) {
                    showStatus("Success: Account created! Redirecting to login...");
                    resetForm();

                    setTimeout(() => navigate("/"), 2000);
                } else {
                    showStatus(result.message || "Registration failed");
                }
            } catch (error) {
                console.error("Register error:", error);
                showStatus(error.message || "Error: Failed to create account.");
            } finally {
                setIsLoading(false);
            }
        }
    });

    return (
        <div className="form-container">

            {statusMessage && (
                <div className="status-toast">
                    {statusMessage}
                </div>
            )}

            <form className="premium-form" onSubmit={RegisterForm.handleSubmit}>

                <div className="form-header">
                    <h2 className="typography-h4">Join Our Community</h2>
                    <p className="typography-caption">Create an account to start sharing</p>
                </div>

                <div
                    className="form-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "20px"
                    }}
                >
                    {/* NAME */}
                    <div className="PremiumInput">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className={`custom-input ${RegisterForm.touched.name && RegisterForm.errors.name ? 'error' : ''}`}
                            value={RegisterForm.values.name}
                            onChange={RegisterForm.handleChange}
                            onBlur={RegisterForm.handleBlur}
                        />
                        {RegisterForm.touched.name && RegisterForm.errors.name && (
                            <span className="error-text">{RegisterForm.errors.name}</span>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div className="PremiumInput">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            className={`custom-input ${RegisterForm.touched.email && RegisterForm.errors.email ? 'error' : ''}`}
                            value={RegisterForm.values.email}
                            onChange={RegisterForm.handleChange}
                            onBlur={RegisterForm.handleBlur}
                        />
                        {RegisterForm.touched.email && RegisterForm.errors.email && (
                            <span className="error-text">{RegisterForm.errors.email}</span>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className="PremiumInput">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Min 6 chars"
                            className={`custom-input ${RegisterForm.touched.password && RegisterForm.errors.password ? 'error' : ''}`}
                            value={RegisterForm.values.password}
                            onChange={RegisterForm.handleChange}
                            onBlur={RegisterForm.handleBlur}
                        />
                        {RegisterForm.touched.password && RegisterForm.errors.password && (
                            <span className="error-text">{RegisterForm.errors.password}</span>
                        )}
                    </div>
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="custom-btn"
                    disabled={isLoading}
                    style={{ width: "100%", marginTop: "10px" }}
                >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                </button>

                {/* FOOTER */}
                <div className="form-footer">
                    <p className="typography-caption">
                        Already have an account?
                        <span
                            className="link"
                            onClick={() => navigate("/")}
                            style={{
                                color: "var(--purple-accent)",
                                cursor: "pointer",
                                marginLeft: "5px",
                                fontWeight: "600"
                            }}
                        >
                            Log In
                        </span>
                    </p>
                </div>

            </form>
        </div>
    );
}

export default Register;