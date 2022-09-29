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

    const makeTableHeader = () => {
        let walletHeaderRow = Object.keys(wallets[0]).map((key, index) => {
            return <th key={index}>{key}</th>
        })
        walletHeaderRow.unshift(<th key={wallets[0].length}>{' '}</th>);

        return walletHeaderRow;
    }

    const makeTableRows = () => {
        let walletRows = wallets?.map((entry, index) => {
            return (
                <tr key={index}>
                    {mapEntryToRow(entry)}
                </tr>
            )
        });

        return walletRows;
    }

    const mapEntryToRow = (entry) => {
        let row = Object.values(entry).map((value, index) => {
            if(typeof value === 'object') {
                return <td key={index}>{JSON.stringify(value)}</td>
            }
            return <td key={index}>{JSON.stringify(value)}</td>;
        })

        row.unshift(<td>
            <button onClick={() => toggleAccount(entry)}>
                {entry.isBlocked
                    ? 'Unblock'
                    : 'Block'}
            </button>
        </td>);

        return row;
    }

    const toggleAccount = async (account) => {
        try {
            const response = await fetch(`http://localhost:4001/api/account/${account.accountId}/toggle`);
            if (!response.ok) {
                throw new Error(`failed to get Verisoul session: ${response.status}`);
            }

            await getWallets();
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div style={{paddingTop: '40px'}}>
            {wallets && wallets?.length > 0
                ? <table className={'list'}>
                    <tbody>
                    <tr>
                        {makeTableHeader()}
                    </tr>
                    {makeTableRows()}
                    </tbody>
                </table>
                : null
            }
        </div>
    );
}

export default WalletList;