"use client";
import React, { useState } from "react";
import styles from "./offramp.module.css";
import CryptoOfframpInfo from "../CryptoOfframpInfo";



const OffRamp = () => {
  const [activeMethodNumber, setActiveMethodNumber] = useState(true);
  const [activeMethodPaybill, setActiveMethodPaybill] = useState(false);
  const [activeMethodTill, setActiveMethodTill] = useState(false);

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
                    required
                  >
                    <option value="bitcoin">Bitcoin</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="litecoin">Litecoin</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Number of Tokens:
                  </label>
                  <input
                    className={styles.input}
                    type="number"
                    id="email"
                    name="email"
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
                        type="number"
                        id="phone"
                        name="phone"
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
                    type="number"
                    id="email"
                    name="email"
                    required
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

              <button type="submit" className={styles.submitButton}>
                Connect Wallet
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OffRamp;
