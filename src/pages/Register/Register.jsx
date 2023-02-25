/* eslint-disable no-useless-concat */
/* eslint-disable no-alert */
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
import { useFormik } from 'formik';
import { valSchema } from '../../components';
import { useAuth } from '../../components/Context/UserContext';

export default function Register() {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: valSchema,
    onSubmit: async (values) => {
      try {
        await signUp(values.email, values.password);
        navigate('/dashboard');
      } catch (error) {
        if (error) {
          setIsError(true);
        }
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs" sx={{ my: 26.5 }}>
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
        <Typography component="h1" variant="h5" sx={{ my: 1 }}>
          Sign up
        </Typography>

        <Box onSubmit={formik.handleSubmit} component="form" sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            {!isError ? (
              <Grid item xs={2}>
                <Typography color="#2e3b55">.</Typography>
              </Grid>
            ) : (
              <Typography color="#DC143C">
                Email is already in use! Please try a different email!
              </Typography>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 3.9 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link underline="none" href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
