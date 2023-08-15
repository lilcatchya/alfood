import { Button, TableHead, TableRow, Table, TableBody, TableCell, TableContainer } from '@mui/material';
import { useEffect, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import { Link } from 'react-router-dom';
import http from '../../../http';

export default function AdministracaoPratos() {

  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get('v2/pratos/')
      .then(resposta => setPratos(resposta.data))
  })

  const excluir = (pratoAhSerExcluido: IPrato) => {
    http.delete(`v2/pratos/${pratoAhSerExcluido.id}/`)
      .then(() => {
        const ListaPratos = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
        setPratos([...ListaPratos])
      })
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Descrição
            </TableCell>
            <TableCell>
              Tag
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
          {pratos.map(prato =>
            <TableRow key={prato.id}>
              <TableCell>
                {prato.nome}
              </TableCell>
              <TableCell>
                {prato.tag}
              </TableCell>
              <TableCell>
                <Button variant="outlined">
                  <a href={prato.imagem} target='blank' rel='noreferer'>Ver Imagem</a>
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined">
                  <Link to={`/admin/pratos/${prato.id}`}>
                    Editar
                  </Link>
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" color='error' onClick={() => excluir(prato)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}