import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getRoles, setNewHierarchy } from "../api/user_api";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Settings = () => {
  const [hierarchy, setHierarchy] = useState([]);
  const [newLevels, setNewLevels] = useState();
  const [fields, setFields] = useState([]);

  useEffect(() => {
    usersHirarchy();
  }, []);

  const usersHirarchy = async () => {
    let resp = await getRoles();
    console.log("resp", resp);
    if (resp?.data?.data) {
      setHierarchy(resp?.data?.data);
    }
  };

  const handleFieldChange = (index, newValue) => {
    const updated = [...fields];
    updated[index] = newValue;
    setFields(updated);
  };


  const newHierarchyHandler = async () => {
    let arr = fields.filter(i=>i!=="");
    console.log("arr-length--",arr.length);
    console.log("newLevels--",newLevels);
    if(arr.length == newLevels){
      let response = await setNewHierarchy({fields, newLevels});
      console.log('response-new--hier', response)
      usersHirarchy();
    }
    else{
      //display error

    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ m: 3 }}>
        <Typography variant="h5" gutterBottom>
          Users Current Roles Hierarchy
        </Typography>

        {hierarchy?.map((item, index) => (
          <Typography key={index} variant="h6" gutterBottom sx={{ ml: 4 }}>
            Level - {index + 1} <ArrowForwardIosIcon fontSize="small" />{" "}
            {item.role_name}
          </Typography>
        ))}

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Create New Hierarchy
        </Typography>

        <Typography>Levels =</Typography>
        <TextField
          inputProps={{ maxLength: 1 }}
          margin="normal"
          type="text"
          value={newLevels}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[3-6]$/.test(value)) {
              setNewLevels(value);
              setFields(Array.from({ length: value }, () => ""));
            }
          }}
        />

        <Box
          sx={{ mt: 3 }}
          component="form"
          // onSubmit={loginFormik.handleSubmit}
        >
          <Typography variant="h5" gutterBottom>
            Specify new Roles in order
          </Typography>
          {console.log("fields", fields)}
          {fields &&
            fields.map((field, index) => (
              <TextField
                sx={{ mr: 3 }}
                margin="normal"
                label={`Level ${index+1}`}
                name="email"
                type="email"
                value={field}
                onChange={(e) => handleFieldChange(index, e.target.value)}
              />
            ))}
        </Box>
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ mt: 2 }}
          onClick={newHierarchyHandler}
        >
          Submit new hierarchy
        </Button>
      </Box>
    </>
  );
};

export default Settings;
