import React, { Fragment } from 'react';
import '../../App.css';
const Footer = ()=>{
    return(
        <Fragment>
            <footer className="py-1 footer-design">
                <p className="text-center mt-1 ">
                <span style={{fontWeight: 'bold', fontSize: '20px'}}>BigBox</span> by <i>Abdullah Hasan</i> - 2020-2021, All Rights Reserved
                </p>
            </footer>
        </Fragment>
    );
}

export default Footer;