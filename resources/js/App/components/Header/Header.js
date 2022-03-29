import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { logout } from '../Auth/authSlice';

const Header = () => {
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const [mobile, setMobile] = useState(false);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const isMobile = useMediaQuery({ maxWidth: 767 });
        
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        window.location.reload(false);
    }

    const toogleMenu = () => {
        if (isMobile) {
            setMobile(!mobile);
        }
    };

    return (
        <header className={mobile && isMobile ? `header_v2 header_white toggler_xxs_right affix-top  mobile-active` : `header_v2 header_white toggler_xxs_right affix-top`}>
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
                                            <Link onClick={toogleMenu} to="/cabinet/dashboard" className="sf-with-ul">
                                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 5 }} src={user.avatar ? `/storage/${user.avatar}` : '/frontend/avatar.png'} alt="Profile picture" />
                                                    {auth.user.name}
                                                </span>
                                            </Link>
                                            <span className="sf-menu-item-mobile-toggler"></span>
                                            <ul>
                                                <li> <Link onClick={toogleMenu} to="/cabinet/dashboard/saved"><span>Saved for later</span></Link> </li>
                                                <li> <Link onClick={toogleMenu} to="/cabinet/dashboard"><span>My profile</span></Link> </li>
                                                <li> <Link onClick={toogleMenu} to="/cabinet/dashboard/update-profile"><span>Update my profile</span></Link> </li>
                                                <li> <a onClick={handleLogout} style={{ cursor: 'pointer' }}><span>Log out</span></a> </li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li> <Link to="/cabinet/login" onClick={() => { toogleMenu() }} className="sf-with-ul"><span>Sign In</span></Link></li>
                                    )}
                                    <li>
                                        <Link to="/cart" onClick={toogleMenu} >
                                            <span className='cart-container-menu'>
                                                <ion-icon style={{ fontSize: '35px' }} name="cart-outline"></ion-icon>
                                                {cart.services.length > 0 && (
                                                    <div className="cart-indicator">
                                                    </div>
                                                )}
                                            </span>

                                        </Link>
                                    </li>
                                    <li className="only-mobile-menu">
                                        <p style={{ color: 'white' }}>
                                            <a href="tel:(949) 942-1363">(949) 942-1363</a>
                                        </p>
                                        <p className="page_social bottommargin_20 header-social">
                                            <a href="https://www.facebook.com/easywayinstall" target="_blank" className="social-icon light-bg-icon color-icon rounded-icon socicon-facebook"></a>
                                            <a href="https://www.instagram.com/easywayinstall/" target="_blank" className="social-icon light-bg-icon color-icon rounded-icon socicon-instagram"></a>
                                            <a href="https://t.me/EasyWayInstall_Bot" target="_blank" className="social-icon light-bg-icon color-icon rounded-icon socicon-telegram"></a>
                                            <a href="https://www.youtube.com/channel/UCkpNohngt4YIwZnj1a6YDvQ" target="_blank" className="social-icon light-bg-icon color-icon rounded-icon socicon-youtube"></a>
                                        </p>
                                    </li>
                                </ul>
                            </nav>
                            <span className={isMobile && mobile ? 'toggle_menu mobile-active' : 'toggle_menu'} onClick={toogleMenu}><span></span></span>
                        </div>
                    </div>
                </div>
            </div>

            <Link to="/cart" className="cart-circle">
                <div className="cart-cont">
                    <ion-icon className="cart-circle-icon" name="cart-outline"></ion-icon>
                </div>
            </Link>
        </header>
    )
};

export default Header;