import { Container } from '@mui/material';
import { Toprated, Popular, Latest } from '../../components';

export default function Movies() {
  return (
    <Container maxWidth="350" sx={{ mt: 4, mb: 0 }}>
      <Toprated />
      <Popular />
      <Latest />
    </Container>
  );
}
