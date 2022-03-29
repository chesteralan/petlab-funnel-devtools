import React from 'react'
import axios from 'axios';

export default function RefreshDataButton() { 

    const handleClick = () => {
        axios.post("/__refresh").then(() => {
            window.location.reload();
        });
    }

    return (<>
        {( process.env.NODE_ENV === 'development' ) && <button style={{position:'absolute',right: 20}} onClick={handleClick}>
            Refresh Data
        </button>}
        </>)
}
