<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Easy way install | Dashboard</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/backend/plugins/fontawesome-free/css/all.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Tempusdominus Bootstrap 4 -->
    <link rel="stylesheet" href="/backend/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
    <!-- Select2 -->
    <link rel="stylesheet" href="/backend/plugins/select2/css/select2.min.css">
    <link rel="stylesheet" href="/backend/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="/backend/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
    <!-- JQVMap -->
    <link rel="stylesheet" href="/backend/plugins/jqvmap/jqvmap.min.css">
    <!-- DataTables -->
    <link rel="stylesheet" href="/backend/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="/backend/plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
    <link rel="stylesheet" href="/backend/plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="/backend/dist/css/adminlte.min.css">
    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="/backend/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="/backend/plugins/daterangepicker/daterangepicker.css">
    <!-- summernote -->
    <link rel="stylesheet" href="/backend/plugins/summernote/summernote-bs4.min.css">

    <link rel="stylesheet" href="/backend/plugins/ekko-lightbox/ekko-lightbox.css">


    <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" />

    <style>
        #example1_filter {
            display: none;
        }
    </style>
</head>

<body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">

        <!-- Preloader -->
        <div class="preloader flex-column justify-content-center align-items-center">
            <img class="animation__shake" src="/backend/dist/img/logo.png" alt="Easy way Install logo" height="60" width="60">
        </div>

        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
            </ul>


        </nav>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <a href="/admin/dashboard" class="brand-link">
                <img src="/backend/dist/img/logo.png" alt="Easy Way Install Logo" class="brand-image img-circle">
                <span class="brand-text font-weight-light">Easy Way Install</span>
            </a>

            <!-- Sidebar -->
            <div class="sidebar">
                <div class="form-inline">
                    <form class="input-group" style="padding-top: 25px;" action="/admin/orders">
                        <input class="form-control form-control-sidebar" type="search" placeholder="Search by UUID" aria-label="Search" style="height: unset !important; background: white; color: black;" name="uuid">

                        <div class="input-group-append">
                            <button class="btn btn-sidebar">
                                <i class="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </form>
                    <div class="sidebar-search-results">
                        <div class="list-group"><a href="#" class="list-group-item">
                                <div class="search-title"><strong class="text-light"></strong>N<strong class="text-light"></strong>o<strong class="text-light"></strong> <strong class="text-light"></strong>e<strong class="text-light"></strong>l<strong class="text-light"></strong>e<strong class="text-light"></strong>m<strong class="text-light"></strong>e<strong class="text-light"></strong>n<strong class="text-light"></strong>t<strong class="text-light"></strong> <strong class="text-light"></strong>f<strong class="text-light"></strong>o<strong class="text-light"></strong>u<strong class="text-light"></strong>n<strong class="text-light"></strong>d<strong class="text-light"></strong>!<strong class="text-light"></strong></div>
                                <div class="search-path"></div>
                            </a></div>
                    </div>
                </div>
                <!-- Sidebar Menu -->
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li class="nav-item">
                            <a href="{{route('orders.create')}}" class="nav-link">
                                <i class="nav-icon far fa-circle nav-icon"></i>
                                <p>
                                    Create order
                                </p>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="{{route('custom.order.create')}}" class="nav-link">
                                <i class="nav-icon far fa-circle nav-icon"></i>
                                <p>
                                    Create custom order
                                </p>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-copy"></i>
                                <p>
                                    Orders
                                    <i class="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <a href="{{route('orders.urgency')}}" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>??? Urgency Instsllstion</p>
                                    </a>
                                    <a href="{{route('orders.index')}}?status=done" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>Need to approve('done')</p>
                                    </a>
                                    <a href="{{route('orders.index')}}" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>List of orders</p>
                                    </a>
                                    <a href="{{route('orders.index')}}?status=on the way" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>On the way</p>
                                    </a>

                                    <a href="{{route('orders.index')}}?status=in process" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>In process</p>
                                    </a>

                                    <a href="{{route('orders.index')}}?status=last step to complete" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>Last step to complete</p>
                                    </a>

                                    <a href="{{route('orders.index')}}?status=cancled" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>Canceled orders</p>
                                    </a>

                                    <a href="{{route('orders.index')}}?status=refunded" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>Refunded orders</p>
                                    </a>

                                    <a href="{{route('orders.index')}}?status=completed" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>Completed orders</p>
                                    </a>

                                </li>
                            </ul>
                        </li>

                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="nav-icon ion ion-person-add"></i>
                                <p>
                                    User
                                    <i class="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <a href="{{route('index.users')}}" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>Manage customers</p>
                                    </a>
                                    @if(Auth::user()->isOwner)
                                    <a href="{{route('index.stuff')}}" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>Manage Stuff</p>
                                    </a>
                                    @endif
                                    @if(Auth::user()->isOwner)
                                    <a href="{{route('index.installer')}}" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>Manage Installer</p>
                                    </a>
                                    @endif
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item">
                            <a href="{{route('admin.logout')}}" class="nav-link">
                                <i class="nav-icon fa fa-reply"></i>
                                <p>
                                    Logout
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>
                <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Dashboard</h1>
                        </div><!-- /.col -->
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                            </ol>
                        </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    @yield('content')
                </div><!-- /.container-fluid -->
            </section>
            <!-- /.content -->
        </div>
        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->
    </div>
    <!-- ./wrapper -->

    <!-- jQuery -->
    <script src="/backend/plugins/jquery/jquery.min.js"></script>
    <!-- jQuery UI 1.11.4 -->
    <script src="/backend/plugins/jquery-ui/jquery-ui.min.js"></script>
    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script>
        $.widget.bridge('uibutton', $.ui.button)
    </script>
    <!-- Bootstrap 4 -->
    <script src="/backend/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- DataTables  & Plugins -->
    <script src="/backend/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="/backend/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="/backend/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
    <script src="/backend/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
    <script src="/backend/plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
    <script src="/backend/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
    <script src="/backend/plugins/jszip/jszip.min.js"></script>
    <script src="/backend/plugins/pdfmake/pdfmake.min.js"></script>
    <script src="/backend/plugins/pdfmake/vfs_fonts.js"></script>
    <script src="/backend/plugins/datatables-buttons/js/buttons.html5.min.js"></script>
    <script src="/backend/plugins/datatables-buttons/js/buttons.print.min.js"></script>
    <script src="/backend/plugins/datatables-buttons/js/buttons.colVis.min.js"></script>
    <!-- ChartJS -->
    <script src="/backend/plugins/chart.js/Chart.min.js"></script>
    <!-- Sparkline -->
    <script src="/backend/plugins/sparklines/sparkline.js"></script>

    <!-- jQuery Knob Chart -->
    <script src="/backend/plugins/jquery-knob/jquery.knob.min.js"></script>
    <!-- daterangepicker -->
    <script src="/backend/plugins/moment/moment.min.js"></script>
    <script src="/backend/plugins/daterangepicker/daterangepicker.js"></script>
    <!-- Tempusdominus Bootstrap 4 -->
    <script src="/backend/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
    <!-- Summernote -->
    <script src="/backend/plugins/summernote/summernote-bs4.min.js"></script>
    <!-- overlayScrollbars -->
    <script src="/backend/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
    <!-- AdminLTE App -->
    <script src="/backend/dist/js/adminlte.js"></script>
    <script src="/js/app.js"></script>
    <script>
        $(function() {
            if (document.querySelector('#example1')) {
                let table = $("#example1").DataTable({

                    "responsive": true,
                    "lengthChange": false,
                    "autoWidth": false,
                    "paging": false,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],

                    "columnDefs": [{
                        "targets": 3,
                        "type": "date-eu"
                    }],
                    "order": [
                        [3, "desc"]
                    ],
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
            }

            if (document.querySelector('.select2')) {
                $('.select2').select2()

                $('.select2bs4').select2({
                    theme: 'bootstrap4'
                })
            }
        });
    </script>

    @yield('custom-script')


</body>

</html>
