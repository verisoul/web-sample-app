import Verisoul from '@verisoul/ui';
import React, {useState} from 'react';

const App = () => {
    const [sessionId, setSessionId] = useState();

    const initSession = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/session`);
        const {sessionId} = await response.json();
        console.log('got session id')
        console.log(sessionId);
        setSessionId(sessionId);
    }

    const onComplete = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/session?sessionId=${sessionId}`);
        const result = await response.json();

        // do something based on session results
    }

    const eventHandler = async (event) => {
        console.log(event);
        if (event?.state?.step === 'complete') await onComplete();
    }

    return (
        <div>
            <h3>Sample Web App</h3>
            <button onClick={initSession}>Start Onboarding</button>
            {sessionId
                ? <Verisoul session={sessionId} project={"Demo"} eventHandler={eventHandler}
                            src={"/js/auth-sdk/facescan"}/>
                : null
            }
        </div>
    );
}

export default App;
