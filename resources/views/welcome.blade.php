@extends('layouts.app')

@section('content')
<!-- template sections -->
@include('components.header')

<section class="intro_section page_mainslider cs all-scr-cover image-dependant">
    <div class="container-fluid" style="width: 100%;    ">
        <div class="row">
            <div class="col-xs-12 text-center">
                <div class="">
                    <div class="">
                        <div class="intro-layer to_animate" data-animation="fadeInUp">
                            <h1 class="black hero-text">IT'S WHAT <br /> WE DO</h1>
                        </div>
                    </div>

                </div>
            </div>
            <!-- eof .col-* -->
        </div>
        <!-- eof .row -->
    </div>
    <div class="banner-phone">
        <img src="/frontend/images/banner.webp" alt="">
    </div>
    <a href="#about-us" class="arrow">
        <ion-icon name="chevron-down-outline"></ion-icon>
    </a>
</section>
@include('components.contact-form', ['section' => 'alt'])
<section id="about-us" class="ls section_padding_top_75 section_padding_bottom_75 ">
    <div class="container">
        <div class="row flex-wrap">
            <div class="col-xs-12 col-md-6"> <img data-src="/frontend/images/about.webp" alt="" class="cover-image lazyload"> </div>
            <div class="col-xs-12 col-md-6"> <span class="above_heading highlight">Welcome</span>
                <h2 class="section_header">About us</h2>
                <p>
                    The Easy Way Install team handles any project with the highest level of skill and accountability. Our customers continue to rely on our ability to provide the highest quality of installations. Through our dedicated commitment to client satisfaction and knowledge of even the most critical details, we have cultivated long standing working relationships with top recognized organizations within our industry. We have coordinated on a wide variety of projects and would want nothing less than to provide you with a precise, stress-free installation experience. The “Easy Way Install” team is a fully insured company and can offer a guarantee on every installation that we complete for you.
                </p>
                <div class="toppadding_10 visible-md visible-lg"></div>
            </div>
        </div>
    </div>
</section>


<section class="ls section_padding_top_75 section_padding_bottom_75" id="calculator" style="background: #fcfcfc">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="file-upload-wrapper cs main_color1 with_padding big-padding " style="background: #f4f4f4; box-shadow: rgba(0, 0, 0, 0.15) -0.0px 1.95px 1.6px">
                    {{-- <div class="file-upload-wrapper cs main_color1 with_padding big-padding " style="background: whitesmoke; box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"> --}}
                    <div id="react-frontend-calculator"></div>
                </div>
            </div>
        </div>
    </div>
</section>


<section id="products" class="ls section_padding_top_75 section_padding_bottom_75">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <h2 class="section_header">What I Get</h2>
                <div class="row flex-wrap loop-colors columns_padding_30 columns_margin_bottom_50">
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center" style="height:  450px;">
                            <div>
                                <div class="teaser_icon highlight size_small"> 
                                    <img src="/frontend/images/1.svg" style="width: 120px" alt="" srcset="">    
                                </div>
                                <h3 class="entry-title small bottommargin_0">Price calculation</h3>
                                <p>You can estimate a price for your future project from the comfort of your home.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center" style="height:  450px;">
                            <div>
                                <div class="teaser_icon highlight size_small"> 
                                    <img src="/frontend/images/2.svg" style="width: 120px" alt="" srcset="">    
                                </div>
                                <h3 class="entry-title small bottommargin_0">Personal approach </h3>
                                <p>
                                    Besides the calculator function of our website, you can always schedule a quote by email
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center" style="height:  450px;">
                            <div>
                                <div class="teaser_icon highlight size_small"> 
                                    <img src="/frontend/images/5.svg" style="width: 120px" alt="" srcset="">    
                                </div>
                                <h3 class="entry-title small bottommargin_0">Real-time update</h3>
                                <p>you will receive email notifications with job updates</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center" style="height:  450px;">
                            <div>
                                <div class="teaser_icon highlight size_small"> 
                                    <img src="/frontend/images/6.svg" style="width: 120px" alt="" srcset="">    
                                </div>
                                <h3 class="entry-title small bottommargin_0">Personalized orders</h3>
                                <p>We create a personalized account to see your previous and saved orders and we will work together with you to coordinate a strategy for any of your future projects</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center" style="height:  450px;">
                            <div>
                                <div class="teaser_icon highlight size_small">
                                    <img src="/frontend/images/3.svg" style="width: 120px" alt="" srcset="">
                                </div>
                                <h3 class="entry-title small bottommargin_0">Pickup and delivery </h3>
                                <p>
                                    we provide pickup and delivery of materials to and from Job-Sites when requested
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center" style="height:  450px;">
                            <div>
                                <div class="teaser_icon highlight size_small"> 
                                    <img src="/frontend/images/4.svg" style="width: 120px" alt="" srcset="">    
                                </div>
                                <h3 class="entry-title small bottommargin_0">Completed in time </h3>
                                <p>
                                    We understand everyone has specific time horizons, so we put pressure on punctuality and communication with our clients.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('components.contact-form', ['section' => 'alt'])

