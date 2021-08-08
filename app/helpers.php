<?php
function calculateServicePrice($data)
{
    $encodedData = json_decode($data);
    $totalServices = 0;
    $total = 0;

    foreach ($encodedData->services as $service) {
        $width = $service->width;
        $height = $service->height;
        $curentService = $service->currentService;
        $squareFt = round(($width * $height) / 144, 2);
        $totalSqFt = round($squareFt * $service->quantity, 2);
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
        $totalServices = $totalServices + $service->price;
    }

    if ($encodedData->acceptedServices->installation) {
        $encodedData->prices->installation = $totalServices;
    }

    if ($encodedData->acceptedServices->removal) {
        $encodedData->prices->removal = $totalServices * 0.5;
    }

    if ($encodedData->acceptedServices->survey) {
        $encodedData->prices->survey = 250;
    }

    if ($encodedData->acceptedServices->urgencyInstsllstion) {
        $encodedData->prices->urgencyInstsllstion = $totalServices * 0.2;
    }

    foreach ($encodedData->prices as $key => $value) {
        $total += $value;
    }

    $encodedData->totalServices_php = $totalServices;
    $encodedData->totalServices = $totalServices;

    $encodedData->total_php = $total;
    $encodedData->total = round($total, 2);

    return $encodedData;
}
