import {
  Avatar,
  Box,
  Button,
  Container,
  Grid2,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import React from "react";
import { useAuthentication } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  // getting the sign up from firebase auth
  const { signUp } = useAuthentication();

  async function NewUserRegister(e) {
    e.preventDefault();

    try {
      //using the formDate to get the form input value
      const data = new FormData(e.currentTarget);

      //implementing the sign up
      await signUp(data.get("email"), data.get("password"), data.get("name"));

      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Container component={"main"} maxWidth="xs">
      <Box
        sx={{
          mt: theme.spacing(10),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          {" "}
          <LockIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          {" "}
          Sign Up
        </Typography>
        <Box component={"form"} sx={{ mt: 3 }} onSubmit={NewUserRegister}>
          <Grid2 container spacing={2}>
            <Grid2 item size={12}>
              <TextField
                name="name"
                id="name"
                autoFocus
                label="Name"
                type="name"
                required
                fullWidth
                autoComplete="given-name"
              ></TextField>
            </Grid2>
            <Grid2 item size={12}>
              <TextField
                name="email"
                id="email"
                label="Email"
                type="email"
                required
                fullWidth
                autoComplete="email"
              ></TextField>
            </Grid2>
            <Grid2 item size={12}>
              <TextField
                name="password"
                id="password"
                label="Password"
                type="password"
                required
                fullWidth
                autoComplete="new-password"
              ></TextField>
            </Grid2>
          </Grid2>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              m: theme.spacing(3, 0, 2),
            }}
          >
            Register
          </Button>

          <Grid2 container justifyContent={"flex-end"}>
            <Grid2 item>
              <Link variant="body2" href="/login">
                Already have an account? Sign In
              </Link>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
