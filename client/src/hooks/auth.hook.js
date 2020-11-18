import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserid] = useState(null)

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
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userId)
    }
  }, [login])

  return { login, logout, token, userId }
}