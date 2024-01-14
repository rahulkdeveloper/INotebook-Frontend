import React, { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext';

function Alert() {
    const context = useContext(AlertContext);
    const { alert } = context


    const wordCapitalize = (word) => {
        if (word === "danger") {
            word = "Error"
        }
        word = word.toLowerCase();
        return word[0].toUpperCase() + word.slice(1);
    }

    return (
        alert && <div>
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{wordCapitalize(alert.type)}  :{alert.message}</strong>

            </div>
        </div>
    )
}

export default Alert