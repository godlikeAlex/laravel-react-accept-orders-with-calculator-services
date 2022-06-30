<section class="section_padding_top_150 section_padding_bottom_150 {{$section == 'alt' ? 'alt-section' : ''}}">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 text-center ">
                <h2 class="section_header" style="margin-bottom: 40px">Let's start a new project together</h2>
            </div>
            <div class="col-md-12">
                <form class="contact-form" method="post" action="/contact">
                    @csrf
                    <div class="row columns_margin_bottom_20">
                        <div class="col-md-3">
                            <div class="form-group"> <input type="text" aria-required="true" size="30" value="" name="name" id="name" class="form-control" placeholder="Name"> </div>
                        </div>
                        <div class="col-md-3 with-input-changer">
                            <div class="form-group toggled-inputs">
                                <input type="email" aria-required="true" size="30" value="" name="email" id="email" class="form-control" placeholder="Email">
                            </div>
                            <ion-icon name="call-outline"></ion-icon>

                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <select name="service" id="" placeholder="Select your service">
                                    <option></option>
                                    <option>Vinyl</option>
                                    <option>Vehicle wrap</option>
                                    <option>Wallpaper</option>
                                    <option>Sign</option>
                                    <option>Banner</option>
                                    <option>Flag</option>
                                    <option>Board</option>
                                    <option>Frame</option>
                                    <option>Letters</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="contact-form-submit" style="margin-top: 0px"> <button type="submit" id="contact_form_submit" name="contact_submit" class="theme_button bg_button color1 margin_0" style="width: 100%;">Submit a request</button> </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="col-md-12 text-center ">
                <h2 class="section_header" style="margin-bottom: 40px; margin-top: 40px">Get in touch</h2>
            </div>

            <div class="col-md-12">
                <div class="row" style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <div class="col-md-3" style="margin-bottom: 25px">
                        <div class="media-left"> <i style="color: #ED0598;" class="rt-icon2-phone5 highlight fontsize_18"></i> </div>
                        <div class="media-body">
                            <h6 class="media-heading grey">Call us:</h6>
                            <a href="tel:+1 201 855 63 45" style="color: #808080;">(201) 992-6346</a>
                        </div>
                    </div>

                    <div class="col-md-3" style="margin-bottom: 25px">
                        <div class="media-left"> <i style="color: #ED0598;" class="rt-icon2-mail highlight fontsize_18"></i> </div>
                        <div class="media-body greylinks">
                            <h6 class="media-heading grey">Text us:</h6>
                            <a href="mailto:info@easywayinstall.com" style="color: #808080">info@easywayinstall.com</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12 get-in-touch" style="margin-top: 40px" >
                <a class="col-md-2" href="https://t.me/ViktorHnativ" target="_blank" rel="noopener noreferrer">
                    <img src="/frontend/telegram.svg" style="width: 50px" alt="" srcset=""> Telegram

                <a class="col-md-2" href="https://wa.me/13473302455" style="padding-left: 10px" target="_blank" rel="noopener noreferrer">
                    <img src="/frontend/whatsapp.svg" style="width: 50px" alt="" srcset=""> Whatsapp
                </a>

                <a class="col-md-2" href="http://m.me/viktor.gnativ" target="_blank" style="padding-left: 10px" rel="noopener noreferrer">
                    <img src="/frontend/messanger.svg" style="width: 50px" alt="" srcset=""> Messenger
                </a>
            </div>
        </div>
    </div>
</section>
