<!doctype html>
<html lang="en">

<head>
    <title>EasyWayInstall - Graphics and Signs Installation Company. </title>
    <meta charset="utf-8">
    <!--[if IE]>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<![endif]-->
    <meta name="description" content="Specializes in the installation of graphics, 3D window displays, vinyl, barricades, car and truck vehicle wraps, large banners, billboards, posters, signage, flags, and much more. Day or night, we work to accommodate your schedule.">
    <meta name="keywords" content="Graphics Installation Company, Retail Graphics, Architectural Graphics, Special Events Displays, Window Graphics, Cut Window Vinyl Lettering, Decorative Wall Murals, Floor Graphics, Building Wraps, Perforated Window Film, Textured Surface Graphics, New Yo">
    <meta property="og:url" content="https://www.easywayinstall.com/">
    <meta property="og:title" content="EasyWayInstall - Graphics and Signs Installation Company">
    <meta property="og:description" content="Specializes in the installation of graphics, 3D window displays, vinyl, barricades, car and truck vehicle wraps, large banners, billboards, posters, signage, flags, and much more. Day or night, we work to accommodate your schedule.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="/frontend/google_picture.jpg">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="/frontend/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://unpkg.com/beerslider/dist/BeerSlider.css">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <link rel="stylesheet" href="/frontend/css/bootstrap.min.css">
    {{-- <link rel="stylesheet" href="/frontend/css/animations.css"> --}}
    <link rel="stylesheet" href="/frontend/css/fonts.css">
    <link rel="stylesheet" href="/frontend/css/app.css">
    {{-- <link rel="stylesheet" href="/frontend/css/main.css" class="color-switcher-link"> --}}
    {{-- <link rel="stylesheet" href="/frontend/css/shop.css" class="color-switcher-link"> --}}
    <script src="/frontend/js/vendor/modernizr-2.6.2.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.9/dist/sweetalert2.min.css">

    <!--[if lt IE 9]>
		<script src="/frontend/js/vendor/html5shiv.min.js"></script>
		<script src="/frontend/js/vendor/respond.min.js"></script>
	<![endif]-->

    <!-- Yandex.Metrika counter -->
    <script type="text/javascript">
        var fired = false;

        window.addEventListener('scroll', () => {
            if (fired === false) {
                fired = true;

                setTimeout(() => {
                    (function(m, e, t, r, i, k, a) {
                        m[i] = m[i] || function() {
                            (m[i].a = m[i].a || []).push(arguments)
                        };
                        m[i].l = 1 * new Date();
                        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
                    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                    ym(84440728, "init", {
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true
                    });

                    (function(d, w, c) {
                        w.ChatraID = 'Zma9o7LEsueHNKSHY';
                        var s = d.createElement('script');
                        w[c] = w[c] || function() {
                            (w[c].q = w[c].q || []).push(arguments);
                        };
                        s.async = true;
                        s.src = 'https://call.chatra.io/chatra.js';
                        if (d.head) d.head.appendChild(s);
                    })(document, window, 'Chatra');
                }, 1000)
            }
        });
    </script>
    <noscript>
        <div><img src="https://mc.yandex.ru/watch/84440728" style="position:absolute; left:-9999px;" alt="" /></div>
    </noscript>
    <!-- /Yandex.Metrika counter -->

    
    <!-- Global site tag (gtag.js) - Google Ads: 10866148222 --> 
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10866148222"></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-10866148222'); </script> 

</head>

<body>
    <div class="preloader">
        <div class="preloader_image"></div>
    </div>

    <!-- Unyson messages modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="messages_modal">
        <div class="fw-messages-wrap ls with_padding">
            <!-- Uncomment this UL with LI to show messages in modal popup to your user: -->
            <!--
		<ul class="list-unstyled">
			<li>Message To User</li>
		</ul>
		-->
        </div>
    </div>
    <!-- eof .modal -->
    <!-- wrappers for visual page editor and boxed version of template -->
    <div id="canvas">
        <div id="box_wrapper">
            @yield('content')
        </div>
        <!-- eof #box_wrapper -->
    </div>

    <!-- eof #canvas -->
    <script src="https://unpkg.com/beerslider/dist/BeerSlider.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js" integrity="sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/frontend/js/compressed.js"></script>
    <script src="/frontend/js/selectize.min.js"></script>
    <script src="/frontend/js/main.js"></script>
    {{-- <script src="/frontend/js/main.min.js"></script> --}}
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    @if(!is_null(\Request::route()) && \Request::route()->getName() === 'main.page')
    <script src="/js/calculator.js"></script>
    @else
    <script src="/js/app.js"></script>
    @endif
</body>

</html>
