import { useState } from 'react';
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
import { updateProfile } from 'firebase/auth';
import { db } from '../../firebase';
import { useAuth } from '../../components/Context/UserContext';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const { currentUser } = useAuth();
  console.log(currentUser?.uid);
  const onChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const onClick = (e) => {
    e.preventDefault();
    console.log('click');
    updateProfile(currentUser, {
      displayName: username
    })
      .then(() => {
        const docRef = doc(db, 'users', currentUser?.uid);
        setDoc(docRef, {
          watchlist: []
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container maxWidth="xs" sx={{ my: 25 }}>
      <Typography sx={{ my: 5 }}>
        Welcome! Before getting started please set a username first!
      </Typography>

      <FormControl onChange={onChange}>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">Please set a username</FormHelperText>
        <Button onClick={onClick} variant="primary">
          Set username
        </Button>
      </FormControl>

      <Box maxWidth="xs" sx={{ my: 5 }}>
        <FormControl>
          <InputLabel htmlFor="my-input">New Password</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">Reset Password</FormHelperText>
          <Button type="submit" variant="primary">
            Set New Password
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
}
