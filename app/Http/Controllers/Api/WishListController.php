<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WishListRequest;
use App\Models\WishList;
use Illuminate\Http\Request;

class WishListController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function list(Request $request)
    {
        $wishlist = $request->user()->wishList()->latest()->get();
        return response(['wishlist' => $wishlist]);
    }

    public function store(WishListRequest $request)
    {
        $user = $request->user();
        $user->wishList()->create([
            'details' => json_encode($request->input('details')),
            'name' => $request->input('name')
        ]);
        return response(['ok' => true]);
    }

    public function remove(Request $request, $id)
    {
        $request->user()->wishList->where('id', $id)->first()->delete();
        return response(['ok' => true]);
    }
}
