import WalletConnectButton from "../components/WalletConnectButton";
import styles from '../styles/page.module.css';
import useGetPrice from 'kibokogetpricehook';
import { useState } from 'react';

export default function Offramp() {
  const [crypto, setCrypto] = useState("bitcoin");
  const [numTokens, setNumTokens] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [amountToReceive, setAmountToReceive] = useState(0);
  const [tab, setTab] = useState("paybill"); // State to manage active tab

  const { price, loading } = useGetPrice(crypto, numTokens); // Fetch the price for the tokens

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionObject = {
      crypto,
      numTokens,
      price,
      phoneNumber,
      walletAddress,
      amountToReceive,
      method: tab,  // Add selected method (Paybill, BuyGoods, TillNumber)
    };
    console.log('Transaction Object:', transactionObject);
    // send the transactionObject to the backend
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <h2>Seamless Crypto Offramp</h2>
            <p>
              Effortlessly convert your cryptocurrencies back to fiat currency like USD, EUR, or KES, and withdraw to your bank account or mobile money. Our secure platform ensures a smooth conversion process.
            </p>
          </div>
          <div className={styles.rightContent}>
            <h2>Cash Out Your Crypto in Seconds</h2>

            {/* Tabs Navigation */}
            <div className={styles.tabContainer}>
              <button
                className={tab === "paybill" ? styles.activeTab : ""}
                onClick={() => setTab("paybill")}
              >
                Paybill
              </button>
              <button
                className={tab === "buygoods" ? styles.activeTab : ""}
                onClick={() => setTab("buygoods")}
              >
                Buy Goods
              </button>
              <button
                className={tab === "tillnumber" ? styles.activeTab : ""}
                onClick={() => setTab("tillnumber")}
              >
                Till Number
              </button>
            </div>

            {/* Dynamic Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
              {tab === "paybill" && (
                <div className={styles.formGroup}>
                  <label htmlFor="paybillNumber" className={styles.label}>
                    Paybill Number:
                  </label>
                  <input
                    className={styles.input}
                    type="number"
                    id="paybillNumber"
                    name="paybillNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              )}
              {tab === "buygoods" && (
                <div className={styles.formGroup}>
                  <label htmlFor="tillNumber" className={styles.label}>
                    Till Number:
                  </label>
                  <input
                    className={styles.input}
                    type="number"
                    id="tillNumber"
                    name="tillNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              )}
              {tab === "tillnumber" && (
                <div className={styles.formGroup}>
                  <label htmlFor="tillNumber" className={styles.label}>
                    Till Number:
                  </label>
                  <input
                    className={styles.input}
                    type="number"
                    id="tillNumber"
                    name="tillNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className={styles.formGroup}>
                <label htmlFor="crypto" className={styles.label}>
                  Select Token:
                </label>
                <select
                  className={styles.select}
                  id="crypto"
                  name="crypto"
                  value={crypto}
                  onChange={(e) => setCrypto(e.target.value)}
                  required
                >
                  <option value="bitcoin">Bitcoin</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="litecoin">Litecoin</option>
                  <option value="busd">BUSD</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="tokens" className={styles.label}>
                  Number of Tokens:
                </label>
                <input
                  className={styles.input}
                  type="number"
                  id="tokens"
                  name="tokens"
                  value={numTokens}
                  onChange={(e) => setNumTokens(e.target.value)}
                  required
                />
              </div>
              {loading ? (
                <p>Loading price...</p>
              ) : (
                <p>Price: {price} USD</p>
              )}
              <div className={styles.formGroup}>
                <label htmlFor="amount" className={styles.label}>
                  Amount to Receive:
                </label>
                <input
                  className={styles.input}
                  type="number"
                  id="amount"
                  name="amount"
                  value={amountToReceive}
                  onChange={(e) => setAmountToReceive(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="wallet" className={styles.label}>
                  Paste Your Wallet Address:
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id="wallet"
                  name="wallet"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Convert and Connect Wallet
              </button>
              <WalletConnectButton />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
