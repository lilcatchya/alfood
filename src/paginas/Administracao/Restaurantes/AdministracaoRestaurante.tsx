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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
          Nome do restaurante
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {restaurantes.map(restaurante => 
        <TableRow key={restaurante.id}>
          <TableCell>
            {restaurante.nome}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
}

export default AdministracaoRestaurantes