import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { login } from "../api/user_api";
// import { useNotification } from "../services/NotificationProvider";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  // const {notify} = useNotification();
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (e, newValue) => setTab(newValue);

  // Yup schemas
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const signupSchema = Yup.object({
    name: Yup.string()
      .max(30, "Name must be at most 30 characters")
      .required("Name is required"),
  
    emp_id: Yup.string()
      .matches(/^\d{1,5}$/, "Employee ID must be a number with up to 5 digits")
      .required("Employee ID is required"),
  
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
  
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
  
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password must be at most 15 characters")
      .required("Password is required"),
  
    role_id: Yup.string()
      .required("Role is required"),
  });
  

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await login(values);
        console.log("res-----------------------------", res)
        if (res?.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        navigate('/home')
        // window.location.href = "/home";
      } catch (err) {
        alert(err.response?.data?.error || "Login failed");
      }
    },
  });

  const signupFormik = useFormik({
    initialValues: {
      name: "",
      emp_id: "",
      role_id: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:5000/api/users/signup", values);
        alert("Signup successful! You can now log in.");
        setTab(0);
      } catch (err) {
        alert(err.response?.data?.error || "Signup failed");
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
      </Box>

      {/* Login Form */}
      {tab === 0 && (
        <Box sx={{ mt: 3 }} component="form" onSubmit={loginFormik.handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
            helperText={loginFormik.touched.email && loginFormik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
            helperText={loginFormik.touched.password && loginFormik.errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      )}

      {/* Signup Form */}
      {tab === 1 && (
        <Box sx={{ mt: 3 }} component="form" onSubmit={signupFormik.handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Signup
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={signupFormik.values.name}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            error={signupFormik.touched.name && Boolean(signupFormik.errors.name)}
            helperText={signupFormik.touched.name && signupFormik.errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Employee ID"
            name="emp_id"
            value={signupFormik.values.emp_id}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            error={signupFormik.touched.emp_id && Boolean(signupFormik.errors.emp_id)}
            helperText={signupFormik.touched.emp_id && signupFormik.errors.emp_id}
          />

          <FormControl
            fullWidth
            margin="normal"
            error={signupFormik.touched.role_id && Boolean(signupFormik.errors.role_id)}
          >
            <InputLabel>Role</InputLabel>
            <Select
              name="role_id"
              label="Role"
              value={signupFormik.values.role_id}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
            >
              <MenuItem value="4">Agent</MenuItem>
              <MenuItem value="3">Supervisor</MenuItem>
              <MenuItem value="2">Manager</MenuItem>
              <MenuItem value="1">Admin</MenuItem>
            </Select>
            <FormHelperText>{signupFormik.touched.role_id && signupFormik.errors.role_id}</FormHelperText>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={signupFormik.values.email}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            error={signupFormik.touched.email && Boolean(signupFormik.errors.email)}
            helperText={signupFormik.touched.email && signupFormik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile No"
            name="mobile"
            value={signupFormik.values.mobile}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            error={signupFormik.touched.mobile && Boolean(signupFormik.errors.mobile)}
            helperText={signupFormik.touched.mobile && signupFormik.errors.mobile}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={signupFormik.values.password}
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            error={signupFormik.touched.password && Boolean(signupFormik.errors.password)}
            helperText={signupFormik.touched.password && signupFormik.errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="success"
            type="submit"
            sx={{ mt: 2 }}
          >
            Signup
          </Button>
        </Box>
      )}
    </Container>
  );
}
