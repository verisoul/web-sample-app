import React, {useEffect, useState} from 'react';

const WalletList = () => {
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        getWallets().catch(console.error);
    }, []);

    const getWallets = async () => {
        const response = await fetch(`http://localhost:4001/api/wallet-list`);
        const walletList = await response.json();
        setWallets(walletList)
    }

    // Generate HTML table from wallets list

    const makeTable = () => {
        const walletList = wallets?.map((entry, index) => {
            return (
                <tr key={index}>
                    <td>{entry.wallet}</td>
                </tr>
            )
        });
        return walletList;
    }


    return (
        <div>
            {wallets && wallets?.length > 0
                ? <table>
                    <tbody>
                    <tr>
                        <th>Wallet</th>
                    </tr>
                    {makeTable()}
                    </tbody>
                </table>
                : null
            }
        </div>
    );
}

export default WalletList;