import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoutes() {
    const {currentUser} = useAuth()
    const navigate = useNavigate()

    useEffect (() => {
        if (!currentUser) {
            navigate('/login', {replace: true})
        }
    }, [])
  return (
    <>
        <Outlet />
    </>
  )
}
