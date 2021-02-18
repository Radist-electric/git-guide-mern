import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserid] = useState(null)
  const [role, setRole] = useState(null)
  const [ready, setReady] = useState(false)
  const [userNickName, setUserNickName] = useState(null)
  const [userFirstName, setUserFirstName] = useState(null)
  const [userLastName, setUserLastName] = useState(null)

  const login = useCallback((jwtToken, id, role, userNickName, userFirstName, userLastName) => {
    setToken(jwtToken)
    setUserid(id)
    setRole(role)
    setUserNickName(userNickName)
    setUserFirstName(userFirstName)
    setUserLastName(userLastName)
    localStorage.setItem(storageName, JSON.stringify({
      token: id, userId: jwtToken, role, userNickName, userFirstName, userLastName
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserid(null)
    setRole(null)
    setUserNickName(null)
    setUserFirstName(null)
    setUserLastName(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userId, data.role, data.userNickName, data.userFirstName, data.userLastName)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready, role, userNickName, userFirstName, userLastName }
}