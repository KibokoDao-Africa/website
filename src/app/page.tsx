import Image from "next/image";
import styles from "./page.module.css";
import CryptoOnrampInfo from "./components/CryptoOnrampInfo";

export default function Home() {
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
                <select className={styles.select}  id="crypto" name="crypto" required>
                  <option value="bitcoin">Bitcoin</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="litecoin">Litecoin</option>
                </select>
              </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Number of Tokens:</label>
                  <input className={styles.input} type="number" id="email" name="email" required />
                </div>
              </div>

              <div className={styles.rightFormContent}>
              <div className={styles.formGroup}>
              <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Sender’s Phone Number:</label>
                  <input className={styles.input} type="number" id="email" name="email" required />
                </div>
              </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Amount to Send:</label>
                  <input className={styles.input} type="number" id="email" name="email" required />
                </div>
              </div>
              

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Paste Wallet Address:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1234567890"
                  className={styles.input}
                  required
                />
              </div>
            
              <button type="submit" className={styles.submitButton}>
              Connect Wallet
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}