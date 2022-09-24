import React, {useEffect, useState} from 'react';

const WalletList = () => {
    const [wallets, setWallets] = useState();

    useEffect(() => {
        getWallets().catch(console.error);
    }, []);

    const getWallets = async () => {
        const response = await fetch(`http://localhost:4001/api/wallet-list`);
        const walletList = await response.json();
        setWallets(walletList)
    }

    // Generate HTML table from wallets list
    const walletList = wallets?.map((entry) => {
        return (
            <tr key={entry.index}>
                <td>{entry.wallet}</td>
            </tr>
        )
    });

    // Create table header
    const tableHeader = (
        <tr>
            <th>Wallet</th>
        </tr>
    );

    return (
        <div>
            {wallets && wallets?.length > 0
                ? <table>
                    <tbody>
                    {tableHeader}
                    {walletList}
                    </tbody>
                </table>
                : null
            }
        </div>
    );
}

export default WalletList;