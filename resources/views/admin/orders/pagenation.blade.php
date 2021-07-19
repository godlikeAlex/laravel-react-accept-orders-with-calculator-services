@if ($paginator->lastPage() > 1)
<div class="col-sm-12 col-md-7">
    <div class="dataTables_paginate paging_simple_numbers" id="example1_paginate">
        <ul class="pagination">
            <li class="paginate_button page-item previous {{ ($paginator->currentPage() == 1) ? ' disabled' : '' }}" id="example1_previous"><a href="#" aria-controls="example1" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>
            @for ($i = 1; $i <= $paginator->lastPage(); $i++)
                <li class="paginate_button page-item {{ ($paginator->currentPage() == $i) ? ' active' : '' }}">
                    <a href="{{ $paginator->url($i) }}" aria-controls="example1" data-dt-idx="1" tabindex="0" class="page-link">{{ $i }}</a>
                </li>
                @endfor
                <li id="example1_next" class="paginate_button page-item next {{ ($paginator->currentPage() == $paginator->lastPage()) ? ' disabled' : '' }}">
                    <a href="{{ $paginator->url($paginator->currentPage()+1) }}" aria-controls="example1" data-dt-idx="3" tabindex="0" class="page-link">Next</a>
                </li>
        </ul>
    </div>
</div>
@endif