"use client";
import React, { useEffect, useState } from "react";
import styles from "./offramp.module.css";
import { useAppContext } from "../../providers/AppProvider";
import { useRouter } from "next/navigation";
import CryptoOfframpInfo from "../CryptoOfframpInfo";
import { currencies } from "../../page";
import { getOffRampExchangeRateIn } from "kibokogetpricehook";

const OffRamp = () => {
  const [activeMethodNumber, setActiveMethodNumber] = useState(true);
  const [activeMethodPaybill, setActiveMethodPaybill] = useState(false);
  const [activeMethodTill, setActiveMethodTill] = useState(false);
  const [connectionOffRamp, setConnectionOffRamp] = useState<boolean>(false)
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState("");
  const [amountToReceive, setamountToReceive] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const route = useRouter();

  // Handle token selection change
  const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const token = event.target.value;
    setSelectedToken(token);
    getOffRampExchangeRateIn(token, numberOfTokens)
      .then((amountInKesReceived) => {
        setamountToReceive(amountInKesReceived?.toString() || "");
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
        setamountToReceive("Error fetching rate");
      });
  };

  console.log(selectedToken)

   const handleNumberOfTokensChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const tokens = event.target.value;
    setNumberOfTokens(tokens);
    try {
      const amountInKesReceived = await getOffRampExchangeRateIn(selectedToken, tokens);
      setamountToReceive(String(amountInKesReceived || ""));
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setamountToReceive("Error fetching rate");
    }
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientPhoneNumber(event.target.value);
  };

  const selectPaymentMethodNumber = () => {
    setActiveMethodNumber(true);
    setActiveMethodPaybill(false);
    setActiveMethodTill(false);
  };

  const selectPaymentMethodPaybill = () => {
    setActiveMethodNumber(false);
    setActiveMethodPaybill(true);
    setActiveMethodTill(false);
  };

  const selectPaymentMethodTill = () => {
    setActiveMethodNumber(false);
    setActiveMethodPaybill(false);
    setActiveMethodTill(true);
  };

  const { handleConnectWalletBtnClick, connection, disconnectWallet } = useAppContext();
  const connectFromNav = () => {
    handleConnectWalletBtnClick();
    setConnectionOffRamp(true)
  };

  
  useEffect(() => {
    if (connection && connectionOffRamp ) {
      route.push("/");
      setConnectionOffRamp(false)
    } else {
      return 
    }
  }, [connection, connectionOffRamp]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.content}>
         

        <CryptoOfframpInfo />

          <div className={styles.rightContent}>
            <h2>Cash Out Your Crypto in Seconds</h2>
            <form className={styles.form}>
              <div className={styles.accountNumbers}>
                <p
                  className={`${
                    activeMethodNumber ? styles.accountNumber_active : ""
                  }`}
                  onClick={selectPaymentMethodNumber}
                >
                  Mobile Number
                </p>
                <p
                  className={`${
                    activeMethodPaybill ? styles.accountNumber_active : ""
                  }`}
                  onClick={selectPaymentMethodPaybill}
                >
                  Paybill
                </p>
                <p
                  className={`${
                    activeMethodTill ? styles.accountNumber_active : ""
                  }`}
                  onClick={selectPaymentMethodTill}
                >
                  Till Number
                </p>
              </div>
              <div className={styles.rightFormContent}>
                <div className={styles.formGroup}>
                  <label htmlFor="crypto" className={styles.label}>
                    Select Token:
                  </label>
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
                  <label htmlFor="email" className={styles.label}>
                    Number of Tokens:
                  </label>
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
                {activeMethodNumber ? (
                  <div className={styles.formGroup}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Recipient’s Phone Number:
                      </label>
                      <input
                    className={styles.input}
                    type="tel"
                    id="recipientPhoneNumber"
                    name="recipientPhoneNumber"
                    value={recipientPhoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="+254 123 456789"
                    required
                  />
                    </div>
                  </div>
                ) : activeMethodPaybill ? (
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Paybill Number:
                    </label>
                    <input
                      className={styles.input}
                      type="number"
                      id="paybill"
                      name="paybill"
                      required
                    />
                  </div>
                ) : (
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Till Number:
                    </label>
                    <input
                      className={styles.input}
                      type="number"
                      id="TillNumber"
                      name="TillNumber"
                      required
                    />
                  </div>
                )}
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Amount to Recieve:
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="amountToReceive"
                    name="amountToReceive"
                    value={amountToReceive}
                    placeholder="Amount to receive"
                    readOnly
                  />
                </div>
              </div>

              {/* <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Paste Wallet Address:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1234567890"
                  className={styles.input}
                  required
                />
              </div> */}

              {!connection ? <button onClick={connectFromNav} type="submit" className={styles.submitButton}>
                Connect Wallet
              </button> :
              <button type="reset" onClick={disconnectWallet}>
                Diconnect Wallet
              </button>}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OffRamp;