<section id="process" class="ls section_padding_top_75 section_padding_bottom_75">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <h2 class="section_header">Process</h2>
                <div class="toppadding_10 visible-lg"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="main-timeline4">
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <img src="/frontend/images/proccess-1.svg" alt="" srcset="">
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">PICK YOUR PRODUCT</h3>
                                            <p class="description">
                                                Pick your service and get your quote
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <img src="/frontend/images/proccess-2.svg" alt="" srcset="">
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">PLACE YOUR ORDER
                                            </h3>
                                            <p class="description">Provide your service description and personal preferences</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <img src="/frontend/images/proccess-3.svg" alt="" srcset="">
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">Setting up a date</h3>
                                            <p class="description">
                                                Pick a time and date that works best for you
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <img src="/frontend/images/proccess-4.svg" alt="" srcset="">
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">Preparing for installation</h3>
                                            <p class="description">
                                                You can request a private consultation, special tools and schedule the pick up & delivery of material
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <img src="/frontend/images/proccess-5.svg" alt="" srcset="">
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">PAYMENT</h3>
                                            <p class="description">
                                                Worry-free guarantee payment process
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <img src="/frontend/images/proccess-6.svg" alt="" srcset="">
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">INSTALLATION PROCESS</h3>
                                            <p class="description">
                                                You will receive a notification updating you on every step of the installation process and we invite all of our clients to be present for the install to guarantee their satisfaction.
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <img src="/frontend/images/proccess-7.svg" alt="" srcset="">
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">QUALITY CONTROL </h3>
                                            <p class="description">
                                                This step is crucial as our team will make a final tour around the completed project and check off all aspects of the job with the prospective client
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <img src="/frontend/images/proccess-8.svg" alt="" srcset="">
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">E-SIGN</h3>
                                            <p class="description">
                                                Upon job completion we require an autograph
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



<section class="ls section_padding_top_75 section_padding_bottom_75 alt-section">
    <div class="container">
        <h2 class="section_header text-center">Our Works</h2>
        <div style="display: flex; justify-content: center;">
            <div class="col-md-10">
                <!-- Tab panes -->
                <div class="tab-content tab-unstyled">
                    <div class="tab-pane fade in active" id="tab-unstyled-1">
                        <div id="slider" class="beer-slider" data-beer-label="AFTER">
                            <img src="/frontend/images/gallery/2.jpg" alt="">
                            <div class="beer-reveal" data-beer-label="BEFORE">
                                <img src="/frontend/images/gallery/1.jpg" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade in" id="tab-unstyled-2">
                        <div class="beer-slider" data-beer-label="AFTER">
                            <img src="/frontend/images/gallery/4.jpg" alt="">
                            <div class="beer-reveal" data-beer-label="BEFORE">
                                <img src="/frontend/images/gallery/3.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade in" id="tab-unstyled-3">
                        <div class="beer-slider" data-beer-label="AFTER">
                            <img src="/frontend/images/gallery/6.jpg" alt="">
                            <div class="beer-reveal" data-beer-label="BEFORE">
                                <img src="/frontend/images/gallery/5.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade in" id="tab-unstyled-4">
                        <div class="beer-slider" data-beer-label="AFTER">
                            <img src="/frontend/images/gallery/8.jpg" alt="">
                            <div class="beer-reveal" data-beer-label="BEFORE">
                                <img src="/frontend/images/gallery/7.jpg" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade in" id="tab-unstyled-5">
                        <div class="beer-slider" data-beer-label="AFTER">
                            <img src="/frontend/images/gallery/10.jpg" alt="">
                            <div class="beer-reveal" data-beer-label="BEFORE">
                                <img src="/frontend/images/gallery/9.jpg" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade in" id="tab-unstyled-6">
                        <div class="beer-slider" data-beer-label="AFTER">
                            <img src="/frontend/images/gallery/12.jpg" alt="">
                            <div class="beer-reveal" data-beer-label="BEFORE">
                                <img src="/frontend/images/gallery/11.jpg" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade in" id="tab-unstyled-7">
                        <div class="beer-slider" data-beer-label="AFTER">
                            <img src="/frontend/images/gallery/14.jpg" alt="">
                            <div class="beer-reveal" data-beer-label="BEFORE">
                                <img src="/frontend/images/gallery/13.jpg" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Nav tabs -->
                <ul class="nav-unstyled darklinks before-tabs col-md-12 only-mobile" role="tablist">
                    <li class="active"><a href="#tab-unstyled-1" role="tab" data-toggle="tab">
                            <img src="/frontend/images/gallery/1.jpg" alt="">
                        </a>
                    </li>
                    <li><a href="#tab-unstyled-2" role="tab" data-toggle="tab">
                            <img src="/frontend/images/gallery/3.jpg" alt="">
                        </a></li>
                    <li><a href="#tab-unstyled-3" role="tab" data-toggle="tab">
                            <img src="/frontend/images/gallery/5.jpg" alt="">
                        </a></li>
                    <li><a href="#tab-unstyled-4" role="tab" data-toggle="tab">
                            <img src="/frontend/images/gallery/7.jpg" alt="">
                        </a></li>

                    <li><a href="#tab-unstyled-5" role="tab" data-toggle="tab">
                            <img src="/frontend/images/gallery/9.jpg" alt="">
                        </a></li>

                    <li><a href="#tab-unstyled-6" role="tab" data-toggle="tab">
                            <img src="/frontend/images/gallery/11.jpg" alt="">
                        </a></li>

                    <li><a href="#tab-unstyled-7" role="tab" data-toggle="tab">
                            <img src="/frontend/images/gallery/13.jpg" alt="">
                        </a></li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section id="featured-video" style="height: 80vh;" class="">
    <video playsinline="" autoplay="" muted="" loop="" id="bgvid" style="
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        ">
        <source src="./video.mp4" type="video/mp4">
    </video>

    <div class="mute">
        <ion-icon name="volume-high-outline" class="unmuted" style="display: none"></ion-icon>
        <ion-icon name="volume-mute-outline" class="muted"></ion-icon>
    </div>
