import { Box, Container, Paper } from "@mui/material";
import AdminNavBar from "../../componentes/AdminNavBar";
import { Outlet } from "react-router-dom";

export default function PaginaBaseAdmin() {
  return (
    <>
      <AdminNavBar />

      <Box>
        <Container maxWidth='lg' sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>

            <Outlet />

          </Paper>
        </Container>
      </Box>

    </>
  )
}