@extends('layouts.app')

@section('content')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.all.min.js"></script>
@include('components.header')
<section class="page_breadcrumbs cover_breadcumbs ds section_padding_25" style='background-image: url("/frontend/img/parallax/breadcrumbs3.jpg");'>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <h1>Consulting order</h1>
                <ol class="breadcrumb darklinks">
                    <li> <a href="/">
                            Home
                        </a> </li>
                    <li class="active"> <span>Consulting order</span> </li>
                </ol>
            </div>
        </div>
    </div>
</section>
<section class="ls section_padding_top_150 section_padding_bottom_150">
    <div class="container">
        <div class="row topmargin_40">
            <div class="col-sm-12 to_animate animated fadeInUp">
                <form class="contact-form" method="post" action="/contact">
                    @csrf
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group"> <label for="name">Full Name <span class="required">*</span></label> <i class="fa fa-user highlight" aria-hidden="true"></i> <input type="text" aria-required="true" size="30" value="" name="name" id="name" class="form-control" placeholder="Full Name"> </div>
                            <div class="form-group"> <label for="email">Email address<span class="required">*</span></label> <i class="fa fa-envelope highlight" aria-hidden="true"></i> <input type="email" aria-required="true" size="30" value="" name="email" id="email" class="form-control" placeholder="Email Address"> </div>
                            <div class="form-group"> <label for="subject">Company name<span class="required">*</span></label> <i class="fa fa-flag highlight" aria-hidden="true"></i> <input type="text" aria-required="true" size="30" value="" name="company" id="subject" class="form-control" placeholder="Company name"> </div>
                            <div class="form-group"> <label for="subject">Company name<span class="required">*</span></label> <i class="fa fa-flag highlight" aria-hidden="true"></i> <input type="text" aria-required="true" size="30" value="" name="company" id="subject" class="form-control" placeholder="Company name"> </div>
                            <p class="contact-form-message form-group"> <label for="message">Notes</label> <i class="fa fa-comment highlight" aria-hidden="true"></i> <textarea aria-required="true" rows="8" cols="45" name="notes" id="message" class="form-control" placeholder="Notes"></textarea> </p>

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