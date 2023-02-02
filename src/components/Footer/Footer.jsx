import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://sebastian-webdev.vercel.app/">
        My portofolio
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '15vh'
      }}>
      <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[800]
        }}>
        <Container maxWidth="md">
          <Copyright />
          <List
            maxWidth="sm"
            sx={{ display: 'flex', alignItems: 'flex-start' }}
            component="nav"
            aria-labelledby="nested-list-subheader">
            <ListItemButton
              sx={{ maxWidth: 120 }}
              component="a"
              href="https://github.com/tudrsebastian?tab=repositories"
              target="_blank">
              <ListItemIcon>
                <GitHubIcon sx={{ ml: 4 }} />
              </ListItemIcon>
              <ListItemText primary="GitHub" />
            </ListItemButton>
            <ListItemButton
              sx={{ maxWidth: 120 }}
              component="a"
              href="https://www.facebook.com/tudorasebastian.0796"
              target="_blank">
              <ListItemIcon>
                <FacebookIcon sx={{ ml: 4 }} />
              </ListItemIcon>
              <ListItemText primary="Facebook" />
            </ListItemButton>
            <ListItemButton
              sx={{ maxWidth: 120 }}
              component="a"
              href="https://www.linkedin.com/in/tudora-sebastian-1091a3224/"
              target="_blank">
              <ListItemIcon>
                <LinkedInIcon sx={{ ml: 4 }} />
              </ListItemIcon>
              <ListItemText sx={{ mr: 10 }} primary="LinkedIn" />
            </ListItemButton>
          </List>
        </Container>
      </Box>
    </Box>
  );
}
