// src/app/components/CryptoOnrampInfo.tsx
import React from "react";
import styles from "../page.module.css";

const CryptoOnrampInfo: React.FC = () => {
  return (
    <div className={styles.leftContent}>
      <h2>Seamless Crypto Onramp</h2>
      <p>
        Get started with your Web3 journey by easily exchanging traditional
        currencies like USD, EUR, or KES into popular cryptocurrencies.
        Whether you’re using a credit card, bank transfer, or mobile money,
        our secure platform has you covered.
      </p>
    </div>
  );
};

export default CryptoOnrampInfo;
