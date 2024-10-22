import WalletConnectButton from "../components/WalletConnectButton";
import styles from '../styles/page.module.css';
import useGetPrice from 'kibokogetpricehook';
import { useState } from 'react';

export default function Onramp() {
  const [crypto, setCrypto] = useState("bitcoin");
  const [numTokens, setNumTokens] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [amountToSend, setAmountToSend] = useState(0);

  const { price, loading } = useGetPrice(crypto, numTokens); // Use the hook to fetch price

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionObject = {
      crypto,
      numTokens,
      price,
      phoneNumber,
      walletAddress,
      amountToSend,
    };
    console.log('Transaction Object:', transactionObject);
    // send the transactionObject to the backend
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <h2>Seamless Crypto Onramp</h2>
            <p>
              Get started with your Web3 journey by easily exchanging traditional currencies like USD, EUR, or KES into popular cryptocurrencies. Whether you’re using a credit card, bank transfer, or mobile money, our secure platform has you covered.
            </p>
          </div>
          <div className={styles.rightContent}>
            <h2>Convert Fiat to Crypto Effortlessly</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="crypto" className={styles.label}>Select Token:</label>
                <select className={styles.select} id="crypto" name="crypto" value={crypto} onChange={(e) => setCrypto(e.target.value)} required>
                  <option value="bitcoin">Bitcoin</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="litecoin">Litecoin</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="tokens" className={styles.label}>Number of Tokens:</label>
                <input className={styles.input} type="number" id="tokens" name="tokens" value={numTokens} onChange={(e) => setNumTokens(e.target.value)} required />
              </div>
              {loading ? (
                <p>Loading price...</p>
              ) : (
                <p>Price: {price} USD</p>
              )}
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Sender’s Phone Number:</label>
                <input className={styles.input} type="number" id="phone" name="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="amount" className={styles.label}>Amount to Send:</label>
                <input className={styles.input} type="number" id="amount" name="amount" value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="wallet" className={styles.label}>Paste Wallet Address:</label>
                <input className={styles.input} type="text" id="wallet" name="wallet" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} required />
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
