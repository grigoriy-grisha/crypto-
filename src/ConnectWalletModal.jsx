import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./ConnectWalletModal.css";
import MetaMaskImage from "./assets/MetaMask_Fox.svg.webp";
import ConnectWalletImage from "./assets/walletconnect.png";
import {transaction2, transactionWalletConnect} from "./avalanche";

const ConnectWalletModal = props => {
    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose();
        }
    };

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);

    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-body">
                        <div className="modal-pay-var" onClick={transaction2}>
                            <img src={MetaMaskImage} height={65} />
                            <h2>MetaMask</h2>
                            <p>Connect to your MetaMask Wallet</p>
                        </div>
                        <hr/>
                        <div className="modal-pay-var" onClick={transactionWalletConnect}>
                            <img src={ConnectWalletImage} height={50} />
                            <h2>WalletConnect</h2>
                            <p>Scan with WalletConnect to connect</p>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("root")
    );
};

export default ConnectWalletModal;
