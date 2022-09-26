import Verisoul from '@verisoul/ui';
import React, {useState} from 'react';
import WalletList from "./walletlist";

const App = () => {
    const [sessionId, setSessionId] = useState();
    const [showVerisoul, setShowVerisoul] = useState(false);

    const initVerisoul = async () => {
        try {
            const response = await fetch(`http://localhost:4001/api/create-session`);
            if (!response.ok) {
                throw new Error(`failed to init Verisoul session: ${response.status}`);
            }

            const {sessionId} = await response.json();

            setSessionId(sessionId);
            setShowVerisoul(true);
        } catch (err) {
            console.error(err);
        }
    }

    const eventHandler = async (event) => {
        if (event?.step === 'Complete') {
            try {
                const response = await fetch(`http://localhost:4001/api/session?sessionId=${event?.session}`);
                if (!response.ok) {
                    throw new Error(`failed to get Verisoul session: ${response.status}`);
                }

                setTimeout(() => { // show the completed screen for a few seconds
                    setShowVerisoul(false);
                }, 3000);
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div>
            {showVerisoul && sessionId
                ? <Verisoul session={sessionId}
                            eventHandler={eventHandler}
                            models={'/js/auth-sdk/facescan'}
                            environment={'dev'}/>
                : <div className={'app'}>
                    <h1>Verisoul Sample Web App</h1>
                    <button onClick={initVerisoul}>Verify Wallet</button>
                    <WalletList/>
                </div>
            }
        </div>
    );
}

export default App;
