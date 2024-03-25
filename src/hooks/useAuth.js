import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// hooks
import { useFlashMessage } from './useFlashMessage'

export function useAuth(){
  const [authenticated, setAuthenticated] = useState(false)
  const { setFlahMessage } = useFlashMessage()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if(token){
      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  },[])
    async function register(user){
      let msgText = 'Cadastro realizado com sucesso!'
      let msgType = 'success'
      try {
        const data =  await api.post('users/register', user).then((response) => {
            return response.data
        })

        await  authUser(data)

      } catch (error) {
        msgText = error.response.data.message 
        msgType = 'error'
      }

      setFlahMessage(msgText, msgType)
    }

    async function authUser(data){
      setAuthenticated(true)

      localStorage.setItem('token', JSON.stringify(data.token))

      navigate('/')
    }

    async function logout(){
      let msgText = 'Logou realizado com sucesso!'
      let msgType = 'success'

      setAuthenticated(false)
      localStorage.removeItem('token')
      api.defaults.headers.authorization = undefined
      navigate('/')

      setFlahMessage(msgText, msgType)
    }

    async function login(user){
      let msgText = 'Login realizado com sucesso!'
      let msgType = 'success'

      try {
        const data = await api.post('users/login', user).then((response) => {
        return response.data
      })
   
      await authUser(data)
      } catch (error) {
        msgText = error.response.data.message 
        msgType = 'error'
      }

      setFlahMessage(msgText, msgType)
    }

    return {register, authenticated, logout, login}
}