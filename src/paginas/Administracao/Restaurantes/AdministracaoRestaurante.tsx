import { Button, TableHead, TableRow, Paper, Table, TableBody, TableCell, TableContainer } from '@mui/material';
import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import axios from "axios"
import { Link } from 'react-router-dom';
import http from '../../../http';

const AdministracaoRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get('v2/restaurantes/')
    .then(resposta => setRestaurantes(resposta.data))
  })

  const excluir = (restauranteAhSerExcluido: IRestaurante) => {
    http.delete(`v2/restaurantes/${restauranteAhSerExcluido.id}/`)
    .then(() => {
      const ListaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
      setRestaurantes([ ...ListaRestaurantes ])
    })
  }

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
            <Button variant="outlined">
              <Link to={`/admin/restaurantes/${restaurante.id}`}>
                Editar
              </Link>
            </Button>
          </TableCell>
          <TableCell>
            <Button variant="outlined" color='error' onClick={() => excluir(restaurante)}>
              Excluir
            </Button>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
}

export default AdministracaoRestaurantes