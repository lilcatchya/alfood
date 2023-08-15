import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import http from '../../http';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')

  useEffect(() => {
    http.get<IPaginacao<IRestaurante>>('v1/restaurantes/')
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, [])

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setRestaurantes([...restaurantes, ...resposta.data.results])
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais}>
      ver mais
    </button>}
  </section>)
}

export default ListaRestaurantes