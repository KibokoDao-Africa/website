// src/app/components/CryptoOfframpInfo.tsx
import React from "react";
import styles from "../page.module.css"; // Adjust if you use a specific stylesheet for this component

const CryptoOfframpInfo: React.FC = () => {
  return (
    <div className={styles.leftContent}>
      <h2>Instant Crypto Offramp</h2>
      <p>
        Turn your digital assets into cash whenever you need. Sell your
        crypto and transfer funds directly to your bank account or mobile
        wallet quickly and securely.
      </p>
    </div>
  );
};

export default CryptoOfframpInfo;
