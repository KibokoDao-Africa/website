"use client"; // Add this at the top of the file

import React from 'react';
import styles from './navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '../../../providers/AppProvider';

const NavBar = () => {
  const pathname = usePathname();
  const { handleConnetWalletBtnClick, account } = useAppContext();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/Logo.png" alt="Kiboko_DAO_Logo" className={styles.img} />
      </div>

      <div className={styles.navOptionsMain}>
        <Link href="/onramp">
          <p className={pathname === "/onramp" ? styles.active : ""}>Onramp</p>
        </Link>
        <Link href="/offramp">
          <p className={pathname === "/offramp" ? styles.active : ""}>Offramp</p>
        </Link>

        <button onClick={handleConnetWalletBtnClick} className={styles.connectButton}>
          {account ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
