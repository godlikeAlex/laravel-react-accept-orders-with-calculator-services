<!doctype html>
<html lang="en">

<head>
    <title>Colorway</title>
    <meta charset="utf-8">
    <!--[if IE]>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<![endif]-->
    <meta name="description" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <link rel="stylesheet" href="/frontend/css/bootstrap.min.css">
    <link rel="stylesheet" href="/frontend/css/animations.css">
    <link rel="stylesheet" href="/frontend/css/fonts.css">
    <link rel="stylesheet" href="/frontend/css/main.css" class="color-switcher-link">
    <link rel="stylesheet" href="/frontend/css/shop.css" class="color-switcher-link">
    <script src="/frontend/js/vendor/modernizr-2.6.2.min.js"></script>

    <!--[if lt IE 9]>
		<script src="/frontend/js/vendor/html5shiv.min.js"></script>
		<script src="/frontend/js/vendor/respond.min.js"></script>
	<![endif]-->
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
    <script src="/frontend/js/compressed.js"></script>
    <script src="/frontend/js/selectize.min.js"></script>
    <script src="/frontend/js/main.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <script src="/js/app.js"></script>
</body>

</html>