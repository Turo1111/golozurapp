import React, { useState, createContext, useEffect, useContext } from 'react'

export const LoadingContext = createContext({
})

export function LoadingProvider(props) {

    const {children} = props

    const [open, setOpen] = useState(false)

    const valueContext = {
        open,
        setOpen
    }

    return <LoadingContext.Provider value={valueContext}>{children}</LoadingContext.Provider>

}

export function useLoading() {
    return useContext(LoadingContext);
  }