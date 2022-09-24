// import Verisoul from '@verisoul/ui';
import Verisoul from 'verisoul';
import React, {useEffect, useState} from 'react';

const App = () => {
    const [sessionId, setSessionId] = useState();

    useEffect(() => {
        const initSession = async () => {
            const response = await fetch(`http://localhost:4001/api/create-session`);
            const {sessionId} = await response.json();
            console.log('got session id')
            console.log(sessionId);
            setSessionId(sessionId);
        }

        initSession().catch(console.error);
    }, [])


    const onComplete = async () => {
        const response = await fetch(`http://localhost:4001/api/session?sessionId=${sessionId}`);
        const result = await response.json();

        console.log(`got session result`);
        console.log(result);

        // do something based on session results
    }

    const eventHandler = async (event) => {
        console.log(event);
        if (event?.step === 'complete') await onComplete();
    }

    return (
        <div>
            {sessionId
                ? <Verisoul session={sessionId} eventHandler={eventHandler} src="/js/auth-sdk/facescan"/>
                : null
            }
            <h3>Sample Web App</h3>
            {/*<button onClick={initSession}>Start Onboarding</button>*/}
            {/*{sessionId*/}
            {/*    ?*/}
            {/*    : null*/}
            {/*}*/}
        </div>
    );
}

export default App;
