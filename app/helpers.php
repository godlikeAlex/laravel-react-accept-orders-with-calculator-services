<?php
function calculateServicePrice($data)
{
    $encodedData = json_decode($data);
    $total = 0;

    foreach ($encodedData->services as $service) {
        $width = $service->width;
        $height = $service->height;
        $curentService = $service->currentService;
        $squareFt = ($width * $height) / 144;
        $totalSqFt = $squareFt * $service->quantity;
        $calculatedPrice = round(($totalSqFt * $curentService->price) + $service->ftHeight->price, 2);
        $totalPerSqFt = $squareFt * $service->quantity * (($curentService->price * $totalSqFt) / $totalSqFt);
        $totalPerItem = $squareFt * (($curentService->price * $totalSqFt) / $totalSqFt);

        $service->totalPerSqFt = $totalPerSqFt;
        $service->totalPerItem = $totalPerItem;

        if ($curentService->disable === 'WIDTH:HEIGHT:HEIGHT-FOOT') {
            $cPrice = $curentService->price +  $service->ftHeight->price;
            $service->totalPerSqFt = round(2, $curentService->price);
            $service->totalPerItem = round(2, $curentService->price);
            $service->price = $cPrice <= 250 ? 250 : round($cPrice, 2);
        } else {
            $service->price = $calculatedPrice <= 250 ? 250 : $calculatedPrice;
        }
        $total = $total + $service->price;
    }

    $encodedData->total_php = $total;
    $encodedData->total = $total;

    return $encodedData;
}
