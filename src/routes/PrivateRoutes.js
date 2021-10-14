import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export function PrivateRouter({ component, ...rest }) {
  const { isLogged } = useSelector((state) => state.user_auth)

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  )
}
