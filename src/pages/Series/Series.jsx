import { Container } from '@mui/material';
import { TopratedTV, PopularTV, LatestTV } from '../../components';

export default function Series() {
  return (
    <Container maxWidth="350" sx={{ mt: 4 }}>
      <TopratedTV />
      <PopularTV />
      <LatestTV />
    </Container>
  );
}
