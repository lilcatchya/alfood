import { AppBar, Box, Button, Container, Link, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function AdminNavBar(){
  return(
    <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">
              Administração
            </Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>

              <Link component={RouterLink} to={'/admin/restaurantes'}>
                <Button sx={{ my: 2, color: 'white' }}>
                  Restaurantes
                </Button>
              </Link>

              <Link component={RouterLink} to={'/admin/restaurantes/novo'}>
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Restaurante
                </Button>
              </Link>

              <Link component={RouterLink} to={'/admin/pratos'}>
                <Button sx={{ my: 2, color: 'white' }}>
                  Pratos
                </Button>
              </Link>

              <Link component={RouterLink} to={'/admin/pratos/novo'}>
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Prato
                </Button>
              </Link>
              
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  )
}