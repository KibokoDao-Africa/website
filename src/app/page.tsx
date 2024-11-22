"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useAppContext } from "./providers/AppProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CryptoOnrampInfo from "./components/CryptoOnrampInfo";
import { getOnrampExchangeRateIn } from "kibokogetpricehook";
import axios from "axios";

export const currencies = [
  {
    value: "USDC",
    label: "USDC",
  },
  {
    value: "BUSD",
    label: "BUSD",
  },
  {
    value: "STRK",
    label: "STRK",
  },
];

export const networks = [
  {
    value: "Starknet",
    label: "Starknet",
  },
  {
    value: "Ethereum",
    label: "Ethereum",
  },
];

export default function Home() {
  const [connectionOnRamp, setConnectionOnRamp] = useState(false);
  const { handleConnectWalletBtnClick, connection, disconnectWallet } = useAppContext();
  const router = useRouter();

  // State variables for form fieldspOfframp
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [numberOfTokens, setNumberOfTokens] = useState<number>(0);
  const [senderPhoneNumber, setSenderPhoneNumber] = useState("");
  const [amountToSend, setAmountToSend] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle token selection change
  const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const token = event.target.value;
    setSelectedToken(token);
    getOnrampExchangeRateIn(token, numberOfTokens)
      .then((amountInKesReceived) => {
        setAmountToSend(amountInKesReceived || 0);
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
        setAmountToSend(0);
      });
  };

  console.log(selectedToken)

  // Handle number of tokens change and update amount to send
  const handleNumberOfTokensChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const tokens = event.target.value;
    setNumberOfTokens(parseInt(tokens));
    try {
      const amountInKesReceived = await getOnrampExchangeRateIn(selectedToken, tokens);
      setAmountToSend(amountInKesReceived || 0);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setAmountToSend(0);
    }
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenderPhoneNumber(event.target.value);
  };

  const handleWalletAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
  };

  // Handle transaction submission
  const handleTransactionSubmission = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (senderPhoneNumber && amountToSend && selectedToken && numberOfTokens && walletAddress) {
      const requestData = {
        phoneNumber: senderPhoneNumber,
        amountToSend,
        selectedToken,
        numberOfTokens,
        walletAddress,
      };

      setLoading(true)

      console.log(requestData)

      try {
        const response = await axios.post("https://offrampsdk-production.up.railway.app/api/onramptransaction/", requestData);
        console.log("Conversion API Response:", response.data);
        setLoading(false)
        setTimeout(() => {
          setConnectionOnRamp(true);
        }, 3000);
      } catch (error) {
        setLoading(false)
        console.error("Error making API request:", error);
      }
    } else {
      console.warn("All fields are required.");
    }
  };

  const connectFromNav = async () => {
    handleConnectWalletBtnClick();
   
  };

  useEffect(() => {
    if (connection && connectionOnRamp) {
      router.push("/processing/offramp");
      setConnectionOnRamp(false);
    }
  }, [connection, connectionOnRamp]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.content}>
          <CryptoOnrampInfo />

          <div className={styles.rightContent}>
            <h2>Convert Fiat to Crypto Effortlessly</h2>
            <form className={styles.form}>
              <div className={styles.rightFormContent}>
                <div className={styles.formGroup}>
                  <label htmlFor="crypto" className={styles.label}>Select Token:</label>
                  <select
                    className={styles.select}
                    id="crypto"
                    name="crypto"
                    value={selectedToken}
                    onChange={handleTokenChange}
                    required
                  >
                    {currencies.map((item:any, index) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    )) }
                  
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="numberOfTokens" className={styles.label}>Number of Tokens:</label>
                  <input
                    className={styles.input}
                    type="text"
                    id="numberOfTokens"
                    name="numberOfTokens"
                    value={numberOfTokens}
                    onChange={handleNumberOfTokensChange}
                    placeholder="Enter number of tokens"
                    required
                  />
                </div>
              </div>

              <div className={styles.rightFormContent}>
                <div className={styles.formGroup}>
                  <label htmlFor="senderPhoneNumber" className={styles.label}>Sender’s Phone Number:</label>
                  <input
                    className={styles.input}
                    type="tel"
                    id="senderPhoneNumber"
                    name="senderPhoneNumber"
                    value={senderPhoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="+254 123 456789"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="amountToSend" className={styles.label}>Amount to Send:</label>
                  <input
                    className={styles.input}
                    type="text"
                    id="amountToSend"
                    name="amountToSend"
                    value={amountToSend}
                    placeholder="Amount to send"
                    readOnly
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="walletAddress" className={styles.label}>Paste Wallet Address:</label>
                <input
                  type="text"
                  id="walletAddress"
                  name="walletAddress"
                  value={walletAddress}
                  onChange={handleWalletAddressChange}
                  placeholder="Wallet address (0x...)"
                  className={styles.input}
                  required
                />
              </div>

              {/* Wallet connect button */}
              {!connection ? (
                <button onClick={connectFromNav} type="button" className={styles.submitButton}>
                  Connect Wallet
                </button>
              ) : (
                <button type="submit" onClick={handleTransactionSubmission} className={styles.submitButton}>
                  { loading ? "Submitting..." : "Submit"}
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
