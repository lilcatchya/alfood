import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import axios from "axios"
import { Link } from 'react-router-dom';

const AdministracaoRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/v2/restaurantes/')
    .then(resposta => setRestaurantes(resposta.data))
  })

  return <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>
          Nome
        </TableCell>
        <TableCell>
          Editar
        </TableCell>
        <TableCell>
          Excluir
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {restaurantes.map(restaurante => 
        <TableRow key={restaurante.id}>
          <TableCell>
            {restaurante.nome}
          </TableCell>
          <TableCell>
          [ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ]
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
}

export default AdministracaoRestaurantes