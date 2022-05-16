import React, {useEffect, useState} from 'react';
import styles from "./Sections/css/Main.module.css";
import {NavLink} from "react-router-dom";
import LogoY from "./assets/Logo_yellow.png";
import logoY_mobile from "./assets/LogoY_mobile.png";
import video from "./assets/video bg.mp4";
import mobileVideo from './assets/mobile_video.mov'
import extra_mobile_video from './assets/extra_mobile_video.mov'
import "./avalanche";
import MobileNavigation from "./Sections/MobileNav/MobileNavigation";
import bg from "./assets/bgNFT.png";
import Fade from "react-reveal";
import logoW from "./assets/2.png";
import gif from "./assets/gif.gif";
import schoes1 from "./assets/shoes1_1.png";
import schoes2 from "./assets/shoes1_2.png";
import schoes3 from "./assets/shoes1_3.png";
import schoes4 from "./assets/shoes1_4.png";
import boxLarge from "./assets/boxLarge.png";
import shoes1 from "./assets/shoes1.png";
import shoes3 from "./assets/shoes3.png";
import shoes2 from "./assets/shoes2.png";
import ConnectWalletModal from "./ConnectWalletModal";
import ScrollBox from "./ScrollBox";
import {Accept, transaction} from "./avalanche";


const Site = () => {
  let [amountOfBoxes, setAmountOfBoxes] = useState(1);
  const [connectText, setConnectText] = useState("Connect wallet")
  const [account,setAccount] = useState(null)
  const [accountType, setAccountType] = useState(localStorage.getItem("id"))
  const [mode, setMode] = useState("CONNECT")
  const [muted, setMuted] = useState(true)
  const [isOpenConnectWalletModal, setIsOpenConnectWalletModal] = useState(false)
  const maxAmountOfBoxes = 10;
  const costPerBox = 9;
  const openConnectWalletModal = () => setIsOpenConnectWalletModal(true);
  const closeConnectWalletModal = () => setIsOpenConnectWalletModal(false);
  // const [_,setForceUpdate] = useState({})

  useEffect(() => {
    if (window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress)
      setConnectText(window.ethereum.selectedAddress.slice(0, 6) + '..' + window.ethereum.selectedAddress.slice(38, 42))
    }
  })

  const increment = () => {
    if (amountOfBoxes < maxAmountOfBoxes) setAmountOfBoxes(amountOfBoxes + 1);
  }

  const decrement = () => {
    if (amountOfBoxes > 0) return (setAmountOfBoxes(amountOfBoxes - 1));
  }

  useEffect(() => {
    closeConnectWalletModal()
  },[account])

  const sliderOnChange = (sliderArgs) => setAmountOfBoxes(parseInt(sliderArgs.target.value));



  const handleAdressChanged = (accounts) => {
    if (accounts.length === 0) return
    setAccount(accounts[0])
    setConnectText(accounts[0].slice(0, 6) + '..' + accounts[0].slice(38, 42))
  }

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [])

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum
      .request({method: 'eth_accounts'})
      .then(handleAdressChanged)
      .catch(console.error);
  }, [])

  const connectToAccount = (id) => {
    // window.web3.ko
    localStorage.setItem('id', id)
    Accept(id, handleAdressChanged)
  }


  return (
    <>  <ConnectWalletModal  accountType={accountType} mode={mode} amountOfBoxes={amountOfBoxes} connectToAccount={connectToAccount}
                            onClose={closeConnectWalletModal} show={isOpenConnectWalletModal}/>
      <ScrollBox color="black">
        {(cubeLayout) => <div>
          <header className={styles.Header} style={{position: 'relative',}}>
            <div style={{position: 'absolute', width: '100%', zIndex: 2}}>
              {cubeLayout}
            </div>
            <section className={styles.MainFrame} style={{zIndex: 6,}}>
              <div className={styles.Navigation_Bottom} style={{zIndex: 6}}>
                <div className={styles.Bottom_LeftText} style={{zIndex: 6}}>
                  RUN — EARN — RUN
                </div>
                <div className={styles.Bottom_CenterText} style={{zIndex: 6}}>
                  SCROLL
                </div>
                <div className={styles.Bottom_LeftText} style={{zIndex: 6}} onClick={() => setMuted((prev) => !prev)}>
                  <div id="volumeBtn" style={{zIndex: 6}}>MUSIC : {muted ? "OFF" : "ON"}</div>
                </div>
              </div>
            </section>
            <div className={styles.Navigation}>
              <NavLink to='/' className={styles.Header_Logo}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img src={LogoY} alt="image" className={styles.Header_Logo_Yellow}/>
                <img src={logoY_mobile} alt="image" className={styles.Header_Logo_Yellow_mobile}/>
              </NavLink>
              <div className={styles.Header_centerText}>
                GENESIS NFT DROP BOX
              </div>
              <div className={styles.flex_column}>
                <div className={styles.Header_BtnWallet} onClick={() => {
                  if (account) return
                  openConnectWalletModal()
                  setMode("CONNECT")
                }} style={{zIndex: 4}}>
                  {connectText}
                </div>
              </div>
            </div>
            <video muted={muted} autoPlay={"autoplay"} loop className={styles.Header_BGVideo}
                   id="BgVideo">
              <source
                src={matchMedia("(max-width: 1200px)").matches ? matchMedia("(max-width: 450px)").matches ? extra_mobile_video : mobileVideo : video}/>
            </video>
            <MobileNavigation connectText={connectText} onOpenConnectWalletModal={() => {
              openConnectWalletModal()
              setMode("CONNECT")
            }}/>

          </header>

        </div>}
      </ScrollBox>
      <section className={styles.NFT} style={{position: 'relative'}}>
        <div style={{backgroundImage: `url(${bg})`, paddingBottom: 117, paddingTop: 80}}>
          <div className={styles.NFT_Flex}>
            <div className={styles.NFT_Flex__Gif_Flex} style={{zIndex: 2}}>
              <div className={styles.NFT_Flex__Gif_LogoW}>
                <img src={logoW} alt={logoW} className={styles.NFT_Flex__Gif_LogoW_img}/>
              </div>
              <div className={styles.NFT_Flex__Gif}>
                <div>
                  <img autoPlay={"autoplay"} preLoad="auto" loop src={gif}
                       className={styles.NFT_Flex__Gif_img}>
                  </img>
                </div>
                <div className={styles.NFT_Flex__Gif_Text}>10,000 NFT BOXES</div>
              </div>
            </div>
            <div className={styles.NFT_Flex__LimitedScroll} style={{zIndex: 2, paddingBottom: 40,}}>
              <div className={styles.NFT_Flex__LimitedScroll_Flex}>
                <div className={styles.NFT_Flex__LimitedScroll_Text}>Limited Sale</div>
                <div className={styles.NFT_Flex__LimitedScroll_SchoesFlex}>
                  <div className={styles.NFT_Flex__LimitedScroll_Schoes_first}>
                    <img src={schoes1} alt=""/>
                  </div>
                  <div className={styles.NFT_Flex__LimitedScroll_Schoes_second}>
                    <img src={schoes2} alt=""/>
                  </div>
                  <div className={styles.NFT_Flex__LimitedScroll_Schoes_third}>
                    <img src={schoes3} alt=""/>
                  </div>
                  <div className={styles.NFT_Flex__LimitedScroll_Schoes_four}>
                    <img src={schoes4} alt=""/>
                  </div>
                </div>
              </div>
              <div className={styles.NFT_Flex__LimitedScroll_Avaliable}>
                <div className={styles.NFT_Flex__LimitedScroll_Logo}>
                  <img src={boxLarge} alt="boxLarge"
                       className={styles.NFT_Flex__LimitedScroll_Logo_In}/>
                </div>
                <div className={styles.NFT_Flex__LimitedScroll_Flex} style={{flexDirection: 'column'}}>
                  <div className={styles.NFT_Flex__LimitedScroll_Flex_Price}>Price Per Box</div>
                  <div className={styles.NFT_Flex__LimitedScroll_Flex_AVAX}>{costPerBox} AVAX</div>
                </div>
              </div>
              <div className={styles.NFT_Flex__LimitedScroll_Scroller}>
                <div className={styles.NFT_Flex__LimitedScroll_Scroller_Btn_decrement}
                     onClick={decrement}>-
                </div>
                <div className={styles.NFT_Flex__LimitedScroll_Scroller_Text}>{amountOfBoxes}</div>
                <div className={styles.NFT_Flex__LimitedScroll_Scroller_Btn_increment}
                     onClick={increment}>+
                </div>
              </div>
              <div className={styles.NFT_Flex__LimitedScroll_Scroll}>
                <input value={amountOfBoxes} style={{margin: 0, padding: 0}} onChange={sliderOnChange} type="range"
                       min={1} max={10}
                       id='range'/>
              </div>
              <div className={styles.NFT_Flex__LimitedScroll_Flex_Flex}>
                <div className={styles.NFT_Flex__LimitedScroll_Total}>Total</div>
                <div className={styles.NFT_Flex__LimitedScroll_Max}>{amountOfBoxes * 9} AVAX</div>
              </div>
              {/*<hr style={{paddingBottom: '30px'}}/>*/}
              <div className={styles.NFT_Flex__LimitedScroll_ConnectWallet} style={{zIndex: 4}} onClick={() => {
                if (!account) {
                  openConnectWalletModal()
                  setMode("BUY")
                  return
                }

                transaction(window.ethereum?.isMetaMask ? 1 :  2, amountOfBoxes,handleAdressChanged)
              }}>Buy
              </div>
              {/*<div className={styles.NFT_Flex__LimitedScroll_buy}>{amountOfBoxes} / 10, 000</div>*/}
            </div>
          </div>
          <div className={styles.NFT_UnderText}>
            Sales begin May 12
          </div>
        </div>
      </section>
      <div className={styles.BlackTransition}>
        <div className={styles.BlackTransition_YellowUpper}>
          <svg viewBox="0 0 1440 81" fill="none" xmlns="http://www.w3.org/2000/svg"
               style={{paddingTop: '160px'}}>
            <path d="M0 80.2749H1440.97V39.6658L720.973 0.274902L0 39.6658V80.2749Z" fill="#F9D449"/>
          </svg>
        </div>
        <div className={styles.BlackTransition_YellowDown}>
          <svg viewBox="0 0 1440 81" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80.2749H1440.97V39.6658L720.973 0.274902L0 39.6658V80.2749Z" fill="#F9D449"/>
          </svg>
        </div>
      </div>
      <section style={{
        top: '-2vh'
        , position: 'relative'
      }} id="info">
        <div className={styles.Info}>
          <Fade left>
            <div className={styles.Info_LargeText} id="TextAnimate">
              This is a glorious day not only for us, but
              for the entire StepAPP community. The first
              GENESIS NFT DROP will take place in the second
              quarter of 2022, just as it was stated in the
              project roadmap. Presently, everything is
              going in accordance with our roadmap, and we
              are happy that the deadlines don't move. It's
              an achievement of our entire community.
            </div>
            <div className={styles.Info_CenterText} id="TextAnimate">
              We are pleased to present to you the first 10,000 NFT BOXES. Our designers have worked long
              hours to
              create style varieties and develop sneaker color selections. Now, we have 5,000 sneaker
              style
              varieties. The NFT BOX you open will feature sneakers with a random set of aspects and a
              random
              style. This is the first StepApp limited-edition collection, which will serve as a big step
              toward
              developing the ecosystem.
            </div>
          </Fade>
          <div className={styles.Info_Shoes}>
            <img src={shoes1} alt="shoes"/>
          </div>
          <Fade right>
            <div className={styles.Info_RightText} id="TextAnimate">
              In addition to a unique pair of sneakers, each of you will get a<br/>
              chance to get Uncommon.
            </div>
          </Fade>
          <Fade left>
            <div className={styles.Info_LeftText} id="TextAnimate">
              The strategic plan is to fill the market with the first green sneakers<br/>
              in a short period of time, so we increased the Uncommon drop<br/>
              percentage to 5% in this box drop. In the future, the percentage<br/>
              will be reduced to 1%.
            </div>
          </Fade>

          <div className={styles.Info_Shoes}>
            <img src={shoes3} alt="shoes"/>
          </div>
          <Fade right>
            <div className={styles.Info_RightText} id="TextAnimate">
              The price of 1 box is 4.9 AVAX.<br/>
              The maximum number of boxes you can buy is 10.
            </div>
          </Fade>
          <Fade left>
            <div className={styles.Info_LeftText} id="TextAnimate">
              Detailed technical documentation describing the aspects and<br/>
              implementation of the features of all types of sneakers will be<br/>
              published within 5 days after the sales are closed.
            </div>
          </Fade>
          <div className={styles.Info_Shoes}>
            <img src={shoes2} alt=""/>
          </div>
          <Fade right>
            <div className={styles.Info_RightText} id="TextAnimate">
              Just like our community, we can't wait to find out what kind and<br/>
              color of sneakers will become unique after all. And good luck<br/>
              to everyone with getting Uncommon sneakers.
            </div>
          </Fade>
          <Fade left>
            <div className={styles.Info_RER} id="TextAnimate">
              Run-Earn-Run
            </div>
          </Fade>
        </div>
      </section>
      <footer style={{top: '-2vh', position: 'relative'}}>
        <div className={styles.Footer_matrix}>
          <svg viewBox="0 0 1440 81" fill="none" xmlns="http://www.w3.org/2000/svg"
               className={styles.Footer_matrix_path}>
            <path d="M0 80.2749H1440.97V39.6658L720.973 0.274902L0 39.6658V80.2749Z" fill="black"/>
          </svg>
        </div>
        <div className={styles.Footer_Logo}>
          <img src={LogoY} alt="img" className={styles.Footer_Logo_img}/>
        </div>
        <div className={styles.Footer_Text}>
          We are pleased to present to you the first <br/>
          10,000 NFT BOXES.
        </div>
        <div className={styles.Footer_Flex} id="contacts">
          <a href="">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.1" fillRule="evenodd" clipRule="evenodd"
                    d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                    fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M15.5208 13.0051L15.5544 13.5587L14.9948 13.4909C12.9579 13.2311 11.1784 12.3498 9.66756 10.8696L8.92891 10.1352L8.73865 10.6776C8.33575 11.8865 8.59316 13.1633 9.43253 14.022C9.8802 14.4965 9.77948 14.5643 9.00725 14.2819C8.73865 14.1915 8.50363 14.1237 8.48124 14.1576C8.4029 14.2367 8.6715 15.2648 8.88414 15.6716C9.17513 16.2365 9.76828 16.7902 10.4174 17.1178L10.9658 17.3777L10.3167 17.389C9.68994 17.389 9.66756 17.4003 9.73471 17.6376C9.95854 18.372 10.8427 19.1516 11.8276 19.4906L12.5214 19.7278L11.9171 20.0894C11.0218 20.6091 9.96973 20.9029 8.91772 20.9255C8.41409 20.9368 8 20.982 8 21.0159C8 21.1289 9.36538 21.7616 10.16 22.0102C12.5438 22.7446 15.3753 22.4282 17.5017 21.1741C19.0126 20.2815 20.5235 18.5076 21.2286 16.7902C21.6091 15.875 21.9896 14.2028 21.9896 13.4006C21.9896 12.8808 22.0232 12.813 22.6499 12.1916C23.0192 11.83 23.3662 11.4346 23.4333 11.3216C23.5452 11.1069 23.534 11.1069 22.9633 11.299C22.012 11.638 21.8777 11.5928 22.3477 11.0843C22.6947 10.7228 23.1088 10.0674 23.1088 9.87536C23.1088 9.84146 22.9409 9.89796 22.7506 9.99964C22.5492 10.1126 22.1015 10.2821 21.7658 10.3838L21.1614 10.5759L20.613 10.203C20.3108 9.99964 19.8856 9.77367 19.6617 9.70588C19.0909 9.5477 18.218 9.57029 17.7032 9.75107C16.3042 10.2595 15.4201 11.5702 15.5208 13.0051Z"
                    fill="#C8C8C8"/>
            </svg>
          </a>
          <a href="">
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.1" fillRule="evenodd" clipRule="evenodd"
                    d="M0.43277 16.229C0.43277 7.39245 7.59621 0.229004 16.4328 0.229004C25.2693 0.229004 32.4328 7.39245 32.4328 16.229C32.4328 25.0656 25.2693 32.229 16.4328 32.229C7.59621 32.229 0.43277 25.0656 0.43277 16.229Z"
                    fill="white"/>
              <path
                d="M24.1331 10.9167L21.7957 21.9397C21.6194 22.7177 21.1595 22.9114 20.506 22.5448L16.9446 19.9205L15.2262 21.5732C15.036 21.7634 14.8769 21.9225 14.5104 21.9225L14.7663 18.2954L21.367 12.3309C21.654 12.075 21.3048 11.9332 20.921 12.1891L12.7608 17.3272L9.24784 16.2277C8.4837 15.9891 8.46986 15.4635 9.40689 15.097L23.1477 9.80331C23.7839 9.56473 24.3406 9.94507 24.1331 10.9167Z"
                fill="#CECECE"/>
            </svg>
          </a>
        </div>
        <div style={{backgroundColor: 'black', paddingTop: 50}}>
          <div className={styles.Footer_Copyright}>
            © 2022 step.app. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Site;
