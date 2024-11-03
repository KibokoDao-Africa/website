import React from 'react';
import styles from './footer.module.css';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className={styles.main}>
      <p>2024 © KibokoDAO. All Rights Reserved.</p>
      <div className={styles.socials}>
        <span className={styles.facebook}>
          <Image src="/FacebookNegative.png" alt="Facebook" className={styles.facebookImg} fill />
        </span>
        <span className={styles.twitter}>
          <Image src="/TwitterNegative.png" alt="Twitter" className={styles.TwitterImg} fill />
        </span>
        <span className={styles.instagram}>
          <Image src="/InstagramNegative.png" alt="Instagram" className={styles.InstagramImg} fill />
        </span>
        <span className={styles.linkedin}>
          <Image src="/LinkedInNegative.png" alt="LinkedIn" className={styles.linkedinImg} fill />
        </span>
      </div>
      <p>Terms & Conditions | Privacy Policy</p>
    </div>
  );
};

export default Footer;
