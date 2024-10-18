import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={`${styles.main} ${styles.footer_background1} `}>
            <p>2024 © KibokoDAO. All Rights Reserved.</p>
            <div className={styles.socials}>
                <span className={styles.facebook}>
                    <Image src={"/FacebookNegative.png"} alt='FacebookNegative' className={styles.facebookImg} fill></Image>
                </span>
                <span className={styles.twitter}>
                    <Image src={"/TwitterNegative.png"} alt='TwitterNegative' className={styles.TwitterImg} fill></Image>
                </span> 
                <span className={styles.instagram}>
                    <Image src={"/InstagramNegative.png"} alt='InstagramNegative' className={styles.InstagramImg} fill></Image>
                </span>

                <span className={styles.linkedin}>
                    <Image src={"/LinkedInNegative.png"} alt='LinkedInNegative' className={styles.linkedinImg} fill></Image>
                </span>
            </div>
            <p>Terms & Conditions    |    Privacy Policy</p>
    </div>
  )
}

export default Footer