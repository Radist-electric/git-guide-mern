import { useState, useCallback, useEffect } from 'react'
import { useMessage } from './message.hook'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserid] = useState(null)
  const [ready, setReady] = useState(false)
  const message = useMessage()

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserid(id)
    localStorage.setItem(storageName, JSON.stringify({
      token: id, userId: jwtToken
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserid(null)
    localStorage.removeItem(storageName)
    message('Вы вышли из системы')
  }, [message])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready }
}