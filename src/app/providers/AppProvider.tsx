"use client"
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Contract } from "starknet";
import { connect, disconnect } from "starknetkit";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../configs/config";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";

const initialData = {
  contract: null as any,
  account: null as any,
  address: null as any,
  connection: null as any,
  handleConnectWalletBtnClick: null as any,
  disconnectWallet: null as any,
};

export const AppContext = createContext(initialData);

export const useAppContext = () => {
  return useContext(AppContext);
};


interface IAppProvider {
  children: ReactNode;
}

const AppProvider = ({ children }: IAppProvider) => {
  const [contract, setContract] = useState<null | any>();
  const [connection, setConnection] = useState<null | any>();
  const [account, setAccount] = useState<null | any>();
  const [address, setAddress] = useState<null | any>("");

function hasSelectedAddress(wallet: any): wallet is { selectedAddress: string } {
  return wallet && typeof wallet.selectedAddress === "string";
}

const connectWallet = async () => {
  const connection = await connect({
    webWalletUrl: "https://web.argent.xyz",
    argentMobileOptions: {
      dappName: "Kiboko Oframp",
      url: "https://kibokodao.com",
    },
  });

  console.log("Connection details:", connection); 
  if (connection && typeof connection === "object") {
    setConnection(connection);

    const account = "account" in connection ? connection.account : null;

    const walletAddress = hasSelectedAddress(connection.wallet) 
      ? connection.wallet.selectedAddress 
      : ""; 

    setAccount(account);
    setAddress(walletAddress);

    console.log("Account:", account, "Wallet Address:", walletAddress);
  } else {
    console.log("No wallet connected");
    setConnection(null);
    setAccount(null);
    setAddress("");
  }
};
  

  const disconnectWallet = async () => {
    await disconnect({ clearLastWallet: true });
    setConnection(null);
    setAccount(null);
    setAddress("");
  };

  const openConfirmDisconnectModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      centered: true,
      radius: "md",
      children: "Are you sure you want to disconnect your account?",
      labels: { confirm: "Disconnect", cancel: "Cancel" },
      confirmProps: { radius: "md", variant: "light" },
      cancelProps: { radius: "md", variant: "light" },
      onCancel: () => {},
      onConfirm: () => disconnectWallet(),
    });

  const makeContractConnection = () => {
    if (account) {
      const contract = new Contract(CONTRACT_ABI, CONTRACT_ADDRESS, account);
      setContract(contract);
    }
  };

  console.log("account")
  console.log(account)
  console.log("account")

  const handleConnectWalletBtnClick = () => {
    if (!account) {
      connectWallet();
    } else {
      disconnectWallet();
    }
  };

  const contextValue = useMemo(
    () => ({
      contract,
      account,
      address,
      connection,
      handleConnectWalletBtnClick,
      disconnectWallet
    }),
    [account, contract, address, connection, ]
  );

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    makeContractConnection();
  }, [account, address]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
