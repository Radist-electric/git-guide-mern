import { useState, useCallback, useEffect } from 'react'
import { useMessage } from './message.hook'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserid] = useState(null)
  const [role, setRole] = useState(null)
  const [ready, setReady] = useState(false)
  const message = useMessage()

  const login = useCallback((jwtToken, id, role) => {
    setToken(jwtToken)
    setUserid(id)
    setRole(role)
    localStorage.setItem(storageName, JSON.stringify({
      token: id, userId: jwtToken, role: role
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

  return { login, logout, token, userId, ready, role }
}