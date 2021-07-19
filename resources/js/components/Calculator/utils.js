import { MIN_PRICE } from "./Calculator";

export const calculatePrice = (service) => {
    const { width, height, quantity, currentService, ftHeight } = service;
    const squareFt = (height * width) / 144;
    let totalSqFt = squareFt * quantity;
    const totalPerSqFt = squareFt * quantity * ((currentService.price * totalSqFt) / totalSqFt);
    const totalPerItem = squareFt * ((currentService.price * totalSqFt) / totalSqFt);

    if (currentService.disable === 'WIDTH:HEIGHT:HEIGHT-FOOT') {
        const price = currentService.price + ftHeight.price;
        return {
            total: countTotal(price),
            totalPerSqFt: +(currentService.price).toFixed(2),
            totalPerItem: +(currentService.price).toFixed(2)
        };
    }

    return {
        total: countTotal((totalSqFt * currentService.price) + ftHeight.price),
        totalPerSqFt: +totalPerSqFt.toFixed(2),
        totalPerItem: +totalPerItem.toFixed(2)
    };
}

export const countTotal = (price) => {
    return price <= MIN_PRICE ? MIN_PRICE : +price.toFixed(2);
}