</section>

@include('components.contact-form', ['section' => ''])

<section id="testimonials" class="ls section_padding_top_75 section_padding_bottom_75 alt-section">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <h2 class="section_header text-center">Reviews</h2>
                <div class="owl-carousel testimonials-owl-carousel" data-responsive-lg="1" data-responsive-md="1" d ata-responsive-sm="1" data-dots="true" data-nav="false" data-owl-autoplay="true" data-owl-autoplay-timeout="2000">
                    <blockquote>
                        <footer><cite>Michael Stroh</cite><span class="small-text highlight">Vice President Sales, AlphaGraphics</span></footer>
                        <p>The Easy Way Team are talented and accomplished install professionals. When we use Easy Way services our clients are very pleased with their work.</p>
                    </blockquote>
                    <blockquote>
                        <footer><cite>Peter Brand</cite><span class="small-text highlight">President, Unique Advertising & Display Corp.
                            </span></footer>
                        <p>
                            The Easy Way Team, your support and employees have been a great addition to our work we provide for our customers. Thank you for being responsive, professional and always working with our deadlines to get the job done. We look forward to working with you on many more jobs ahead.
                        </p>
                    </blockquote>
                    <blockquote>
                        <footer><cite>Ari Grazi</cite><span class="small-text highlight">President, Indiewalls</span></footer>
                        <p>I highly recommend Viktor and his team. No complaints!</p>
                    </blockquote>

                    <blockquote>
                        <footer><cite>See more</cite></footer>
                        <p>
                            See more reviews at <a href="https://www.yelp.com/biz/easy-way-install-staten-island" target="_blank" class="theme_button color1">Yelp</a> and <a href="https://g.page/r/CaTHPPr_OoZ6EAE" target="_blank" class="theme_button color1">Google</a>
                        </p>
                    </blockquote>
                </div>
            </div>
        </div>
    </div>
</section>


