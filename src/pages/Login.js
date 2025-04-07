import React, { useState } from "react";
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
} from "@mui/material";
import axios from "axios";

export default function LoginPage() {
  const [tab, setTab] = useState(0);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    emp_id: "",
    email: "",
    mobile: "",
    password: "",
    role_id: "",
  });

  const handleTabChange = (e, newValue) => setTab(newValue);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        loginData
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/home";
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/signup", signupData);
      alert("Signup successful! You can now log in.");
      setTab(0);
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      )}

      {tab === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Signup
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={signupData.name}
            onChange={(e) =>
              setSignupData({ ...signupData, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Employee ID"
            value={signupData.emp_id}
            onChange={(e) =>
              setSignupData({ ...signupData, emp_id: e.target.value })
            }
          />

          {/* Role Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={signupData.role_id}
              label="Role"
              onChange={(e) =>
                setSignupData({ ...signupData, role_id: e.target.value })
              }
            >
              <MenuItem value="4">Agent</MenuItem>
              <MenuItem value="3">Supervisor</MenuItem>
              <MenuItem value="2">Manager</MenuItem>
              <MenuItem value="1">Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile No"
            value={signupData.mobile}
            onChange={(e) =>
              setSignupData({ ...signupData, mobile: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleSignup}
            sx={{ mt: 2 }}
          >
            Signup
          </Button>
        </Box>
      )}
    </Container>
  );
}
