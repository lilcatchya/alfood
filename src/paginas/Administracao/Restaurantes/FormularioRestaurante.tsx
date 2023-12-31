import { TextField, Button, Typography, Box, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"
import http from "../../../http"

export default function FormularioRestaurante() {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`v2/restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`v2/restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
        .then(() => {
          alert(`"${nomeRestaurante}" atualizado com sucesso`)
        })
    } else {
      http.post('v2/restaurantes/', { nome: nomeRestaurante })
        .then(() => {
          alert(`"${nomeRestaurante}" cadastrado com sucesso`)
        })
    }

  }

  return (
    <Box>
      <Container maxWidth='lg' sx={{ mt: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
          <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
          <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
            <TextField
              value={nomeRestaurante}
              onChange={evento => setNomeRestaurante(evento.target.value)}
              label="Nome do Restaurante"
              variant="outlined"
              fullWidth
              required
            />
            <Button type="submit" variant="contained">Salvar</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}