<section class="ls section_padding_top_75 section_padding_bottom_75 ">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-sm-12">
                <div class="teaser text-center">
                    <div class="teaser_icon grey size_big"> 
                        <img src="/frontend/images/counter-1.png" style="width: 180px" alt="">    
                    </div>
                    <h3 class="counter-wrap" data-from="0" data-to="9999" data-speed="1000"> <span class="counter" data-from="0" data-to="9999" data-speed="1500">9999</span><span class="counter-add">+</span> </h3>
                    <p>Project completed</p>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="teaser text-center">
                    <div class="teaser_icon grey size_big"> 
                        <img src="/frontend/images/counter-2.png" style="width: 180px" alt="">    
                    </div>
                    <h3 class="counter-wrap" data-from="0" data-to="10" data-speed="1300"> <span class="counter" data-from="0" data-to="10" data-speed="1500">10</span><span class="counter-add">+</span> </h3>
                    <p>Partners</p>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="teaser text-center">
                    <div class="teaser_icon grey size_big">
                        <img src="/frontend/images/counter-3.png"  style="width: 180px" alt="">    
                    </div>
                    <h3 class="counter-wrap" data-from="0" data-to="100000" data-speed="1200"> <span class="counter" data-from="0" data-to="100000" data-speed="1200">10</span><span class="counter-add">+</span> </h3>
                    <p>Sq/ft of vinyl film installed</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="ls section_padding_top_75 section_padding_bottom_75 alt-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div id="row" style="display: flex; align-items: center;" class="partners">
                    <div class="vertical-item gallery-item col-xs-4 col-sm-4 col-md-2">
                        <img data-src="/frontend/images/partners/partner1.png" class="lazyload" alt="">
                    </div>
                    <div class="vertical-item gallery-item col-xs-4 col-sm-4 col-md-2">
                        <img style="max-width: 75%" data-src="/frontend/images/partners/partner2.svg" class="lazyload" alt="">
                    </div>
                    <div class="vertical-item gallery-item col-xs-4 col-sm-4 col-md-2">
                        <img data-src="/frontend/images/partners/partner3.svg" class="lazyload" alt="">
                    </div>
                    <div class="vertical-item gallery-item col-xs-4 col-sm-4 col-md-2">
                        <img style="max-width: 75%" data-src="/frontend/images/partners/partner4.svg" class="lazyload" alt="">
                    </div>
                    <div class="vertical-item gallery-item col-xs-4 col-sm-4 col-md-2">
                        <img data-src="/frontend/images/partners/partner5.png" class="lazyload" alt="">
                    </div>
                    <div class="vertical-item gallery-item col-xs-4 col-sm-4 col-md-2">
                        <img data-src="/frontend/images/partners/partner6.png" class="lazyload" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="contact" class="section_padding_top_150 section_padding_bottom_150">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-6 ">
                <span class="above_heading black">CONTACT US</span>
                <h2 class="section_header">We Usually Answer Within One Hour</h2>
                <form class="contact-form" method="post" action="/contact">
                    @csrf
                    <div class="row columns_margin_bottom_20">
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group"> <input type="text" aria-required="true" size="30" value="" name="name" id="name" class="form-control" placeholder="Name"> </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group"> <input type="email" aria-required="true" size="30" value="" name="email" id="email" class="form-control" placeholder="Email"> </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="form-group">
                                <input type="text" aria-required="true" size="30" value="" name="subject" id="subject" class="form-control" placeholder="Subject">
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="form-group"> <textarea aria-required="true" rows="4" cols="45" name="message" id="message" class="form-control" placeholder="Message"></textarea> </div>
                        </div>
                        <div class="">
                            <div class="contact-form-submit col-xs-12 col-md-6"> <button type="submit" id="contact_form_submit" name="contact_submit" class="theme_button bg_button color1 margin_0" style="width: 100%;">Submit a request</button> </div>
                        </div>
                    </div>
                </form>

            </div>

            <div class="col-xs-12 col-md-6">
                <span class="above_heading black" style="height: 14px"></span>
                <h2 class="section_header" style="height: 100px;"></h2>

                <ul class="list1 no-bullets no-top-border no-bottom-border col-md-12">
                    <li class="col-md-12" style="margin-top: 0px; padding: 0; margin-bottom: 20px">
                        <div class="media form-group" style="margin-bottom: 0; height: 80px">
                            <div class="media-left"> <i style="color: #ED0598;" class="rt-icon2-phone5 highlight fontsize_18"></i> </div>
                            <div class="media-body">
                                <h6 class="media-heading grey">PHONE:</h6>
                                <a href="tel:(949) 942-1363" style="color: #808080;">(949) 942-1363</a>
                            </div>
                        </div>
                    </li>

                    <li class="col-md-12" style="padding: 0; margin-bottom: 20px">
                        <div class="media form-group" style="margin-bottom: 0; height: 80px">
                            <div class="media-left"> <i style="color: #ED0598;" class="rt-icon2-mail highlight fontsize_18"></i> </div>
                            <div class="media-body greylinks">
                                <h6 class="media-heading grey">EMAIL:</h6>
                                <a href="mailto:info@easywayinstall.com" style="color: #808080">info@easywayinstall.com</a>
                            </div>
                        </div>
                    </li>
                    <li class="col-md-12" style="padding: 0; margin-bottom: 20px">
                        <div class="media form-group" style="margin-bottom: 0; height: 80px">
                            <div class="media-left"> <i style="color: #ED0598;" class="social-icon socicon-whatsapp"></i> </div>
                            <div class="media-body">
                                <h6 class="media-heading grey">GET IN TOUCH:</h6>
         
                                <a href="https://t.me/ViktorHnativ" target="_blank" rel="noopener noreferrer">
                                    <img src="/frontend/telegram.svg" style="width: 30px" alt="" srcset="">
                                </a>

                                <a href="https://wa.me/13473302455" style="padding-left: 10px" target="_blank" rel="noopener noreferrer">
                                    <img src="/frontend/whatsapp.svg" style="width: 30px" alt="" srcset="">
                                </a>

                                <a href="https://www.facebook.com/easywayinstall" target="_blank" style="padding-left: 10px" rel="noopener noreferrer">
                                    <img src="/frontend/facebook.svg" style="width: 30px" alt="" srcset="">
                                </a>

                                <a href="https://www.instagram.com/easywayinstall/" target="_blank" style="padding-left: 10px" rel="noopener noreferrer">
                                    <img src="/frontend/instagram.png" style="width: 30px" alt="" srcset="">
                                </a>
                            </div>
                        </div>
                    </li>
                    <li class="col-md-12" style="padding: 0; margin-bottom: 20px">
                        <div class="media form-group" style="margin-bottom: 0; height: 80px">
                            <div class="media-left"> <i style="color: #ED0598;" class="rt-icon2-shop highlight fontsize_18"></i> </div>
                            <div class="media-body">
                                <h6 class="media-heading grey">POSTAL ADDRESS:</h6>
                                <span style="color: #808080;">591 MARCY AVE APT 2, STATEN ISLAND 10309 NEW YORK</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section id="testimonials" class="ls section_padding_top_75 section_padding_bottom_75 alt-section">
    <div class="container">
        <h2 class="section_header text-center">FAQ</h2>
        <div class="row">
            <div class="panel-group color4 col-md-12" id="accordion1">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapse1">
                                Where location area do we cover?
                            </a> </h4>
                    </div>
                    <div id="collapse1" class="panel-collapse collapse in">
                        <div class="panel-body">
                            Easy Way Install team covers the New York City and Tri state area.
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapse2" class="collapsed">
                                How to cancel, reschedule, change my order
                            </a> </h4>
                    </div>
                    <div id="collapse2" class="panel-collapse collapse">
                        <div class="panel-body">
                            If you notice a mistake or you would like to change or cancel your order then please:
                            <ul>
                                <li>Go to your profile and find the order that you want to do action select</li>
                                <li>Click “show details”</li>
                                <li>Please select action you want to do</li>
                            </ul>
                            After that you will receive email confirmation if the order has been changed or canceled. Please note you will be charge cancelation fee of $250 if you cancel your order in less than 48 hrs before the installation.
                        </div>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapse4" class="collapsed">
                                Can I order an installation the next day?
                            </a> </h4>
                    </div>
                    <div id="collapse4" class="panel-collapse collapse">
                        <div class="panel-body">
                            We provide an option for next-day installation for all of our customers.
                        </div>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapse5" class="collapsed">
                                Can I order a quote?
                            </a> </h4>
                    </div>
                    <div id="collapse5" class="panel-collapse collapse">
                        <div class="panel-body">
                            Yes you can. To do that please:
                            <ul>
                                <li>In calculator please click “other” or go to “contact us” form</li>
                                <li>Simply fill out the form and type all details about your project</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapse6" class="collapsed">
                                What details should I provide to get a quote?
                            </a> </h4>
                    </div>
                    <div id="collapse6" class="panel-collapse collapse">
                        <div class="panel-body">
                            Here is a list of questions we will need from you:
                            <ul>
                                <li>Location</li>
                                <li>Date</li>
                                <li>What do you need to install or remove and etc.</li>
                                <li>What equipment is needed for this (10 ft ladder / Lift / Drill / Drill bit for ceramic and etc.)</li>
                                <li>Picture of material and location </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</section>

<script>
    const video = document.querySelector('#bgvid');
    const muteBtn = document.querySelector('.mute');
    const muted = document.querySelector('.muted');
    const unmuted = document.querySelector('.unmuted');

    muteBtn.addEventListener('click', e => {

        video.muted = !video.muted;

        if (video.muted) {
            unmuted.style.display = 'none';
            muted.style.display = 'block';
        } else {
            muted.style.display = 'none';
            unmuted.style.display = 'block';
        }
    })
</script>

@include('components.footer')
@endsection
