import React, {useEffect, useState} from 'react';

const WalletList = () => {
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        getWallets().catch(console.error);
    }, []);

    const getWallets = async () => {
        try {
            const response = await fetch(`http://localhost:4001/api/wallet-list`);
            if (!response.ok) {
                throw new Error(`Failed to get verified wallets: ${response.status}`);
            }

            const wallets = await response.json();
            setWallets(wallets);
        } catch (err) {
            console.error(err);
        }
    }

    const makeWalletRows = () => {
        const walletRows = wallets?.map((entry, index) => {
            return (
                <tr key={index}>
                    <td>{entry.attributes.wallet}</td>
                    <td>
                        <button onClick={() => toggleAccount(entry)}>
                            {entry.isBlocked
                                ? 'Unblock'
                                : 'Block'}
                        </button>
                    </td>
                </tr>
            )
        });
        return walletRows;
    }

    const toggleAccount = async (account) => {
        try {
            const response = await fetch(`http://localhost:4001/api/account/${account.accountId}/toggle`);
            if (!response.ok) {
                throw new Error(`failed to get Verisoul session: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div>
            {wallets && wallets?.length > 0
                ? <table className={'list'}>
                    <tbody>
                    <tr>
                        <th>Verified Wallets</th>
                    </tr>
                    {makeWalletRows()}
                    </tbody>
                </table>
                : null
            }
        </div>
    );
}

export default WalletList;