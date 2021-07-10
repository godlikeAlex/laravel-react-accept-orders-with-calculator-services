@extends('layouts.app')

@section('content')
<!-- template sections -->
<div class="transparent_wrapper wrapper_v1">
    <section class="page_toplogo toplogo1 cs toggler_right columns_margin_0">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12"> <a href="index.html" class="logo">
                        <img src="/backend/images/logo-light.png" alt="">
                    </a>
                    <!-- menu toggler --><span class="toggle_menu"><span></span></span>
                    <!-- header toggler --><span class="toggle_header visible-lg"><span></span></span>
                </div>
            </div>
        </div>
    </section>
    <div class="header_v1_wrapper">
        <header class="page_header header_white header_v1 toggler_xxs_right">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 display-flex v-center">
                        <div class="header_left_logo"> <a href="index.html" class="logo">
                                <img src="/backend/images/logo.png" alt="">
                            </a> </div>
                        <div class="header_mainmenu text-center">
                            <!-- main nav start -->
                            <nav class="mainmenu_wrapper">
                                <ul class="mainmenu nav sf-menu">
                                    <li class="active"> <a href="index-2.html"><span>Home</span></a>
                                        <ul>
                                            <li> <a href="index-2.html"><span>Home</span></a> </li>
                                            <li> <a href="index-single.html"><span>Home single page</span></a> </li>
                                        </ul>
                                    </li>
                                    <li> <a href="about.html"><span>Pages</span></a>
                                        <ul>
                                            <!-- features -->
                                            <li> <a href="shortcodes_teasers.html"><span>Shortcodes &amp; Widgets</span></a>
                                                <ul>
                                                    <li> <a href="shortcodes_typography.html"><span>Typography</span></a> </li>
                                                    <li> <a href="shortcodes_buttons.html"><span>Buttons</span></a> </li>
                                                    <li> <a href="shortcodes_teasers.html"><span>Teasers</span></a> </li>
                                                    <li> <a href="shortcodes_progress.html"><span>Progress</span></a> </li>
                                                    <li> <a href="shortcodes_tabs.html"><span>Tabs &amp; Collapse</span></a> </li>
                                                    <li> <a href="shortcodes_bootstrap.html"><span>Bootstrap Elements</span></a> </li>
                                                    <li> <a href="shortcodes_widgets.html"><span>Widgets</span></a> </li>
                                                    <li> <a href="shortcodes_animation.html"><span>Animation</span></a> </li>
                                                    <li> <a href="shortcodes_icons.html"><span>Template Icons</span></a> </li>
                                                    <li> <a href="shortcodes_socialicons.html"><span>Social Icons</span></a> </li>
                                                </ul>
                                            </li>
                                            <!-- eof features -->
                                            <!-- gallery -->
                                            <li> <a href="gallery-regular.html"><span>Gallery</span></a>
                                                <ul>
                                                    <!-- Gallery regular -->
                                                    <li> <a href="gallery-regular.html"><span>Gallery Regular</span></a>
                                                        <ul>
                                                            <li> <a href="gallery-regular.html"><span>1 column</span></a> </li>
                                                            <li> <a href="gallery-regular-2-cols.html"><span>2 columns</span></a> </li>
                                                            <li> <a href="gallery-regular-3-cols.html"><span>3 columns</span></a> </li>
                                                        </ul>
                                                    </li>
                                                    <!-- eof Gallery regular -->
                                                    <!-- Gallery full width -->
                                                    <li> <a href="gallery-fullwidth.html"><span>Gallery Full Width</span></a>
                                                        <ul>
                                                            <li> <a href="gallery-fullwidth.html"><span>2 column</span></a> </li>
                                                            <li> <a href="gallery-fullwidth-3-cols.html"><span>3 columns</span></a> </li>
                                                            <li> <a href="gallery-fullwidth-4-cols.html"><span>4 columns</span></a> </li>
                                                        </ul>
                                                    </li>
                                                    <!-- eof Gallery full width -->
                                                    <!-- Gallery extended -->
                                                    <li> <a href="gallery-extended.html"><span>Gallery Extended</span></a>
                                                        <ul>
                                                            <li> <a href="gallery-extended.html"><span>1 column</span></a> </li>
                                                            <li> <a href="gallery-extended-2-cols.html"><span>2 columns</span></a> </li>
                                                            <li> <a href="gallery-extended-3-cols.html"><span>3 columns</span></a> </li>
                                                        </ul>
                                                    </li>
                                                    <!-- eof Gallery extended -->
                                                    <!-- Gallery carousel -->
                                                    <li> <a href="gallery-carousel.html"><span>Gallery Carousel</span></a>
                                                        <ul>
                                                            <li> <a href="gallery-carousel.html"><span>1 column</span></a> </li>
                                                            <li> <a href="gallery-carousel-2-cols.html"><span>2 columns</span></a> </li>
                                                            <li> <a href="gallery-carousel-3-cols.html"><span>3 columns</span></a> </li>
                                                        </ul>
                                                    </li>
                                                    <!-- eof Gallery carousel -->
                                                    <!-- Gallery tile -->
                                                    <li> <a href="gallery-tile.html"><span>Gallery Tile</span></a> </li>
                                                    <!-- eof Gallery tile -->
                                                    <!-- Gallery left sidebar -->
                                                    <li> <a href="gallery-left.html"><span>Gallery Left Sidebar</span></a>
                                                        <ul>
                                                            <li> <a href="gallery-left.html"><span>1 column</span></a> </li>
                                                            <li> <a href="gallery-left-2-cols.html"><span>2 columns</span></a> </li>
                                                        </ul>
                                                    </li>
                                                    <!-- eof Gallery left sidebar -->
                                                    <!-- Gallery right sidebar -->
                                                    <li> <a href="gallery-right.html"><span>Gallery Right Sidebar</span></a>
                                                        <ul>
                                                            <li> <a href="gallery-right.html"><span>1 column</span></a> </li>
                                                            <li> <a href="gallery-right-2-cols.html"><span>2 columns</span></a> </li>
                                                        </ul>
                                                    </li>
                                                    <!-- eof Gallery right sidebar -->
                                                    <!-- Gallery item -->
                                                    <li> <a href="gallery-single.html"><span>Gallery Item</span></a>
                                                        <ul>
                                                            <li> <a href="gallery-single.html"><span>Style 1</span></a> </li>
                                                            <li> <a href="gallery-single2.html"><span>Style 2</span></a> </li>
                                                            <li> <a href="gallery-single3.html"><span>Style 3</span></a> </li>
                                                        </ul>
                                                    </li>
                                                    <!-- eof Gallery item -->
                                                </ul>
                                            </li>
                                            <!-- eof Gallery -->
                                            <li> <a href="about.html"><span>About</span></a> </li>
                                            <li> <a href="commercial-printing.html"><span>Commercial Printing</span></a> </li>
                                            <li> <a href="copy-center.html"><span>Copy Center</span></a> </li>
                                            <li> <a href="team.html"><span>Team</span></a> </li>
                                            <li> <a href="file-upload.html"><span>File Upload</span></a> </li>
                                            <li> <a href="timetable.html"><span>Timetable</span></a> </li>
                                            <!-- events -->
                                            <li> <a href="events-left.html"><span>Events</span></a>
                                                <ul>
                                                    <li> <a href="events-left.html"><span>Left Sidebar</span></a> </li>
                                                    <li> <a href="events-right.html"><span>Right Sidebar</span></a> </li>
                                                    <li> <a href="events-full.html"><span>Full Width</span></a> </li>
                                                    <li> <a href="event-single-left.html"><span>Single Event</span></a>
                                                        <ul>
                                                            <li> <a href="event-single-left.html"><span>Left Sidebar</span></a> </li>
                                                            <li> <a href="event-single-right.html"><span>Right Sidebar</span></a> </li>
                                                            <li> <a href="event-single-full.html"><span>Full Width</span></a> </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <!-- eof events -->
                                            <li> <a href="comingsoon1.html"><span>Comingsoon</span></a>
                                                <ul>
                                                    <li> <a href="comingsoon1.html"><span>Comingsoon</span></a> </li>
                                                    <li> <a href="comingsoon2.html"><span>Comingsoon 2</span></a> </li>
                                                </ul>
                                            </li>
                                            <li> <a href="faq.html"><span>FAQ</span></a>
                                                <ul>
                                                    <li> <a href="faq.html"><span>FAQ</span></a> </li>
                                                    <li> <a href="faq2.html"><span>FAQ 2</span></a> </li>
                                                </ul>
                                            </li>
                                            <li> <a href="404.html"><span>404</span></a>
                                                <ul>
                                                    <li> <a href="404.html"><span>404</span></a> </li>
                                                    <li> <a href="4042.html"><span>404 2</span></a> </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <!-- eof pages -->
                                    <li> <a href="design.html"><span>Design</span></a> </li>
                                    <li> <a href="services.html"><span>Services</span></a> </li>
                                    <li> <a href="#"><span>Features</span></a>
                                        <div class="mega-menu">
                                            <ul class="mega-menu-row">
                                                <li class="mega-menu-col"> <a href="#"><span>Headers</span></a>
                                                    <ul>
                                                        <li> <a href="header1.html"><span>Header Type 1</span></a> </li>
                                                        <li> <a href="header2.html"><span>Header Type 2</span></a> </li>
                                                        <li> <a href="header3.html"><span>Header Type 3</span></a> </li>
                                                        <li> <a href="header4.html"><span>Header Type 4</span></a> </li>
                                                        <li> <a href="header5.html"><span>Header Type 5</span></a> </li>
                                                        <li> <a href="header6.html"><span>Header Type 6</span></a> </li>
                                                    </ul>
                                                </li>
                                                <li class="mega-menu-col"> <a href="#"><span>Side Menus</span></a>
                                                    <ul>
                                                        <li> <a href="header_side1.html"><span>Slide Left Light</span></a> </li>
                                                        <li> <a href="header_side2.html"><span>Slide Right Light</span></a> </li>
                                                        <li> <a href="header_side3.html"><span>Push Left Light</span></a> </li>
                                                        <li> <a href="header_side4.html"><span>Push Right Light</span></a> </li>
                                                        <li> <a href="header_side5.html"><span>Slide Left Dark</span></a> </li>
                                                        <li> <a href="header_side6.html"><span>Slide Right Dark</span></a> </li>
                                                        <li> <a href="header_side7.html"><span>Push Left Dark</span></a> </li>
                                                        <li> <a href="header_side8.html"><span>Push Right Dark</span></a> </li>
                                                        <li> <a href="header_side_superfish.html"><span>Superfish Menu</span></a> </li>
                                                        <li> <a href="header_side_sticked.html"><span>Sticked Menu</span></a> </li>
                                                    </ul>
                                                </li>
                                                <li class="mega-menu-col"> <a href="breadcrumbs1.html"><span>Breadcrumbs</span></a>
                                                    <ul>
                                                        <li> <a href="breadcrumbs1.html"><span>Breadcrumbs 1</span></a> </li>
                                                        <li> <a href="breadcrumbs2.html"><span>Breadcrumbs 2</span></a> </li>
                                                        <li> <a href="breadcrumbs3.html"><span>Breadcrumbs 3</span></a> </li>
                                                        <li> <a href="breadcrumbs4.html"><span>Breadcrumbs 4</span></a> </li>
                                                        <li> <a href="breadcrumbs5.html"><span>Breadcrumbs 5</span></a> </li>
                                                        <li> <a href="breadcrumbs6.html"><span>Breadcrumbs 6</span></a> </li>
                                                    </ul>
                                                </li>
                                                <li class="mega-menu-col"> <a href="footer1.html"><span>Footers</span></a>
                                                    <ul>
                                                        <li> <a href="footer1.html"><span>Footer Type 1</span></a> </li>
                                                        <li> <a href="footer2.html"><span>Footer Type 2</span></a> </li>
                                                        <li> <a href="footer3.html"><span>Footer Type 3</span></a> </li>
                                                        <li> <a href="footer4.html"><span>Footer Type 4</span></a> </li>
                                                        <li> <a href="footer5.html"><span>Footer Type 5</span></a> </li>
                                                    </ul>
                                                </li>
                                                <li class="mega-menu-col"> <a href="copyright1.html"><span>Copyrights</span></a>
                                                    <ul>
                                                        <li> <a href="copyright1.html"><span>Copyrights 1</span></a> </li>
                                                        <li> <a href="copyright2.html"><span>Copyrights 2</span></a> </li>
                                                        <li> <a href="copyright3.html"><span>Copyrights 3</span></a> </li>
                                                        <li> <a href="copyright4.html"><span>Copyrights 4</span></a> </li>
                                                        <li> <a href="copyright5.html"><span>Copyrights 5</span></a> </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- eof mega menu -->
                                    </li>
                                    <!-- eof features -->
                                    <!-- shop -->
                                    <li> <a href="shop.html"><span>Shop</span></a>
                                        <ul>
                                            <li> <a href="shop.html"><span>Shop</span></a> </li>
                                            <li> <a href="shop-product.html"><span>Single Product</span></a> </li>
                                            <li> <a href="shop-cart.html"><span>Shopping Cart</span></a> </li>
                                            <li> <a href="shop-checkout.html"><span>Checkout</span></a> </li>
                                            <li> <a href="shop-register.html"><span>Registration</span></a> </li>
                                        </ul>
                                    </li>
                                    <!-- eof shop -->
                                    <!-- blog -->
                                    <li> <a href="blog-right.html"><span>Blog</span></a>
                                        <ul>
                                            <li> <a href="blog-right.html"><span>Right Sidebar</span></a> </li>
                                            <li> <a href="blog-left.html"><span>Left Sidebar</span></a> </li>
                                            <li> <a href="blog-full.html"><span>No Sidebar</span></a> </li>
                                            <li> <a href="blog-mosaic.html"><span>Blog Grid</span></a> </li>
                                            <li> <a href="blog-single-right.html"><span>Post</span></a>
                                                <ul>
                                                    <li> <a href="blog-single-right.html"><span>Right Sidebar</span></a> </li>
                                                    <li> <a href="blog-single-left.html"><span>Left Sidebar</span></a> </li>
                                                    <li> <a href="blog-single-full.html"><span>No Sidebar</span></a> </li>
                                                </ul>
                                            </li>
                                            <li> <a href="blog-single-video-right.html"><span>Video Post</span></a>
                                                <ul>
                                                    <li> <a href="blog-single-video-right.html"><span>Right Sidebar</span></a> </li>
                                                    <li> <a href="blog-single-video-left.html"><span>Left Sidebar</span></a> </li>
                                                    <li> <a href="blog-single-video-full.html"><span>No Sidebar</span></a> </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <!-- eof blog -->
                                    <!-- contacts -->
                                    <li> <a href="contact.html"><span>Contact</span></a>
                                        <ul>
                                            <li> <a href="contact.html"><span>Contact 1</span></a> </li>
                                            <li> <a href="contact2.html"><span>Contact 2</span></a> </li>
                                            <li> <a href="contact3.html"><span>Contact 3</span></a> </li>
                                            <li> <a href="contact4.html"><span>Contact 4</span></a> </li>
                                        </ul>
                                    </li>
                                    <!-- eof contacts -->
                                </ul>
                            </nav>
                            <!-- eof main nav -->
                        </div>
                        <div class="header_right_buttons text-right">
                            <!-- header toggler --><span class="toggle_header_close">close<span></span></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section class="page_contacts cs main_color7 section_padding_top_110 section_padding_bottom_120 columns_margin_bottom_40 visible-lg">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-4">
                        <div class="teaser text-center">
                            <div class="teaser_icon size_huge highlight3"> <img src="/backend/images/clr-phone-call-3.png" alt=""> </div>
                            <p> <span class="small-text highlight3">call us 24/7</span><br> <span class="big black">0-800-234-5678</span> </p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4">
                        <div class="teaser text-center">
                            <div class="teaser_icon size_huge highlight8"> <img src="/backend/images/clr-mail-5.png" alt=""> </div>
                            <p> <span class="small-text highlight8">write us</span><br> <span class="big black darklinks"><a href="https://html.modernwebtemplates.com/cdn-cgi/l/email-protection#eecd"><span class="__cf_email__" data-cfemail="93f0e4f2ead3e0e6e3e3fce1e7bdf0fcfe">[email&#160;protected]</span></a></span> </p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4">
                        <div class="teaser text-center">
                            <div class="teaser_icon size_huge highlight9"> <img src="/backend/images/clr-clock-5.png" alt=""> </div>
                            <p> <span class="small-text highlight9">7 days a week</span><br> <span class="big black">9:00am - 8:00PM</span> </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="page_social cs section_padding_top_110 section_padding_bottom_110 visible-lg">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 text-center">
                        <p class="page_social bottommargin_25"> <a href="#" class="social-icon light-bg-icon color-icon rounded-icon socicon-facebook"></a> <a href="#" class="social-icon light-bg-icon color-icon rounded-icon socicon-twitter"></a> <a href="#" class="social-icon light-bg-icon color-icon rounded-icon socicon-googleplus"></a> </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
<section class="intro_section page_mainslider cs all-scr-cover image-dependant">
    <div class="flexslider" data-dots="false" data-nav="true">
        <ul class="slides">
            <li>
                <div class="slide-image-wrap"> <img src="/backend/images/slide01.jpg" alt="" /> </div>
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 text-center">
                            <div class="slide_description_wrapper">
                                <div class="slide_description">
                                    <div class="intro-layer to_animate" data-animation="fadeInUp">
                                        <h1 class="black">Graphic Design <br>&amp; Printing Services</h1>
                                    </div>
                                    <div class="intro-layer to_animate" data-animation="fadeInUp">
                                        <div class="slide_buttons"> <a href="#" class="theme_button bg_button color2 min_width_button"><i class="fa fa-upload rightpadding_5"></i> Upload Files</a> <a href="#" class="theme_button bg_button color1 min_width_button"><i class="fa fa-pencil leftpadding_5"></i> Request Quote</a> </div>
                                    </div>
                                </div>
                                <!-- eof .slide_description -->
                            </div>
                            <!-- eof .slide_description_wrapper -->
                        </div>
                        <!-- eof .col-* -->
                    </div>
                    <!-- eof .row -->
                </div>
                <!-- eof .container -->
            </li>
        </ul>
    </div>
    <!-- eof flexslider -->
</section>
<section id="subscribe" class="cs main_color2 half_cs section_padding_top_40 section_padding_bottom_40 columns_padding_80">
    <div class="container">
        <div class="row flex-wrap v-center">
            <div class="col-xs-12 col-sm-6 text-center text-sm-right">
                <div class="toppadding_25 hidden-xs"></div>
                <div class="small-text greylinks topmargin_5"> <a href="https://html.modernwebtemplates.com/cdn-cgi/l/email-protection#f3d0"><span class="__cf_email__" data-cfemail="355642544c75464045455a47411b565a58">[email&#160;protected]</span></a> </div>
                <p class="hero black bottommargin_0">0-800-234-5678</p>
                <div class="toppadding_25"></div>
            </div>
            <div class="col-xs-12 col-sm-6 text-center text-sm-left">
                <div class="toppadding_30 visible-xs"></div>
                <div class="widget widget_mailchimp">
                    <form class="signup form-inline" action="https://html.modernwebtemplates.com/colorway/" method="get">
                        <div class="form-group-wrap">
                            <div class="form-group"> <label for="mailchimp" class="sr-only">Enter your email here</label> <input name="email" type="email" id="mailchimp" class="mailchimp_email form-control" placeholder="Newsletter Subscribe"> <button type="submit" class="theme_button bg_button color2">Submit</button> </div>
                        </div>
                        <div class="response"></div>
                    </form>
                </div>
                <div class="toppadding_10 visible-xs"></div>
            </div>
        </div>
    </div>
</section>
<section id="about" class="ls section_padding_top_150">
    <div class="container">
        <div class="row flex-wrap v-center">
            <div class="col-xs-12 col-md-7"> <img src="/backend/images/about.png" alt="" class="cover-image"> </div>
            <div class="col-xs-12 col-md-5"> <span class="above_heading highlight">Welcome</span>
                <h2 class="section_header">Colorway is the leader in defferent format printing</h2>
                <p>With over 30 years of experience, we specialize in variety of high quality services.</p>
                <div class="toppadding_10 visible-md visible-lg"></div>
                <p> <a href="about.html" class="theme_button color1">Read more</a> </p>
            </div>
        </div>
    </div>
</section>
<section id="partners" class="ls">
    <div class="container">
        <div class="row flex-wrap v-center">
            <div class="col-xs-12 col-md-7 col-md-push-5"> <img src="/backend/images/partners.png" alt="" class="cover-image"> </div>
            <div class="col-xs-12 col-md-5 col-md-pull-7"> <span class="above_heading highlight2">Partners</span>
                <h2 class="section_header">We have extended partnership and collaboration</h2>
                <div class="toppadding_15"></div>
                <div class="isotope_container isotope row masonry-layout images-grid bordered columns_margin_bottom_20">
                    <div class="isotope-item col-xs-4"> <a href="#" class="partner-link">
                            <img src="/backend/images/partners/partner1.png" alt="">
                        </a> </div>
                    <div class="isotope-item col-xs-4"> <a href="#" class="partner-link">
                            <img src="/backend/images/partners/partner2.png" alt="">
                        </a> </div>
                    <div class="isotope-item col-xs-4"> <a href="#" class="partner-link">
                            <img src="/backend/images/partners/partner3.png" alt="">
                        </a> </div>
                    <div class="isotope-item col-xs-4"> <a href="#" class="partner-link">
                            <img src="/backend/images/partners/partner4.png" alt="">
                        </a> </div>
                    <div class="isotope-item col-xs-4"> <a href="#" class="partner-link">
                            <img src="/backend/images/partners/partner5.png" alt="">
                        </a> </div>
                    <div class="isotope-item col-xs-4"> <a href="#" class="partner-link">
                            <img src="/backend/images/partners/partner6.png" alt="">
                        </a> </div>
                    <div class="isotope-item col-xs-4"> <a href="#" class="partner-link">
                            <img src="/backend/images/partners/partner7.png" alt="">
                        </a> </div>
                    <div class="isotope-item col-xs-4"> <a href="#" class="partner-link">
                            <img src="/backend/images/partners/partner8.png" alt="">
                        </a> </div>
                    <div class="isotope-item col-xs-4"> <a href="#" class="partner-link">
                            <img src="/backend/images/partners/partner9.png" alt="">
                        </a> </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section id="services" class="ls section_padding_top_75 section_padding_bottom_120">
    <div class="container">
        <div class="row flex-wrap v-center">
            <div class="col-xs-12 col-md-7"> <img src="/backend/images/services.jpg" alt="" class="cover-image"> </div>
            <div class="col-xs-12 col-md-5"> <span class="above_heading highlight3">Services</span>
                <h2 class="section_header">We specialize in a big variety of services</h2>
                <div class="toppadding_10"></div>
                <ul class="list1 no-bullets greylinks underlined-links color3">
                    <li>
                        <div class="media teaser media-icon-teaser">
                            <div class="media-left media-middle">
                                <div class="teaser_icon size_normal highlight3"> <i class="clr-service-copying"></i> </div>
                            </div>
                            <div class="media-body media-middle"> <a href="service-single.html">Copying Services</a> </div>
                        </div>
                    </li>
                    <li>
                        <div class="media teaser media-icon-teaser">
                            <div class="media-left media-middle">
                                <div class="teaser_icon size_normal highlight3"> <i class="clr-service-design"></i> </div>
                            </div>
                            <div class="media-body media-middle"> <a href="service-single.html">Design Services</a> </div>
                        </div>
                    </li>
                    <li>
                        <div class="media teaser media-icon-teaser">
                            <div class="media-left media-middle">
                                <div class="teaser_icon size_normal highlight3"> <i class="clr-service-scaning"></i> </div>
                            </div>
                            <div class="media-body media-middle"> <a href="service-single.html">Digital Scaning</a> </div>
                        </div>
                    </li>
                    <li>
                        <div class="media teaser media-icon-teaser">
                            <div class="media-left media-middle">
                                <div class="teaser_icon size_normal highlight3"> <i class="clr-service-printing"></i> </div>
                            </div>
                            <div class="media-body media-middle"> <a href="service-single.html">Printing Services</a> </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>
<section id="contact" class="cs parallax section_padding_top_150 section_padding_bottom_150">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-7 col-lg-6"> <span class="above_heading black">Request a quote</span>
                <h2 class="section_header">We usually answer within one hour</h2>
                <form class="contact-form" method="post" action="https://html.modernwebtemplates.com/colorway/">
                    <div class="row columns_margin_bottom_20">
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group"> <input type="text" aria-required="true" size="30" value="" name="name" id="name" class="form-control" placeholder="Name"> </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group"> <input type="email" aria-required="true" size="30" value="" name="email" id="email" class="form-control" placeholder="Email"> </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="form-group"> <input type="text" name="subject" id="subject" class="form-control" placeholder="What you're interested in?"> </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="form-group"> <textarea aria-required="true" rows="3" cols="45" name="message" id="message" class="form-control" placeholder="Message"></textarea> </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="contact-form-submit"> <button type="submit" id="contact_form_submit" name="contact_submit" class="theme_button color1 margin_0">Submit a quote</button> </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<section id="blog" class="ls section_padding_top_150 section_padding_bottom_140">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center"> <span class="above_heading highlight">Blog</span>
                <h2 class="section_header">News &amp; Events</h2>
                <div class="toppadding_10 visible-lg"></div>
                <div class="owl-carousel" data-responsive-lg="3" data-margin="60">
                    <article class="vertical-item">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/blog-square/01.jpg" alt=""> <a href="blog-single-full.html" class="abs-link"></a> </div>
                        </div>
                        <div class="item-content">
                            <div class="entry-meta small-text inline-content with_dividers"> <span class="categories-links">
                                    <a href="blog-full.html">Design</a>
                                </span> <span class="post-date greylinks">
                                    <a href="blog-single-left.html">
                                        <time datetime="2017-10-03T08:50:40+00:00">28.05.18</time>
                                    </a>
                                </span> </div>
                            <h3 class="entry-title small"><a href="blog-single-full.html">Full color NCR forms from Colorway in San Diego</a></h3> <a href="blog-single-full.html" class="theme_button color1">Read More</a>
                        </div>
                    </article>
                    <article class="vertical-item">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/blog-square/02.jpg" alt=""> <a href="blog-single-full.html" class="abs-link"></a> </div>
                        </div>
                        <div class="item-content">
                            <div class="entry-meta small-text inline-content with_dividers"> <span class="categories-links">
                                    <a href="blog-full.html">Printing</a>
                                </span> <span class="post-date greylinks">
                                    <a href="blog-single-left.html">
                                        <time datetime="2017-10-03T08:50:40+00:00">26.05.18</time>
                                    </a>
                                </span> </div>
                            <h3 class="entry-title small"><a href="blog-single-full.html">Overnight T-shirt printing from Colorway</a></h3> <a href="blog-single-full.html" class="theme_button color1">Read More</a>
                        </div>
                    </article>
                    <article class="vertical-item">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/blog-square/03.jpg" alt=""> <a href="blog-single-full.html" class="abs-link"></a> </div>
                        </div>
                        <div class="item-content">
                            <div class="entry-meta small-text inline-content with_dividers"> <span class="categories-links">
                                    <a href="blog-full.html">Banners</a>
                                </span> <span class="post-date greylinks">
                                    <a href="blog-single-left.html">
                                        <time datetime="2017-10-03T08:50:40+00:00">25.05.18</time>
                                    </a>
                                </span> </div>
                            <h3 class="entry-title small"><a href="blog-single-full.html">San Francisco large banner printing from Colorway</a></h3> <a href="blog-single-full.html" class="theme_button color1">Read More</a>
                        </div>
                    </article>
                    <article class="vertical-item">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/blog-square/04.jpg" alt=""> <a href="blog-single-full.html" class="abs-link"></a> </div>
                        </div>
                        <div class="item-content">
                            <div class="entry-meta small-text inline-content with_dividers"> <span class="categories-links">
                                    <a href="blog-full.html">Copying</a>
                                </span> <span class="post-date greylinks">
                                    <a href="blog-single-left.html">
                                        <time datetime="2017-10-03T08:50:40+00:00">19.05.18</time>
                                    </a>
                                </span> </div>
                            <h3 class="entry-title small"><a href="blog-single-full.html">The Best Way to Present Product Information</a></h3> <a href="blog-single-full.html" class="theme_button color1">Read More</a>
                        </div>
                    </article>
                    <article class="vertical-item">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/blog-square/05.jpg" alt=""> <a href="blog-single-full.html" class="abs-link"></a> </div>
                        </div>
                        <div class="item-content">
                            <div class="entry-meta small-text inline-content with_dividers"> <span class="categories-links">
                                    <a href="blog-full.html">Brochures</a>
                                </span> <span class="post-date greylinks">
                                    <a href="blog-single-left.html">
                                        <time datetime="2017-10-03T08:50:40+00:00">17.05.18</time>
                                    </a>
                                </span> </div>
                            <h3 class="entry-title small"><a href="blog-single-full.html">10 Ingenious Newspaper Designs</a></h3> <a href="blog-single-full.html" class="theme_button color1">Read More</a>
                        </div>
                    </article>
                    <article class="vertical-item">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/blog-square/06.jpg" alt=""> <a href="blog-single-full.html" class="abs-link"></a> </div>
                        </div>
                        <div class="item-content">
                            <div class="entry-meta small-text inline-content with_dividers"> <span class="categories-links">
                                    <a href="blog-full.html">Calendars</a>
                                </span> <span class="post-date greylinks">
                                    <a href="blog-single-left.html">
                                        <time datetime="2017-10-03T08:50:40+00:00">09.05.18</time>
                                    </a>
                                </span> </div>
                            <h3 class="entry-title small"><a href="blog-single-full.html">5 Great Magazines to Give for Christmas</a></h3> <a href="blog-single-full.html" class="theme_button color1">Read More</a>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
</section>
<section id="featured-video" class="cs main_color5 overlay_color parallax section_padding_top_150 section_padding_bottom_150">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 text-center"> <a href="https://www.youtube.com/watch?v=2Kvl0vpV6lM" class="theme_button bg_button color3 round_button play_button margin_0" data-gal="prettyPhoto[gal-video]">
                    <i class="fa fa-play" aria-hidden="true"></i>
                </a>
                <div class="toppadding_30 visible-lg"></div>
                <div class="toppadding_30"></div> <span class="above_heading highlight2">Video Presentation</span>
                <h2 class="section_header black">Our Working Process</h2>
            </div>
        </div>
    </div>
</section>
<section id="products" class="ls section_padding_top_150 section_padding_bottom_145">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center"> <span class="above_heading highlight">Products</span>
                <h2 class="section_header">We will help you look<br> professional</h2>
                <div class="row flex-wrap loop-colors columns_padding_30 columns_margin_bottom_50">
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="clr-service-card"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Business cards</h3>
                                <p>Starting at $9.99</p>
                            </div> <a href="shop.html" class="abs-link"></a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="clr-service-booklet"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Brochures</h3>
                                <p>Starting at $6.99</p>
                            </div> <a href="shop.html" class="abs-link"></a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="clr-service-copy"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Copy services</h3>
                                <p>Starting at $4.99</p>
                            </div> <a href="shop.html" class="abs-link"></a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="clr-service-t-shirt"></i> </div>
                                <h3 class="entry-title small bottommargin_0">T-shirt prints</h3>
                                <p>Starting at $14.99</p>
                            </div> <a href="shop.html" class="abs-link"></a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="clr-service-calendar"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Calendars</h3>
                                <p>Starting at $19.99</p>
                            </div> <a href="shop.html" class="abs-link"></a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="clr-service-banner"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Banners</h3>
                                <p>Starting at $49.99</p>
                            </div> <a href="shop.html" class="abs-link"></a>
                        </div>
                    </div>
                </div>
                <div class="toppadding_20"></div>
                <div class="toppadding_20 visible-lg"></div> <a href="#" class="theme_button color1">See More</a>
            </div>
        </div>
    </div>
</section>
<section id="gallery" class="ls fluid_padding_0 columns_padding_0">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <div class="owl-carousel gallery-carousel" data-responsive-lg="3" data-responsive-md="3" data-responsive-sm="2" data-responsive-xs="2" data-responsive-xxs="1" data-loop="true" data-margin="0" data-center="true" data-nav="true">
                    <div class="vertical-item gallery-item text-center">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/gallery/01.jpg" alt=""> <a class="abs-link prettyPhoto" data-gal="prettyPhoto[gal]" title="" href="images/gallery/01.jpg">
                                </a> </div>
                        </div>
                        <div class="item-content">
                            <h3 class="entry-title small"><a href="gallery-single.html">BrightSky beauty salon brochures</a></h3> <span class="categories-links small-text highlightlinks"><a href="gallery-fullwidth-4-cols.html">brochures</a></span>
                        </div>
                    </div>
                    <div class="vertical-item gallery-item text-center">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/gallery/02.jpg" alt=""> <a class="abs-link prettyPhoto" data-gal="prettyPhoto[gal]" title="" href="images/gallery/02.jpg">
                                </a> </div>
                        </div>
                        <div class="item-content">
                            <h3 class="entry-title small"><a href="gallery-single.html">Nulla a enim id nunc maximus ultricies</a></h3> <span class="categories-links small-text highlightlinks"><a href="gallery-fullwidth-4-cols.html">Bussiness Cards</a></span>
                        </div>
                    </div>
                    <div class="vertical-item gallery-item text-center">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/gallery/03.jpg" alt=""> <a class="abs-link prettyPhoto" data-gal="prettyPhoto[gal]" title="" href="images/gallery/03.jpg">
                                </a> </div>
                        </div>
                        <div class="item-content">
                            <h3 class="entry-title small"><a href="gallery-single.html">Curabitur congue nulla metus</a></h3> <span class="categories-links small-text highlightlinks"><a href="gallery-fullwidth-4-cols.html">Flyers</a></span>
                        </div>
                    </div>
                    <div class="vertical-item gallery-item text-center">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/gallery/04.jpg" alt=""> <a class="abs-link prettyPhoto" data-gal="prettyPhoto[gal]" title="" href="images/gallery/04.jpg">
                                </a> </div>
                        </div>
                        <div class="item-content">
                            <h3 class="entry-title small"><a href="gallery-single.html">Maecenas sed eleifend arcu</a></h3> <span class="categories-links small-text highlightlinks"><a href="gallery-fullwidth-4-cols.html">T-shirts</a></span>
                        </div>
                    </div>
                    <div class="vertical-item gallery-item text-center">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/gallery/05.jpg" alt=""> <a class="abs-link prettyPhoto" data-gal="prettyPhoto[gal]" title="" href="images/gallery/05.jpg">
                                </a> </div>
                        </div>
                        <div class="item-content">
                            <h3 class="entry-title small"><a href="gallery-single.html">Vestibulum vel convallis sapien</a></h3> <span class="categories-links small-text highlightlinks"><a href="gallery-fullwidth-4-cols.html">Banners</a></span>
                        </div>
                    </div>
                    <div class="vertical-item gallery-item text-center">
                        <div class="item-media-wrap">
                            <div class="item-media"> <img src="/backend/images/gallery/06.jpg" alt=""> <a class="abs-link prettyPhoto" data-gal="prettyPhoto[gal]" title="" href="images/gallery/06.jpg">
                                </a> </div>
                        </div>
                        <div class="item-content">
                            <h3 class="entry-title small"><a href="gallery-single.html">Donec non dolor eget nisl</a></h3> <span class="categories-links small-text highlightlinks"><a href="gallery-fullwidth-4-cols.html">Finishing</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section id="testimonials" class="ls section_padding_top_150 section_padding_bottom_140">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <div class="owl-carousel testimonials-owl-carousel" data-responsive-lg="1" data-responsive-md="1" data-responsive-sm="1" data-dots="true" data-nav="false">
                    <blockquote>
                        <div class="avatar"> <img src="/backend/images/faces/01.jpg" alt=""> </div>
                        <footer><cite>Mary J. McQuiston</cite><span class="small-text highlight">manager</span></footer>
                        <p>Colorway did an incredible job in creating our new marketing & sales pieces. Their prices are very competitive, and their quality is excellent. Thank you for the excellent service on the brochure reprints and the new display posters.</p>
                    </blockquote>
                    <blockquote>
                        <div class="avatar"> <img src="/backend/images/faces/02.jpg" alt=""> </div>
                        <footer><cite>Ada B. Powell</cite><span class="small-text highlight">manager</span></footer>
                        <p>Thank you for the excellent service on the brochure reprints and the new display posters. I really appreciate your fine quality, speed and low price. Colorway has consistently demonstrated the ability to provide quality work.</p>
                    </blockquote>
                    <blockquote>
                        <div class="avatar"> <img src="/backend/images/faces/03.jpg" alt=""> </div>
                        <footer><cite>Stephen I. Lebouef</cite><span class="small-text highlight">Businessman</span></footer>
                        <p>Colorway has consistently demonstrated the ability to provide quality work at a competitive price. We can always rely on them to have our printing completed on time and for acceptable price.</p>
                    </blockquote>
                </div>
            </div>
        </div>
    </div>
</section>
<section id="shop-search" class="cs background_cover columns_padding_80 columns_margin_0">
    <div class="container">
        <div class="row flex-wrap v-center-content">
            <div class="col-xs-12 col-md-6 text-center text-md-right with_bg_image half_section_bg">
                <div class="col_bg_image"> <img src="/backend/images/studios-left-bg.jpg" alt=""> </div>
                <div class="toppadding_30"></div>
                <div class="toppadding_40 visible-md visible-lg"></div>
                <h2 class="section_header small"> <span class="hero black"><strong>250</strong>+</span> Studios in North America </h2>
                <div class="toppadding_70 visible-md visible-lg"></div>
            </div>
            <div class="col-xs-12 col-md-6 with_bg_image half_section_bg">
                <div class="toppadding_40"></div>
                <div class="toppadding_40 visible-md visible-lg"></div>
                <div class="toppadding_40 visible-lg"></div>
                <div class="col_bg_image"> <img src="/backend/images/studios-right-bg.jpg" alt=""> </div>
                <div class="text-center text-md-left">
                    <div class="widget widget_search widget_search_shop">
                        <form method="get" class="searchform shop-search" action="https://html.modernwebtemplates.com/colorway/">
                            <div class="form-group margin_0"> <label class="sr-only" for="widget-search">Search for:</label> <input id="widget-search" type="text" value="" name="search" class="form-control" placeholder="City of zip"> <button type="submit" class="theme_button bg_button">Search</button> </div>
                        </form>
                    </div>
                </div>
                <div class="toppadding_80"></div>
                <div class="toppadding_40 visible-lg"></div>
            </div>
        </div>
    </div>
</section>
<footer class="page_footer cs main_color7 section_padding_top_110 section_padding_bottom_120 columns_margin_bottom_30">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-4">
                <div class="teaser text-center">
                    <div class="teaser_icon size_big highlight3"> <img src="/backend/images/clr-phone-call-3.png" alt=""> </div>
                    <p> <span class="small-text highlight3">call us 24/7</span><br> <span class="big black">0-800-234-5678</span> </p>
                </div>
            </div>
            <div class="col-xs-12 col-sm-4">
                <div class="teaser text-center">
                    <div class="teaser_icon size_big highlight8"> <img src="/backend/images/clr-mail-5.png" alt=""> </div>
                    <p> <span class="small-text highlight8">write us</span><br> <span class="big black darklinks"><a href="https://html.modernwebtemplates.com/cdn-cgi/l/email-protection#5f7c"><span class="__cf_email__" data-cfemail="385b4f5941784b4d4848574a4c165b5755">[email&#160;protected]</span></a></span> </p>
                </div>
            </div>
            <div class="col-xs-12 col-sm-4">
                <div class="teaser text-center">
                    <div class="teaser_icon size_big highlight9"> <img src="/backend/images/clr-clock-5.png" alt=""> </div>
                    <p> <span class="small-text highlight9">7 days a week</span><br> <span class="big black">9:00am - 8:00PM</span> </p>
                </div>
            </div>
        </div>
    </div>
</footer>
<section class="page_copyright cs section_padding_top_110 section_padding_bottom_100">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <p class="page_social bottommargin_20"> <a href="#" class="social-icon light-bg-icon color-icon rounded-icon socicon-facebook"></a> <a href="#" class="social-icon light-bg-icon color-icon rounded-icon socicon-twitter"></a> <a href="#" class="social-icon light-bg-icon color-icon rounded-icon socicon-googleplus"></a> </p>
                <p class="small-text black">&copy; Copyright 2018 All Rights Reserved</p>
            </div>
        </div>
    </div>
</section>
@endsection