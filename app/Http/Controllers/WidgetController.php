<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;

class WidgetController extends Controller
{
  
  public function renderWidget($partner_id) {
    $partner = $this->getPartnerOrThrowError($partner_id);
    
    return response()->json([
      'template' => view('widget.template')->render(),
      'style' => asset('css/widget.css')
    ]);
  }

  public function renderAssets($partner_id) {
    $partner = $this->getPartnerOrThrowError($partner_id);
    
    return view('widget.assets');
  }

  private function getPartnerOrThrowError($id) {
    $partner = Partner::where('partner_id', $id)->first();

    if (!$partner) {
      abort(403, 'Unauthorized action.');
    }

    return $partner;
  }
}
