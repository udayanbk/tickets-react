import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { createTicket } from "../api/ticket_api";

const NewTicket = ({ empId }) => {
  const [open, setOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(10, "Title must be at least 10 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    category: Yup.string().required("Category is required"),
    priority: Yup.string().required("Priority is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        empId: empId,
      };
      const res = await createTicket(payload);
      console.log("Ticket created:", res);
      // fetchTickets(); // Refresh list after creation
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create Ticket
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Ticket</DialogTitle>
        <Formik
          initialValues={{
            title: "",
            description: "",
            category: "",
            priority: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            dirty,
            setFieldValue,
          }) => (
            <Form>
              <DialogContent>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={(e) => {
                      const { value } = e.target;
                      if (value && value?.length <= 20) {
                        setFieldValue("title", value);
                      }
                    }}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={
                      touched.title && errors.title
                        ? errors.title
                        : `${values?.title?.length}/20 characters`
                    }
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={(e) => {
                      const { value } = e.target;
                      if (value && value?.length <= 100) {
                        setFieldValue("description", value);
                      }
                    }}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={
                      touched.description && errors.description
                        ? errors.description
                        : `${values?.description?.length}/100 characters`
                    }
                    multiline
                    rows={3}
                  />

                  <FormControl
                    fullWidth
                    error={touched.category && Boolean(errors.category)}
                  >
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Category"
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                    <FormHelperText>
                      {touched.category && errors.category}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={touched.priority && Boolean(errors.priority)}
                  >
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                      labelId="priority-label"
                      name="priority"
                      value={values.priority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Priority"
                    >
                      <MenuItem value={1}>1 - Admin</MenuItem>
                      <MenuItem value={2}>2 - Manager</MenuItem>
                      <MenuItem value={3}>3 - Supervisor</MenuItem>
                      <MenuItem value={4}>4 - Agent</MenuItem>
                    </Select>
                    <FormHelperText>
                      {touched.priority && errors.priority}
                    </FormHelperText>
                  </FormControl>
                </Stack>
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setOpen(false)} color="secondary">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={!dirty || !isValid}
                >
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default NewTicket;
