import { useState } from 'react'
import AlertContext from './AlertContext'

const AlertState = (props) => {
    const [alert, setAlert] = useState(null);
    const showAlert = (type, message) => {
        setAlert({ type, message });

        setTimeout(() => {
            setAlert(null)
        }, 3000);
    }
    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </AlertContext.Provider >
    )
}

export default AlertState