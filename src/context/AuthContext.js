import React, { useState, createContext, useEffect, useContext } from 'react'

export const AuthContext = createContext({
})

export function AuthProvider(props) {

    const {children} = props

    const [user, setUser] = useState(false)

    const valueContext = {
        user,
        addUser: (u) => setUser(u)
    }

    return <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>

}

export function useAuth() {
    return useContext(AuthContext);
  }