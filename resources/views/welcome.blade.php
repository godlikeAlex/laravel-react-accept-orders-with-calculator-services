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
        <img src="/frontend/images/banner.png" alt="">
    </div>
    <a href="#about-us" class="arrow">
        <ion-icon name="chevron-down-outline"></ion-icon>
    </a>
</section>

<section id="about-us" class="ls section_padding_top_75 section_padding_bottom_75">
    <div class="container">
        <div class="row flex-wrap">
            <div class="col-xs-12 col-md-6"> <img style="width: 100%; max-height: 380px; object-fit: cover;" data-src="/frontend/images/about.webp" alt="" class="cover-image lazyload"> </div>
            <div class="col-xs-12 col-md-6"> <span class="above_heading highlight">Welcome</span>
                <h2 class="section_header">About us</h2>
                <p>
                    The Easy Way Install team handles your project with the highest level of skill and accountability. We understand that every project must be done to perfection. We've worked with some of the best-known companies in the country on a wide variety of projects. Our customers rely on our ability to create the highest quality installation. We can help you to get the best installation experience. We are a fully insured company and can offer a full guarantee on every installation that we do.
                </p>
                <div class="toppadding_10 visible-md visible-lg"></div>
            </div>
        </div>
    </div>
</section>

<section class="ls section_padding_top_75 section_padding_bottom_75 alt-section">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-sm-12">
                <div class="teaser text-center">
                    <div class="teaser_icon grey size_big"> <i class="rt-icon2-checkmark2"></i> </div>
                    <h3 class="counter-wrap" data-from="0" data-to="9999" data-speed="1000"> <span class="counter" data-from="0" data-to="9999" data-speed="1500">9999</span><span class="counter-add">+</span> </h3>
                    <p>Project completed</p>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="teaser text-center">
                    <div class="teaser_icon grey size_big"> <i class="fa fa-group"></i> </div>
                    <h3 class="counter-wrap" data-from="0" data-to="10" data-speed="1300"> <span class="counter" data-from="0" data-to="10" data-speed="1500">10</span><span class="counter-add">+</span> </h3>
                    <p>Partners</p>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="teaser text-center">
                    <div class="teaser_icon grey size_big"> <i class="fa fa-rocket"></i> </div>
                    <h3 class="counter-wrap" data-from="0" data-to="100000" data-speed="1200"> <span class="counter" data-from="0" data-to="100000" data-speed="1200">10</span><span class="counter-add">+</span> </h3>
                    <p>Sq/ft of vinyl film installed</p>
                </div>
            </div>
        </div>
    </div>
</section>

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
                                            <ion-icon name="mail-outline"></ion-icon>
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">Email / Call / Website</h3>
                                            <p class="description">
                                                Pick your
                                                service and get a price
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <ion-icon name="send-outline"></ion-icon>
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">Place order</h3>
                                            <p class="description">
                                                Add all your project descriptions and email directly to us.
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <ion-icon name="calendar-outline"></ion-icon>
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">Setting up a date</h3>
                                            <p class="description">
                                                Pick a date and time
                                                than works for you
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <ion-icon name="hammer-outline"></ion-icon>
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">Preparing for installation</h3>
                                            <p class="description">
                                                You can request a private consultation, special tools, pick up & delivery of metterial
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <ion-icon name="cash-outline"></ion-icon>
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">Deposit</h3>
                                            <p class="description">
                                                You must pay 20% down
                                                before the job starts
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <ion-icon name="build-outline"></ion-icon>
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">Installation</h3>
                                            <p class="description">
                                                You will get a notification from us as each
                                                step of installation is a progressing. We also invite you to be on site and watch how we are make a done
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <ion-icon name="reader-outline"></ion-icon>
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">Quality control </h3>
                                            <p class="description">
                                                On this step installers will go thought to make sure that everything is perfect, will take a final pictures and email them to you
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div class="timeline">
                                    <a class="timeline-content">
                                        <span class="year">
                                            <ion-icon name="card-outline"></ion-icon>
                                        </span>
                                        <div class="inner-content">
                                            <h3 class="title">Final payment</h3>
                                            <p class="description">
                                                If you satisfied with work, we will automatically charge rest of amount or email you invoice
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

