import Verisoul from '@verisoul/ui';
import React, {useEffect, useState} from 'react';

// TODO: make this part of a config
const BACKEND = "https://reliable-build-ojswk.cloud.serverless.com"

const App = () => {
    const [sessionId, setSessionId] = useState();

    useEffect(() => {
        initSession().catch(console.error);
    }, [])

    const initSession = async () => {
        const response = await fetch(BACKEND + `/session`);
        const {sessionId} = await response.json();
        console.log('got session id')
        console.log(sessionId);
        setSessionId(sessionId);
    }

    const onComplete = async () => {
        const response = await fetch(BACKEND + `/session?sessionId=${sessionId}`);
        const result = await response.json();

        // do something based on session results
    }

    const eventHandler = async (event) => {
        console.log(event);
        if (event?.state?.step === 'complete') await onComplete();
    }

    return (
        <div>
            {sessionId
                ? <Verisoul session={sessionId} project={"Demo"} eventHandler={eventHandler}
                            src={"/js/auth-sdk/facescan"}/>
                : null
            }
        </div>
    );
}

export default App;
