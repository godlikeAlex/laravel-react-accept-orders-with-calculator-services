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
    }

    return (
        <header class="page_header header_v2 header_white toggler_xxs_right affix-top">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 display-flex v-center">
                        <div class="header_left_logo" style={{ minWidth: '142px' }}>
                            <a href="index.html" class="logo">
                                <img src="/frontend/images/logo.png" alt="" />
                            </a>
                        </div>
                        <div class="header_mainmenu text-center">
                            <nav class="mainmenu_wrapper" >
                                <ul class="mainmenu nav sf-menu sf-js-enabled sf-arrows" >
                                    <li class="active"> <a href="index-2.html" class="sf-with-ul"><span>Home</span></a><span class="sf-menu-item-mobile-toggler"></span>

                                    </li>
                                    <li> <a href="contact.html" class="sf-with-ul"><span>About us</span></a><span class="sf-menu-item-mobile-toggler"></span></li>

                                    <li> <a href="services.html"><span>Calculate Services</span></a> </li>
                                    <li class=""> <a href="contact.html" class="sf-with-ul"><span>Contact</span></a><span class="sf-menu-item-mobile-toggler"></span></li>
                                    <li> <a href="contact.html" class="sf-with-ul"><span>Contact</span></a><span class="sf-menu-item-mobile-toggler"></span></li>
                                    <li>
                                        <Link to="/cart">
                                            <span style={{ display: 'flex' }}>
                                                <ion-icon style={{ fontSize: '35px', color: '#333' }} name="cart-outline"></ion-icon>
                                            </span>
                                        </Link>
                                    </li>
                                    {auth.isAuth ? (
                                        <li>
                                            <Link to="/cabinet/dashboard" class="sf-with-ul">
                                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                                    <ion-icon name="person-circle-outline" style={{ fontSize: '35px', color: '#333' }}></ion-icon>
                                                    {auth.user.name}
                                                </span>
                                            </Link>
                                            <span class="sf-menu-item-mobile-toggler"></span>
                                            <ul>
                                                <li> <Link to="/cabinet/dashboard"><span>My profile</span></Link> </li>
                                                <li> <Link to="/cabinet/dashboard"><span>History</span></Link> </li>
                                                <li> <a onClick={handleLogout} style={{ cursor: 'pointer' }}><span>Log out</span></a> </li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li> <Link to="/cabinet/login" class="sf-with-ul"><span>Sign In</span></Link></li>
                                    )}
                                </ul>
                            </nav>
                            <span class="toggle_menu"><span></span></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;