<section id="products" class="ls section_padding_top_75 section_padding_bottom_75 alt-section">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <h2 class="section_header">What I Get</h2>
                <div class="row flex-wrap loop-colors columns_padding_30 columns_margin_bottom_50">
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="clr-maths"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Price calculation</h3>
                                <p>You can see a price for your future project online</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="fa fa-group"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Personal approach </h3>
                                <p>Despite the calculator, you can always get your estimate by phone or email or have free consulting</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="rt-icon2-chat"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Real-time update</h3>
                                <p>You will receive email notification about your job status</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="rt-icon2-medal"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Loyalty Program</h3>
                                <p>After first installation you become our trusted client and we will call or meet with you to discuss your strategy for future projects</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="clr-car"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Pickup and delivery </h3>
                                <p>You get delivery option from us. Now you can be sure your item will be deliver safe and install in quality</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="teaser hover-teaser main_bg_color big-padding text-center">
                            <div>
                                <div class="teaser_icon highlight size_small"> <i class="rt-icon2-time"></i> </div>
                                <h3 class="entry-title small bottommargin_0">Completed in time </h3>
                                <p>We are always let you know when we arrived at the job side</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="ls section_padding_top_75 section_padding_bottom_75" id="calculator">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="file-upload-wrapper cs main_color1 with_padding big-padding " style="background: whitesmoke; box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;">
                    <h2 class="section_header text-center">Calculate Your Services</h2>
                    <div id="react-frontend-calculator"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="ls section_padding_top_75 section_padding_bottom_75 alt-section">
    <div class="container">
        <h2 class="section_header text-center">Our Works</h2>

        <div class="col-md-12">
            <!-- Tab panes -->
            <div class="tab-content tab-unstyled">
                <div class="tab-pane fade in active" id="tab-unstyled-1">
                    <div style="width: 100%; height: 100%" id="slider" class="beer-slider " data-beer-label="BEFORE">
                        <img style="width: 100%; height: 100%; object-fit: cover;" src="/frontend/images/gallery/before1.webp" class="lazyload" alt="">
                        <div class="beer-reveal" data-beer-label="AFTER">
                            <img style=" " src="/frontend/images/gallery/after1.webp" class="lazyload" alt="">
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="tab-unstyled-2">
                    <div id="beer-slider" class="beer-slider" data-beer-label="before">
                        <img src="/frontend/images/gallery/after2.webp" alt="Original - Man holding beer">
                        <div class="beer-reveal" data-beer-label="after">
                            <img src="/frontend/images/gallery/before2.webp" alt="Processed - Man holding beer">
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tab-unstyled-3">
                    <div id="beer-slider" class="beer-slider" data-beer-label="before">
                        <img src="/frontend/images/gallery/after3.webp" alt="Original - Man holding beer">
                        <div class="beer-reveal" data-beer-label="after">
                            <img src="/frontend/images/gallery/before3.webp" alt="Processed - Man holding beer">
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tab-unstyled-4">
                    <div id="beer-slider" class="beer-slider" data-beer-label="before">
                        <img src="/frontend/images/gallery/after3.webp" alt="Original - Man holding beer">
                        <div class="beer-reveal" data-beer-label="after">
                            <img src="/frontend/images/gallery/before3.webp" alt="Processed - Man holding beer">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Nav tabs -->
            <ul class="nav-unstyled darklinks before-tabs col-md-12" role="tablist">
                <li class="active"><a href="#tab-unstyled-1" role="tab" data-toggle="tab">
                        <img src="/frontend/images/gallery/before1.webp" alt="">
                    </a>
                </li>
                <li><a href="#tab-unstyled-2" role="tab" data-toggle="tab">
                        <img src="/frontend/images/gallery/before2.webp" alt="">
                    </a></li>
                <li><a href="#tab-unstyled-3" role="tab" data-toggle="tab">
                        <img src="/frontend/images/gallery/before3.webp" alt="">
                    </a></li>
                <li><a href="#tab-unstyled-4" role="tab" data-toggle="tab">
                        <img src="/frontend/images/gallery/before4.webp" alt="">
                    </a></li>
            </ul>
        </div>
    </div>
