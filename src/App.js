// import Verisoul from '@verisoul/ui';
import Verisoul from 'verisoul';
import React, {useEffect, useState} from 'react';
import WalletList from "./walletlist";

const App = () => {
    const [sessionId, setSessionId] = useState();
    const [showVerisoul, setShowVerisoul] = useState(false);

    const initSession = async () => {
        const response = await fetch(`http://localhost:4001/api/create-session`);
        const {sessionId} = await response.json();
        console.log('got session id')
        console.log(sessionId);
        setSessionId(sessionId);
        setShowVerisoul(true);
    }

    const onComplete = async () => {
        // allow time to read message
        setTimeout(() => {
            setShowVerisoul(false);
        }, 3000);

        const response = await fetch(`http://localhost:4001/api/session?sessionId=${sessionId}`);
        const result = await response.json();

        console.log(`got session result`);
        console.log(result);
    }

    const eventHandler = async (event) => {
        console.log(event);
        if (event?.step === 'Complete') await onComplete();
    }

    return (
        <div>
            {showVerisoul && sessionId
                ? <Verisoul session={sessionId} eventHandler={eventHandler} src="/js/auth-sdk/facescan"/>
                : null
            }
            <h3>Sample Web App</h3>
            <button onClick={initSession}>Start Onboarding</button>
            <WalletList/>
        </div>
    );
}

export default App;
