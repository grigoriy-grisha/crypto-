import React from 'react';
import styles from '../css/Main.module.css'
import {NavLink} from "react-router-dom";
const btn = document.getElementById("volumeBtn");
function volume() {
    if (btn.innerHTML = "MUSIC : ON") {
        btn.innerHTML = "MUSIC: OFF"
        console.log('h123h')
    } else {
        btn.innerHTML = "MUSIC : ON"
    }
}

const MainFrame = () => {
    return (
        <section className={styles.MainFrame}>
            <div className={styles.Navigation_Bottom}>
                <div className={styles.Bottom_LeftText}>
                    RUN — EARN — RUN
                </div>
                <div className={styles.Bottom_CenterText}>
                    SCROLL
                </div>
                <div className={styles.Bottom_LeftText}>
                    <NavLink to='#' className={styles.active}>
                        EN
                    </NavLink>
                    <NavLink to='#'>
                        中文
                    </NavLink>
                    <div id="volumeBtn" onClick={volume}>MUSIC : OFF</div>
                </div>
            </div>
        </section>
    );
};

export default MainFrame;