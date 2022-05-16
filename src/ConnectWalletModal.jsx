import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./ConnectWalletModal.css";
import MetaMaskImage from "./assets/MetaMask_Fox.svg.webp";
import ConnectWalletImage from "./assets/walletconnect.png";
import {transaction, transaction2, transactionWalletConnect} from "./avalanche";

const METAMASK_ID = 1
const WALLET_CONNECT_ID = 2

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

    const handleMetamask = () => {
        if (props.mode === "BUY") {
            transaction(METAMASK_ID, props.amountOfBoxes)
        }
        if (props.mode === "CONNECT") {
            props.connectToAccount(METAMASK_ID)
        }
    }

    const handleWallet = () => {
        if (props.mode === "BUY") {
            transaction(WALLET_CONNECT_ID, props.amountOfBoxes)
        }
        if (props.mode === "CONNECT") {
            props.connectToAccount(WALLET_CONNECT_ID)
        }

    }

    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-body">
                        <div className="modal-pay-var" onClick={handleMetamask}>
                            <img src={MetaMaskImage} height={65} />
                            <h2>MetaMask</h2>
                            <p>Connect to your MetaMask Wallet</p>
                        </div>
                        <hr/>
                        <div className="modal-pay-var" onClick={handleWallet}>
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