</section>

<section id="featured-video" class="cs main_color5 overlay_color parallax section_padding_top_150 section_padding_bottom_150">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 text-center"> <a href="https://www.youtube.com/watch?v=XPhNqMqtW1c&t=1s&ab_channel=EasyWayInstall" class="theme_button bg_button color3 round_button play_button margin_0" data-gal="prettyPhoto[gal-video]">
                    <i class="fa fa-play" aria-hidden="true"></i>
                </a>
                <div class="toppadding_30 visible-lg"></div>
                <div class="toppadding_30"></div> <span class="above_heading highlight2">Video Presentation</span>
                <h2 class="section_header black">Our Working Process</h2>
            </div>
        </div>
    </div>
</section>

<section id="testimonials" class="ls section_padding_top_75 section_padding_bottom_75">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <h2 class="section_header text-center">Reviews</h2>
                <div class="owl-carousel testimonials-owl-carousel" data-responsive-lg="1" data-responsive-md="1" data-responsive-sm="1" data-dots="true" data-nav="false">
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
                </div>
            </div>
        </div>
    </div>
</section>

<section class="ls section_padding_top_75 section_padding_bottom_75 alt-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div id="row" style="display: flex; align-items: center; flex-wrap: wrap">
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

<section id="contact" class="cs parallax section_padding_top_150 section_padding_bottom_150">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-7 col-lg-6"> <span class="above_heading black">Request a quote</span>
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
                            <div class="form-group"> <input type="text" aria-required="true" name="subject" id="subject" class="form-control" placeholder="What you're interested in?"> </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="form-group"> <textarea aria-required="true" rows="3" cols="45" name="message" id="message" class="form-control" placeholder="Message"></textarea> </div>
                        </div>
                        <div class="">
                            <div class="contact-form-submit col-xs-12 col-md-6"> <button type="submit" id="contact_form_submit" name="contact_submit" class="theme_button bg_button color1 margin_0" style="background: white; color: black; width: 100%;">Submit a quote</button> </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<section id="testimonials" class="ls section_padding_top_75 section_padding_bottom_75">
    <div class="container">
        <h2 class="section_header text-center">FAQ</h2>
        <div class="row">
            <div class="panel-group color4 col-md-12" id="accordion1">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapse1">
                                Is that posible to install vinyl film on wood surface?
                            </a> </h4>
                    </div>
                    <div id="collapse1" class="panel-collapse collapse in">
                        <div class="panel-body">Yes, we can install vinyl on wood surface by using "3M Architectural Finishes" films.</div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapse2" class="collapsed">
                                Can I track my service by using smartphone?
                            </a> </h4>
                    </div>
                    <div id="collapse2" class="panel-collapse collapse">
                        <div class="panel-body">
                            You will see your job status in client cabinet and also will receive notification about your job status
                        </div>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapse4" class="collapsed">
                                What is the purpose of display?
                            </a> </h4>
                    </div>
                    <div id="collapse4" class="panel-collapse collapse">
                        <div class="panel-body">
                            The purpose of the display is present larger products, help customers determine if the product they are looking for suits their needs (if it looks good with other fixtures), and to entice customers to purchase the other products featured together.
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapse5" class="collapsed">
                                How to place order?
                            </a> </h4>
                    </div>
                    <div id="collapse5" class="panel-collapse collapse">
                        <div class="panel-body">
                            Please email us full information of your project (dimension and quantity, surface, working height and photos) or (Vehicle make, year, conditions and photos). After that we will provide you a quote. If the price will work for you we will schedule installation date.
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion1" href="#collapse6" class="collapsed">
                                Do I need pay deposit?
                            </a> </h4>
                    </div>
                    <div id="collapse6" class="panel-collapse collapse">
                        <div class="panel-body">
                            After scheduling process we will email you request to pay 20% down of your invoice. This money will be on hold until the project complete.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@include('components.footer')
@endsection