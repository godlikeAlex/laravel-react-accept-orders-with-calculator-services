import { MIN_PRICE } from "./Calculator";

export const calculatePrice = (service) => {
    const { width, height, quantity, currentService, ftHeight } = service;
    const sqareFt = (width * height) / 144 * ftHeight.price;
    let totalSqFt = sqareFt * quantity;

    if (currentService.disable === 'WIDTH:HEIGHT:HEIGHT-FOOT') {
        return countTotal(quantity * currentService.price);
    }

    return countTotal(totalSqFt * currentService.price);
}

export const countTotal = (price) => {
    return price <= MIN_PRICE ? MIN_PRICE : +price.toFixed(2);
}

