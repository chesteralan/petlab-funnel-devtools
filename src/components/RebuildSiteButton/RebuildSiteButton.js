import React, { useState } from 'react'
import axios from 'axios';
import useLocalStorage from '../../hooks/useLocalStorage'

export default function RefreshDataButton() { 

    const [rebuilding, setRebuilding] = useLocalStorage('site-rebuilding',true);
    const [rebuildNow, setRebuildNow] = useState(true);
    
    const handleClick = () => {
        const password = window.prompt("Type `REBUILD` to continue");
        const branch = window.prompt("Branch", "master");

        setRebuilding(true);
        if( !password ) return;
        if( password === "" ) return;
        if( password !== "REBUILD" ) return;

        const trigger_branch = branch || process.env.GATSBY_DEVTOOLS_NETLIFY_BUILD_HOOK_BRANCH || 'master';
        setRebuildNow(false);
        axios.post(process.env.GATSBY_DEVTOOLS_NETLIFY_BUILD_HOOK, {
            trigger_branch: trigger_branch,
            trigger_title: `DevTool triggered deploy: ${process.env.GATSBY_DEVTOOLS_NETLIFY_BUILD_HOOK_NAME || "no-name"} - Branch: ${trigger_branch}`
        }).then(() => {
            setTimeout(() => setRebuildNow(true), 60000);
        });
        

    }

    const showRebuildButton = () => {
        setRebuilding(false);
    };

    return (rebuildNow) ? (<>
        {( process.env.NODE_ENV === 'development' && process.env.GATSBY_DEVTOOLS_NETLIFY_BUILD_HOOK ) && <>
        {rebuilding ?
        (<button style={{position:'absolute',right: 20, top: 50}} onClick={showRebuildButton}>
            Rebuild Site?
        </button>)
        :
        (<button style={{position:'absolute',right: 20, top: 50,backgroundColor: "red", color: "white", borderColor: "red"}} onClick={handleClick}>
            Rebuild Now
        </button>)
        }
        </>
        }
        </>)
        : (<div style={{position:'absolute',right: 20, top: 50, fontSize: 12}}>wait a minute...</div>)
}
