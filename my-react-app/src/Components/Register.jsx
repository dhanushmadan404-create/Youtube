import React from 'react'
import * as YUP from 'yup'
import { useFormik } from "formik"
import "../styles/Form.css"
import Box from "@mui/material/Box"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
function Register({SetStatus}) {
    const LoginSchemas = YUP.object({
        name: YUP.string("character should be string").required("This value should required").min(4, "Minimum 4 character need ").max(50, 'Do not exist 50 character'),
        email: YUP.string("character should be string").required("This value should required").min(4, "Minimum 4 character need ").max(50, 'Do not exist 50 character').email("Invalid Email"),
        password: YUP.string("character should be string").required("This value should required").min(6, "Minimum 6 character need ").max(12, 'Do not exist 12 character').matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
            "Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special character"
        ),
    })


    const LoginForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",


        },
        validationSchema: LoginSchemas,
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            resetForm()

        }
    })
    return (
        <>
  <Box
  component="form"
  className="form"

  onSubmit={LoginForm.handleSubmit}
  noValidate
>  <Typography variant="h4" component="h1" gutterBottom>
              Register
            </Typography>
    <TextField
    label="Name"
    type="text"
    className='Input'
    name="name"
    placeholder="Enter Your Name"
    value={LoginForm.values.name}
    onChange={LoginForm.handleChange}
    onBlur={LoginForm.handleBlur}
    error={LoginForm.touched.name && Boolean(LoginForm.errors.name)}
    helperText={LoginForm.touched.name && LoginForm.errors.name}
  />
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
      Don you have an account? <span className='link' onClick={() => SetStatus(true)}>Login</span>
    </Typography>
</Box>
        </>
    )
}

export default Register