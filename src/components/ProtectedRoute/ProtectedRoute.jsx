import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={props.path} replace />
  )
}

export default ProtectedRouteElement