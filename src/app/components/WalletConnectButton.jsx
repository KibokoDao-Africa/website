import React from 'react';
import { useAppContext } from '../providers/AppProvider';

const WalletConnectButton = () => {
  const { handleConnetWalletBtnClick, account } = useAppContext();

  return (
    <button onClick={handleConnetWalletBtnClick}>
      {account ? `Connected: ${account.address}` : 'Connect Wallet'}
    </button>
  );
};

export default WalletConnectButton;
