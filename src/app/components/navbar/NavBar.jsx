"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import { useAppContext } from "../../providers/AppProvider";
import { usePathname, useRouter } from "next/navigation";

const NavBar = () => {
  const [showItems, setshowItems] = useState(true);
  const path = usePathname();
  const route = useRouter();

  console.log(path);

  const { handleConnetWalletBtnClick, address } = useAppContext();

  const connectFromNav = () => {
    handleConnetWalletBtnClick();
    setshowItems(!showItems);
  };

  const showMenuItems = () => {
    setshowItems(!showItems);
  };

  const navigationOnramp = () => {
    route.push("/");
  };

  const navigationOfframp = () => {
    route.push("/processing/offramp");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src={"/Logo.png"}
          alt="Kiboko_DAO_Logo"
          className={styles.img}
          fill
        ></Image>
      </div>

      <div className={styles.navOptionsMain}>
        <p
          className={`${path !== "/" ? "" : styles.active}`}
          onClick={navigationOnramp}
        >
          Onramp
        </p>
        <p
          className={`${path !== "/" ? styles.active : ""}`}
          onClick={navigationOfframp}
        >
          Offramp
        </p>

        <div className={styles.navOptions} onClick={showMenuItems}>
          <span className={styles.navOptions_ArgentLogo}>
            <Image
              src={"/ArgentLogo.png"}
              alt="ArgentLogo"
              className={styles.ArgentLogo}
              fill
            ></Image>
          </span>
          <p>Wallet Connected</p>
          <span className={styles.navOptions_arrow_drop_down}>
            <Image
              src={"/arrowdropdown.png"}
              alt="arrow_drop_down"
              className={styles.arrow_drop_down}
              fill
            ></Image>
          </span>
        </div>
      </div>

      <div
        className={`${styles.navbar_menuItems} ${
          showItems ? styles.display : ""
        }`}
      >
        <ul className={styles.navbar_menuItems_content}>
          <li
            className={styles.active_navbar_menuItems}
            onClick={connectFromNav}
          >
            <Image
              src={"/StarkNetLogo.png"}
              width={24}
              height={24}
              alt="StarkNetLogo"
            ></Image>
            <span>{address ? address?.substring(0, 6) : "Connect Wallet"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
