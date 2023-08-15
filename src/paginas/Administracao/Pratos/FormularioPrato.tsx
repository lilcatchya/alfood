import { TextField, Button, Typography, Box, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IPrato from "../../../interfaces/IPrato"
import http from "../../../http"

export default function FormularioPrato() {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`v2/pratos/${parametros.id}/`)
        .then(resposta => setNomePrato(resposta.data.nome))
    }
  }, [parametros])

  const [nomePrato, setNomePrato] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`v2/prato/${parametros.id}/`, { nome: nomePrato })
        .then(() => {
          alert(`"${nomePrato}" atualizado com sucesso`)
        })
    } else {
      http.post('v2/pratos/', { nome: nomePrato })
        .then(() => {
          alert(`"${nomePrato}" cadastrado com sucesso`)
        })
    }

  }

  return (
    <Box>
      <Container maxWidth='lg' sx={{ mt: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
          <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
          <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
            <TextField
              value={nomePrato}
              onChange={evento => setNomePrato(evento.target.value)}
              label="Nome do Prato"
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