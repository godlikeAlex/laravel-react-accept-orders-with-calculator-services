@extends('layouts.app')

@section('content')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.all.min.js"></script>
@include('components.header')
<section class="page_breadcrumbs cover_breadcumbs ds section_padding_25" style='background-image: url("/frontend/img/parallax/breadcrumbs3.jpg");'>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <h1>Contact</h1>
                <ol class="breadcrumb darklinks">
                    <li> <a href="/">
                            Home
                        </a> </li>
                    <li class="active"> <span>Contact</span> </li>
                </ol>
            </div>
        </div>
    </div>
</section>
<section class="ls section_padding_top_150 section_padding_bottom_150">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <section id="map" class="ls ms" data-address="522 Chapel St, South Yarra VIC 3141, Australia">
                    <!-- marker description and marker icon goes here -->
                    <div class="map_marker_description">
                        <h3>Map Title</h3>
                        <p>Map description text</p> <img class="map_marker_icon" src="images/map_marker_icon.png" alt="">
                    </div>
                </section>
            </div>
        </div>
        <div class="row topmargin_40">
            <div class="col-sm-4 to_animate animated pullDown" data-animation="pullDown">
                <div class="teaser text-center">
                    <div class="teaser_icon highlight size_normal"> <i class="rt-icon2-phone5"></i> </div>
                    <p> <span class="grey">Phone:</span> +1 201 855 63 45<br> <span class="grey">Fax:</span> +1 201 855 63 45 </p>
                </div>
            </div>
            <div class="col-sm-4 to_animate animated pullDown" data-animation="pullDown">
                <div class="teaser text-center">
                    <div class="teaser_icon highlight size_normal"> <i class="rt-icon2-location2"></i> </div>
                    <p> New York, NY
                        <br>Boston, MA
                        <br> Dalas, TX,
                    </p>
                </div>
            </div>
            <div class="col-sm-4 to_animate animated pullDown" data-animation="pullDown">
                <div class="teaser text-center">
                    <div class="teaser_icon highlight size_normal"> <i class="rt-icon2-mail"></i> </div>
                    <p>assit.easywaynyc@gmail.com</p>
                </div>
            </div>
        </div>
        <div class="row topmargin_40">
            <div class="col-sm-12 to_animate animated fadeInUp">
                <form class="contact-form" method="post" action="/contact">
                    @csrf
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group"> <label for="name">Full Name <span class="required">*</span></label> <i class="fa fa-user highlight" aria-hidden="true"></i> <input type="text" aria-required="true" size="30" value="" name="name" id="name" class="form-control" placeholder="Full Name"> </div>
                            <div class="form-group"> <label for="email">Email address<span class="required">*</span></label> <i class="fa fa-envelope highlight" aria-hidden="true"></i> <input type="email" aria-required="true" size="30" value="" name="email" id="email" class="form-control" placeholder="Email Address"> </div>
                            <div class="form-group"> <label for="subject">Subject<span class="required">*</span></label> <i class="fa fa-flag highlight" aria-hidden="true"></i> <input type="text" aria-required="true" size="30" value="" name="subject" id="subject" class="form-control" placeholder="Subject"> </div>
                        </div>
                        <div class="col-sm-6">
                            <p class="contact-form-message form-group"> <label for="message">Message</label> <i class="fa fa-comment highlight" aria-hidden="true"></i> <textarea aria-required="true" rows="8" cols="45" name="message" id="message" class="form-control" placeholder="Message"></textarea> </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <p class="contact-form-submit text-center topmargin_10"> <button type="submit" id="contact_form_submit" name="contact_submit" class="theme_button color1 margin_0">Send Message</button> </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
@endsection