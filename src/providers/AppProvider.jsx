"use client"; // Add this to mark AppProvider as a client-side component

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Contract } from 'starknet';
import { connect, disconnect } from 'starknetkit';
import { ERC20_ABI, CONTRACT_ADDRESS } from '../configs/constants';
import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';

const initialData = {
  contract: null,
  account: null,
  address: null,
  connection: null,
  handleConnetWalletBtnClick: null,
};

export const AppContext = createContext(initialData);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [connection, setConnection] = useState(null);
  const [account, setAccount] = useState(null);
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    const connection = await connect({
      webWalletUrl: "https://web.argent.xyz",
      dappName: "Kiboko Offramp",
    });

    if (connection && connection.isConnected) {
      setConnection(connection);
      setAccount(connection.account);
      setAddress(connection.selectedAddress);
    }
  };

  const disconnectWallet = async () => {
    await disconnect({ clearLastWallet: true });
    setConnection(null);
    setAccount(null);
    setAddress("");
  };

  const openConfirmDisconnectModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    centered: true,
    radius: "md",
    children: (
      <Text size="sm">Are you sure you want to disconnect your account?</Text>
    ),
    labels: { confirm: 'Disconnect', cancel: 'Cancel' },
    confirmProps: { radius: "md", variant: "light" },
    cancelProps: { radius: "md", variant: "light" },
    onCancel: () => {},
    onConfirm: () => disconnectWallet(),
  });

  const makeContractConnection = () => {
    if (account) {
      const contractInstance = new Contract(ERC20_ABI, CONTRACT_ADDRESS, account);
      setContract(contractInstance);
    }
  };

  const handleConnetWalletBtnClick = () => {
    if (!account) {
      connectWallet();
    } else {
      disconnectWallet();
    }
  };

  const connectToStarknet = async () => {
    try {
      const connection = await connect({
        modalMode: "neverAsk",
        webWalletUrl: "https://web.argent.xyz",
        dappName: "Kiboko Offramp",
      });

      if (connection && connection.isConnected) {
        setConnection(connection);
        setAccount(connection.account);
        setAddress(connection.selectedAddress);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const contextValue = useMemo(() => ({
    contract,
    account,
    address,
    connection,
    handleConnetWalletBtnClick,
  }), [account, contract, address]);

  useEffect(() => {
    connectToStarknet();
  }, []);

  useEffect(() => {
    makeContractConnection();
  }, [account, address]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
