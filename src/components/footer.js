import React from 'react';
import { Link } from "react-router-dom";
import '../styles/footer.css';


const Footer = ()=>{
    return(
        <>
            <footer class="footer">
                <div class="footer-wrapper">
                    <div class="footer-card">
                        <div class="f-headline f-item">LET US HELP YOU</div>
                        <div class="f-item">
                            <Link to=''>Contact Us</Link>
                        </div>

                    </div>
                    <div class="footer-card">
                        <div class="f-headline f-item">ABOUT SPSBOT</div>
                        <div class="f-item">
                            <Link to=''>About Us</Link>
                        </div>
                        <div class="f-item">
                            <Link to=''>Contact Us</Link>
                        </div>

                    </div>
                    <div class="footer-card">
                        <div class="f-headline f-item">MAKE MONEY with SPSBOT</div>
                        <div class="f-item">
                            <Link to=''>Trade</Link>
                            <Link to=''>Refer a friend</Link>
                        </div>



                    </div>
                    <div class="footer-card">
                        <div class="f-headline ">Products</div>
                        <div class="f-item">
                            <Link to=''>Stock Screener</Link>
                        </div>
                        <div class="f-item">
                            <Link to=''>Terms of use</Link>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;