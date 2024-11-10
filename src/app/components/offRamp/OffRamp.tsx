"use client";
import React, { useEffect, useState } from "react";
import styles from "./offramp.module.css";
import { useAppContext } from "../../providers/AppProvider";
import { useRouter } from "next/navigation";
import CryptoOfframpInfo from "../CryptoOfframpInfo";
import { currencies } from "../../page";
import { getOffRampExchangeRateIn } from "kibokogetpricehook";
import axios from "axios";

const OffRamp = () => {
  const [activeMethodNumber, setActiveMethodNumber] = useState(true);
  const [activeMethodPaybill, setActiveMethodPaybill] = useState(false);
  const [activeMethodTill, setActiveMethodTill] = useState(false);
  const [connectionOffRamp, setConnectionOffRamp] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [recipientPaybill, setRecipientPaybill] = useState("");
  const [recipientTillNumber, setRecipientTillNumber] = useState("");
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState("");
  const [amountToReceive, setamountToReceive] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [requiredFields, setRequiredFields] = useState<boolean>(false);

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

  console.log(selectedToken);

  const handleNumberOfTokensChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const tokens = event.target.value;
    setNumberOfTokens(tokens);
    try {
      const amountInKesReceived = await getOffRampExchangeRateIn(
        selectedToken,
        tokens
      );
      setamountToReceive(String(amountInKesReceived || ""));
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setamountToReceive("Error fetching rate");
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPhoneNumber = event.target.value;
    setRecipientPhoneNumber(newPhoneNumber);

    if (newPhoneNumber !== "") {
      setRequiredFields(true);
    }
  };

  const handlePaybillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientPaybill(event.target.value);

    if (recipientPaybill !== "") {
      setRequiredFields(true);
    }
  };

  const handleTillNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipientTillNumber(event.target.value);

    if (recipientTillNumber !== "") {
      setRequiredFields(true);
    }
  };

  const selectPaymentMethodNumber = () => {
    setActiveMethodNumber(true);
    setActiveMethodPaybill(false);
    setActiveMethodTill(false);
    clearFields("phone")
  };

  const selectPaymentMethodPaybill = () => {
    setActiveMethodNumber(false);
    setActiveMethodPaybill(true);
    setActiveMethodTill(false);
    clearFields("paybill")
  };

  const selectPaymentMethodTill = () => {
    setActiveMethodNumber(false);
    setActiveMethodPaybill(false);
    setActiveMethodTill(true);
    clearFields("till")
  };

  const { handleConnectWalletBtnClick, connection, disconnectWallet } =
    useAppContext();
  const connectFromNav = () => {
    handleConnectWalletBtnClick();
    setConnectionOffRamp(true);
  };

  useEffect(() => {
    if (connection && connectionOffRamp) {
      route.push("/");
      setConnectionOffRamp(false);
    } else {
      return;
    }
  }, [connection, connectionOffRamp]);

  // Handle transaction submission
  const handleTransactionSubmission = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (
      (recipientPhoneNumber || recipientPaybill || recipientTillNumber) &&
      amountToReceive &&
      selectedToken &&
      numberOfTokens
    ) {
      const requestData = {
        phoneNumber:
          recipientPhoneNumber || recipientPaybill || recipientTillNumber,
        amountToReceive,
        selectedToken,
        numberOfTokens,
      };

      setLoading(true);

      console.log(requestData);

      try {
        const response = await axios.post(
          "https://offrampsdk-production.up.railway.app/api/onramptransaction/",
          requestData
        );
        console.log("Conversion API Response:", response.data);
        setLoading(false);
        setRequiredFields(false);
        setTimeout(() => {
          setConnectionOffRamp(true);
        }, 3000);
      } catch (error) {
        setLoading(false);
        setRequiredFields(false);
        console.error("Error making API request:", error);
      }
    } else {
      console.warn("All fields are required.");
    }
  };

  const clearFields = (field: string) => {
    if (field === "phone") {
      setRecipientPaybill("");
      setRecipientTillNumber("");
    } else if (field === "paybill") {
      setRecipientPhoneNumber("");
      setRecipientTillNumber("");
    } else if (field === "till") {
      setRecipientPhoneNumber("");
      setRecipientPaybill("");
    }
  };

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
                    {currencies.map((item: any, index) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
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
                        required={requiredFields}
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
                      id="recipientPaybill"
                      name="recipientPaybill"
                      value={recipientPaybill}
                      onChange={handlePaybillChange}
                      required={requiredFields}
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
                      id="recipientTillNumber"
                      name="recipientTillNumber"
                      value={recipientTillNumber}
                      onChange={handleTillNumberChange}
                      required={requiredFields}
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

              {!connection ? (
                <button
                  onClick={connectFromNav}
                  type="submit"
                  className={styles.submitButton}
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleTransactionSubmission}
                  className={styles.submitButton}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OffRamp;
