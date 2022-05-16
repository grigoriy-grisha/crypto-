import React, {useState} from 'react';
import styles from "../css/Main.module.css";
import {NavLink} from "react-router-dom";
import logoW_mobile from "../../assets/LogoW_mobile.png";
import ConnectWalletModal from "../../ConnectWalletModal";

const NavLinks = (props) => {
    const [isOpenConnectWalletModal, setIsOpenConnectWalletModal] = useState(false)

    return (
        <ul className={styles.NavIn}>
            <ConnectWalletModal amountOfBoxes={props.amountOfBoxes} onClose={() => setIsOpenConnectWalletModal(false)} show={isOpenConnectWalletModal}/>

                <div className={styles.Header_Logo}>
                <NavLink to=''>
                    <img src={logoW_mobile} alt="image" className={styles.Header_Logo_White_mobile} style={{color: 'white'}}/>
                </NavLink>
            </div>
            <li className={styles.NavButton} onClick={() => props.isMobile && props.closeMobileNav()}>
                <NavLink to="/">Home</NavLink>
            </li>
            <li className={styles.NavButton} onClick={() => {
                setIsOpenConnectWalletModal(true)
            }}>
                <NavLink to="/">Connect Wallet</NavLink></li>
            <li className={styles.NavButton} onClick={() => props.isMobile && props.closeMobileNav()}>
                <NavLink to="/">Infromation
                </NavLink>
            </li>
            <li className={styles.NavButton} onClick={() => props.isMobile && props.closeMobileNav()}>
                <NavLink to="/">Contacts
                </NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;
