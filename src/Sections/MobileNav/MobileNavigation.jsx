import React, {useEffect, useRef} from 'react';
import styles from "../css/Main.module.css";
import {VscMenu} from 'react-icons/vsc';
import {AiOutlineClose} from 'react-icons/ai'
import {useState} from 'react';
import NavLinks from './NavLinks'

const MobileNavigation = (props) => {
    const openModal = useRef(props.onOpenConnectWalletModal)


    const [open, setOpen] = useState(false);
    const hamburgerIcon = <VscMenu className={styles.Hamburger}
                                   size='40px' color='yellow'
                                   onClick={() => setOpen(!open)}
    />
    const hamburgerCloseIcon = <AiOutlineClose
                                               className={styles.Hamburger}
                                               size='40px' color='white' zIndex='4'
                                               onClick={() => setOpen(!open)}
    />
    const closeMobileNav = () => setOpen(false);
    return (

        <nav className={styles.MobileNav}>
            {open ? hamburgerCloseIcon : hamburgerIcon}
            {open && <NavLinks onOpenConnectWalletModal={openModal.current} isMobile={true} closeMobileNav={closeMobileNav}/>}
        </nav>
    );
};

export default MobileNavigation;
