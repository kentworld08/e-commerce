import {
  Avatar,
  Box,
  Button,
  Grid2,
  Link,
  Container,
  CssBaseline,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useAuthentication } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();

  // getting the sign In from firebase auth
  const { signIn } = useAuthentication();

  async function goToLoginPage(event) {
    event.preventDefault();

    const { email, password } = event.target;
    await signIn(email.value, password.value);
    navigate("/");
  }

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={goToLoginPage}
          sx={{
            width: "100%",
            mt: 1,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            autoFocus
            autoComplete="current-email"
          ></TextField>
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            autoFocus
            autoComplete="current-password"
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              m: theme.spacing(3, 0, 2),
            }}
          >
            Sign in
          </Button>
          <Grid2 container justifyContent={"flex-end"}>
            <Grid2 item="true">
              <Link variant="body2" href="/register">
                New User? Sign Up
              </Link>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Container>
  );
}
