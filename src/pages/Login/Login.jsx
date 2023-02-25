/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';

import { valSchema } from '../../components';
import { useAuth } from '../../components/Context/UserContext';

const theme = createTheme();

export default function Login() {
  const [newError, setNewError] = useState();
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: valSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (error) {
        if (error) {
          const code = Object.entries(error);
          setNewError(code[0][1]);
        }
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ my: 24.94 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box onSubmit={formik.handleSubmit} component="form" sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              {newError === 'auth/user-not-found' ? (
                <Typography color="#DC143C">Account may not exist!</Typography>
              ) : (
                <Typography color="#2e3b55">.</Typography>
              )}

              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
              />
              {newError === 'auth/wrong-password' ? (
                <Typography color="#DC143C">Wrong password! Try again!</Typography>
              ) : (
                <Typography color="#2e3b55">.</Typography>
              )}

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Grid>
            <Grid item xs>
              <Link underline="none" href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid container>
              <Grid item>
                <Link underline="none" href="/register" variant="body2">
                  Don`t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
