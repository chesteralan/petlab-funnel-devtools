import React, { useState, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

function PasswordInput() {

    const [,setPassword] = useLocalStorage("PETLAB_BUILDER_DEVTOOLS_PASSWORD","");
    const [load,setLoad] = useState(false);

    useEffect(() => {
        return setLoad(true);
    },[load,setLoad]);

    const handleBlur = (evt) => {
        const value = evt.currentTarget.value;
        if( (value.length > 0) && (value === process.env.GATSBY_DEVTOOLS_PASSWORD) ) {
            setPassword(value);
            window.location.reload();
        }
    }

    const handleClick = () => {
        window.location.reload();
    }

    const containerStyles = {
        padding: 50,
        width: 400,
        margin: "100px auto",
        textAlign: "center",
        fontSize: 20,
    };

    const inputStyles = {
        padding: 10,
        textAlign: "center",
        margin: 10,
        fontSize: 20,
        border: "1px solid #000",
    };

  return (load) ? (
    <form style={containerStyles}>
        Devtools Password: <br />
        <input style={inputStyles} placeholder="Enter Password Here" type="password" onKeyUp={handleBlur} onBlur={handleBlur} autoComplete="new-password" /><br />
        <button type="button" style={inputStyles} onClick={handleClick}>Submit</button>
    </form>
  ) : "";
}

export default PasswordInput