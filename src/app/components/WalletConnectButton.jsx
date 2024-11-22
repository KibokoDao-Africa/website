import React from 'react';
import { useAppContext } from '../providers/AppProvider';

const WalletConnectButton = () => {
  const { handleConnectWalletBtnClick, account } = useAppContext();

  return (
    <button onClick={handleConnectWalletBtnClick}>
      {account ? `Connected: ${account.address}` : 'Connect Wallet'}
    </button>
  );
};

export default WalletConnectButton;
