import React, {useState} from 'react';
import Verisoul from '@verisoul/ui';
import WalletList from './walletlist';

const App = () => {
    const [sessionToken, setSessionToken] = useState();
    const [showVerisoul, setShowVerisoul] = useState(false);

    const initVerisoul = async () => {
        try {
            const response = await fetch(`http://localhost:4001/api/session`);
            if (!response.ok) {
                throw new Error(`failed to init Verisoul session: ${response.status}`);
            }

            const {sessionToken} = await response.json();
            console.log(sessionToken);

            setSessionToken(sessionToken);
            setShowVerisoul(true);
        } catch (err) {
            console.error(err);
        }
    }

    const eventHandler = async (event) => {
        if (event?.step === 'Complete') {
            try {
                const response = await fetch(`http://localhost:4001/api/account/${event?.data?.account_id}`);
                if (!response.ok) {
                    throw new Error(`failed to get Verisoul account: ${response.status}`);
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
            {showVerisoul && sessionToken
                ? <Verisoul session={sessionToken}
                            eventHandler={eventHandler}
                            models={'/js/auth-sdk'}
                            environment={process.env.REACT_APP_VERISOUL_ENV}/>
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
