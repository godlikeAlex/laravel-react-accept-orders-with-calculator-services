<?php
function calculateServicePrice($data)
{
    $encodedData = json_decode($data);
    $total = 0;

    foreach ($encodedData->services as $service) {
        $width = $service->width;
        $height = $service->height;
        $curentService = $service->currentService;

        $squareFt = ($width * $height) / 144 * $service->ftHeight->price;
        $totalSqFt = $squareFt * $service->quantity;
        $calculatedPrice = round($totalSqFt * $curentService->price, 2);

        if ($curentService->disable === 'WIDTH:HEIGHT:HEIGHT-FOOT') {
            $service->price = $calculatedPrice <= 200 ? 200 : round($service->quantity * $curentService->price, 2);
        } else {
            $service->price = $calculatedPrice <= 200 ? 200 : $calculatedPrice;
        }
        $total = $total + $service->price;
    }

    $encodedData->total_php = $total;

    return $encodedData;
}
