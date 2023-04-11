import React, { useState, createContext, useEffect, useContext } from 'react'

export const AlertContext = createContext({
})

export function AlertProvider(props) {

    const {children} = props

    const [value, setValue] = useState({
        open: false,
        text: '',
        color: '#FFFBC1'
    })

    const openAlert = (newText, color) => {
        setValue({
            open: true,
            text: newText,
            color: color
        })
    }

    useEffect(()=>{
        if (value.open) {
            setTimeout(() => {
                setValue({...value, open: false})
            }, 1000);
        }
    },[value])

    const valueContext = {
        value,
        openAlert
    }

    return <AlertContext.Provider value={valueContext}>{children}</AlertContext.Provider>

}

export function useAlert() {
    return useContext(AlertContext);
  }