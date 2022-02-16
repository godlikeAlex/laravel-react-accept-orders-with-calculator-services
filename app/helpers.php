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
        $calculatedPrice = ($totalSqFt * $curentService->price) + $service->ftHeight->price;
        $totalPerSqFt = $squareFt * $service->quantity * (($curentService->price * $totalSqFt) / $totalSqFt);
        $totalPerItem = $squareFt * (($curentService->price * $totalSqFt) / $totalSqFt);

        $service->totalPerSqFt = $totalPerSqFt;
        $service->totalPerItem = $totalPerItem;

        if ($curentService->disable === 'WIDTH:HEIGHT:HEIGHT-FOOT') {
            $cPrice = $curentService->price +  $service->ftHeight->price;
            $service->totalPerSqFt = round(2, $curentService->price);
            $service->totalPerItem = round(2, $curentService->price);
            $service->price = round($cPrice, 2);
        } else {
            $service->price = $calculatedPrice;
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
        $t = $encodedData->prices->survey + $encodedData->prices->removal + $encodedData->prices->installation;
        $encodedData->prices->urgencyInstsllstion = $t * 0.2;
    }

    foreach ($encodedData->prices as $key => $value) {
        $total += $value;
    }

    $encodedData->totalServices_php = $totalServices;
    $encodedData->totalServices = $totalServices;

    $encodedData->total_php = $total <= 250 ? 250 : round($total, 2);
    $encodedData->total = $total <= 250 ? 250 : $total;

    return $encodedData;
}
