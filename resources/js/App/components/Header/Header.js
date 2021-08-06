import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../Auth/authSlice';

const Header = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        window.location.reload(false);
    }

    return (
        <header className="page_header header_v2 header_white toggler_xxs_right affix-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 display-flex v-center">
                        <div className="header_left_logo" style={{ minWidth: '142px' }}>
                            <a href="/" className="logo">
                                <img src="/frontend/images/logo.webp" alt="" />
                            </a>
                        </div>
                        <div className="header_mainmenu text-center">
                            <nav className="mainmenu_wrapper" >
                                <ul className="mainmenu nav sf-menu sf-js-enabled sf-arrows" >
                                    <li className="active"> <a href="/" ><span>Home</span></a><span className="sf-menu-item-mobile-toggler"></span>

                                    </li>
                                    <li> <a href="/#about-us"><span>About us</span></a><span className="sf-menu-item-mobile-toggler"></span></li>
                                    <li> <a href="/#process" ><span>Process</span></a><span className="sf-menu-item-mobile-toggler"></span></li>
                                    <li> <a href="/#calculator"><span>Calculator</span></a> </li>
                                    <li>
                                        <a href="/#contacts" ><span>Contact</span></a><span className="sf-menu-item-mobile-toggler"></span></li>
                                    {auth.isAuth ? (
                                        <li>
                                            <Link to="/cabinet/dashboard" className="sf-with-ul">
                                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                                    <ion-icon name="person-circle-outline" style={{ fontSize: '35px', color: '#333' }}></ion-icon>
                                                    {auth.user.name}
                                                </span>
                                            </Link>
                                            <span className="sf-menu-item-mobile-toggler"></span>
                                            <ul>
                                                <li> <Link to="/cabinet/dashboard"><span>My profile</span></Link> </li>
                                                <li> <Link to="/cabinet/dashboard/update-profile"><span>Update my profile</span></Link> </li>
                                                <li> <Link to="/cabinet/dashboard/saved"><span>My saved</span></Link> </li>
                                                <li> <a onClick={handleLogout} style={{ cursor: 'pointer' }}><span>Log out</span></a> </li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li> <Link to="/cabinet/login" className="sf-with-ul"><span>Sign In</span></Link></li>
                                    )}
                                    <li>
                                        <Link to="/cart">
                                            <span style={{ display: 'flex' }}>
                                                <ion-icon style={{ fontSize: '35px', color: '#333' }} name="cart-outline"></ion-icon>
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="only-mobile-menu">
                                        <p style={{ color: 'white' }}>
                                            <a href="mailto:info@easywayinstall.com">info@easywayinstall.com</a>
                                        </p>
                                        <p style={{ color: 'white' }}>
                                            <a href="tel:+1 201 855 63 45">+1 201 855 63 45</a>
                                        </p>
                                        <p className="page_social bottommargin_20">
                                            <a href="https://www.facebook.com/easywayinstall" target="_blank" className="social-icon light-bg-icon color-icon rounded-icon socicon-facebook"></a>
                                            <a href="https://www.instagram.com/easywayinstall/" target="_blank" className="social-icon light-bg-icon color-icon rounded-icon socicon-instagram"></a>
                                            <a href="https://t.me/EasyWayInstall_Bot" target="_blank" className="social-icon light-bg-icon color-icon rounded-icon socicon-telegram"></a>
                                            <a href="https://www.youtube.com/channel/UCkpNohngt4YIwZnj1a6YDvQ" target="_blank" className="social-icon light-bg-icon color-icon rounded-icon socicon-youtube"></a>
                                        </p>
                                    </li>
                                </ul>
                            </nav>
                            <span className="toggle_menu"><span></span></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;