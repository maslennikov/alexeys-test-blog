import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {AuthError} from '../api/fetcher'
import * as session from '../api/session'

type AuthContextType = {
  user: session.UserRecord | null
  setUser: (user: session.UserRecord | null) => any
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => {},
})

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = React.useState(session.getUser())

  React.useEffect(() => {
    session.setUser(user)
  }, [user])

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <AuthErrorBoundary onError={() => setUser(null)}>
        {children}
      </AuthErrorBoundary>
    </AuthContext.Provider>
  )
}

export function RequireAuth({children}: {children: JSX.Element}) {
  const {user} = React.useContext(AuthContext)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{from: location}} replace />
  }

  return children
}

class AuthErrorBoundary extends React.Component<
  {onError: () => void; children: any},
  {error: any}
> {
  constructor(props: any) {
    super(props)
    this.state = {error: null}
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return {error}
  }

  override componentDidCatch(error: any, errorInfo: any) {
    if (error instanceof AuthError) {
      // You can also log the error to an error reporting service
      console.log('Auth error')
      this.props.onError()
    } else {
      throw error
    }
  }

  override render() {
    return this.props.children
  }
}
