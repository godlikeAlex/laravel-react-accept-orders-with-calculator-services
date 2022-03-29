<?
namespace App\Classes;

class Cart {
  private $cart;
  public $totalServices = 0;
  
  public $services = [];
  public $additional;
  public $total = 0;

  // 8,75% - tax
  // 1.0875 => 108,75%
  private $tax = 1.0875;

  function __construct($cart) {
    $decodedCart = json_decode($cart);

    $this->cart = new class {
      public $services;
      public $additional;
    };

    $this->cart->services = $decodedCart->services;
    $this->cart->additional = $decodedCart->additional;

    $this->additional = new Additional();

    $this->calculateServices();
    $this->calculateAdditional();
  }

  private function calculateServices() {
    foreach ($this->cart->services as $service) {
      $calculatedService = $this->calculateService($service);
      $this->totalServices = $this->totalServices + $calculatedService->total;
      
      $this->services[] = $service;
    }
  }

  
  private function calculateAdditional() {
    $this->additional->survey = $this->cart->additional->survey > 0 ? 250 : 0;
    $this->additional->urgencyInstsllstion = $this->cart->additional->urgencyInstsllstion > 0 ? $this->totalServices * 0.20 : 0;
    $total = $this->additional->survey + $this->additional->urgencyInstsllstion + $this->totalServices;

    $this->total = $total * $this->tax;
  }

  private function calculateService($service) {
    $width = intval($service->width);
    $height = intval($service->height);
    $curentService = $service->currentService;

    $squareFt = round(($width * $height) / 144, 2);
    $totalSqFt = round($squareFt * $service->quantity, 2);

    $calculatedPrice = ($totalSqFt * $curentService->price) + $service->ftHeight->price;
    $totalPerSqFt = $squareFt * $service->quantity * (($curentService->price * $totalSqFt) / $totalSqFt);
    $totalPerItem = $squareFt * (($curentService->price * $totalSqFt) / $totalSqFt);

    $service->totalPerSqFt = $totalPerSqFt;
    $service->totalPerItem = $totalPerItem;

  if (isset($curentService->disable) && $curentService->disable === 'WIDTH:HEIGHT:HEIGHT-FOOT') {
      $cPrice = $curentService->price +  $service->ftHeight->price;
      $service->totalPerSqFt = round(2, $curentService->price);
      $service->totalPerItem = round(2, $curentService->price);
      $service->price = round($cPrice, 2);
    } else {
        $service->price = $calculatedPrice;
    }
    
    $service->prices->installation = $service->prices->installation > 0 ? $service->price : 0;
    $service->prices->removal = $service->prices->removal > 0 ? $service->price * 0.5 : 0;

    $service->total = $service->prices->installation + $service->prices->removal;

    return $service;

  }
}

class Additional {
  public $urgencyInstsllstion = 0;
  public $survey = 0;
}

?>