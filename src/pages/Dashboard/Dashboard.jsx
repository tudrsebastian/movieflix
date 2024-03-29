/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Container,
  Box,
  Typography,
  Button
} from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { updatePassword, updateProfile } from 'firebase/auth';
import { db } from '../../firebase';
import { useAuth } from '../../components/Context/UserContext';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const onChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const onChangePass = (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  };
  const onClick = (e) => {
    e.preventDefault();
    updateProfile(currentUser, {
      displayName: username
    })
      .then(() => {
        const docRef = doc(db, 'users', currentUser?.uid);
        setDoc(docRef, {
          watchlist: []
        });
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onClickPass = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(currentUser, newPassword);
      setNewPassword('');
      console.log(newPassword);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container maxWidth="xs" sx={{ my: 25 }}>
      {!currentUser?.displayName ? (
        <Typography color="white" sx={{ my: 5 }}>
          Welcome! Before getting started please set a username first!It can't be changed!
        </Typography>
      ) : (
        <Typography variant="h4" color="white" sx={{ mb: 15, ml: 3 }}>
          Dashboard
        </Typography>
      )}

      {!currentUser?.displayName ? (
        <FormControl onChange={onChange}>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">Please set a username</FormHelperText>
          <Button onClick={onClick} variant="contained">
            Set username
          </Button>
        </FormControl>
      ) : (
        <Container>
          <Typography color="white">Username</Typography>
          <Typography color="white">{currentUser?.displayName}</Typography>
        </Container>
      )}

      <Box maxWidth="xs" sx={{ my: 10 }}>
        <FormControl onChange={onChangePass}>
          <InputLabel htmlFor="my-input">New Password</InputLabel>
          <Input type="password" id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">Reset Password</FormHelperText>
          <Button onClick={onClickPass} variant="contained">
            Set New Password
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
}
