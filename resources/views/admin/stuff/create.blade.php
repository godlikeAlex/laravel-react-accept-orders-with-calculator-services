@extends('layouts.app-admin')

@section('content')
<div class="card" style="background: #f7f7f7; padding: 15px">

    <div class="row justify-content-center">
        <form class="col-md-12" method="POST" action="{{route('add.new.admin.store')}}">
            @csrf
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputPassword4">Name</label>
                    <input type="text" name="name" class="form-control" id="inputPassword4" placeholder="Name">
                    @error('name')
                    <span class="invalid-feedback" role="alert" style="display: block">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input type="email" name="email" class="form-control" id="inputEmail4" placeholder="Email">
                    @error('email')
                    <span class="invalid-feedback" role="alert" style="display: block">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div class="form-group col-md-12">
                    <label for="inputEmail4">Password</label>
                    <input type="text" name="password" class="form-control" id="inputEmail4" placeholder="Password">
                    @error('password')
                    <span class="invalid-feedback" role="alert" style="display: block">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Create a new admin</button>
        </form>
    </div>

</div>
<script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>

<script>
    const swiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
</script>
@endsection

@section('custom-script')
<script src="/backend/plugins/ekko-lightbox/ekko-lightbox.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        $(function() {
            $(document).on('click', '[data-toggle="lightbox"]', function(event) {
                event.preventDefault();
                $(this).ekkoLightbox({
                    alwaysShowClose: true
                });
            });
        })
    })
</script>
@endsection