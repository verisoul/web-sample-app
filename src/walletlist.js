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
                    <td>{entry.wallet}</td>
                </tr>
            )
        });
        return walletRows;
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