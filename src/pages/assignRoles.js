import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { getRoles, setUserRole, usersData } from "../api/user_api";

const UserTable = () => {
  const [requestUsers, setRequestUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState({});
  const [searchType, setSearchTYpe] = useState("new");
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    let roles = await getRoles();
    console.log("roles", roles);
    if(roles?.data?.data){
      setRoles(roles?.data?.data)
    }
    let res = await usersData();
    console.log("res", res);
    if (res?.data?.data) {
      setRequestUsers(res.data.data);
    }
    setLoading(false);
  };

  const [selectedRoles, setSelectedRoles] = useState({});

  const handleRoleChange = (empId, value) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [empId]: value,
    }));
  };

  const updateUserRole = async (empId) => {
    const selectedRole = selectedRoles[empId];
    if (selectedRole) {
      const payload = {
        emp_id: empId,
        role: selectedRole,
      };
      console.log("Submitting payload:", payload);
      await setUserRole(payload);
      fetchUsers();
    } else {
      alert("Please select a role first.");
    }
  };

  return (
    <>
      <Navbar />
      <Box display="flex" alignItems="center" gap={2} sx={{ m: 5 }}>
        <Typography variant="h5" gutterBottom>
          Users
        </Typography>
        <Select
          size="small"
          defaultValue=""
          displayEmpty
          sx={{ minWidth: 150 }}
          value={searchType}
          onChange={(e) => setSearchTYpe(e.target.value)}
        >
          <MenuItem value="" disabled>
            Select Option
          </MenuItem>
          <MenuItem value="new">New Requests</MenuItem>
          <MenuItem value="old">Present Users</MenuItem>
        </Select>
      </Box>

      {requestUsers && requestUsers?.length === 0 ? (
        <Box textAlign="left" sx={{ m: 5 }}>
          <Typography variant="h6" color="text.secondary">
            {searchType === "new"
              ? "No new users requests..."
              : "No users available"}
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ m: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Employee Id</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Mobile</strong>
                </TableCell>
                <TableCell>
                  <strong>Assign Role as</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestUsers?.map((user) => (
                <TableRow key={user.emp_id}>
                  {console.log("user", user)}

                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.emp_id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>
                    <Select
                      sx={{ width: "150px" }}
                      size="small"
                      value={selectedRoles[user.emp_id] ?? user.role_id ?? ""}
                      displayEmpty
                      onChange={(e) =>
                        handleRoleChange(user.emp_id, e.target.value)
                      }
                    >
                      <MenuItem value="" disabled>
                        Select
                      </MenuItem>
                      {
                        roles.map(i=>
                          <MenuItem value={i.id}>{i.role_name}</MenuItem>
                        )
                      }
                    </Select>
                    <Button
                      sx={{ ml: 2 }}
                      // disabled={}
                      variant={user.role_id ? "outlined": "contained"}
                      color="success"
                      size="small"
                      onClick={() => {
                        console.log(selectedRoles);
                        updateUserRole(user.emp_id);
                      }}
                    >
                      Apply Role
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserTable;
