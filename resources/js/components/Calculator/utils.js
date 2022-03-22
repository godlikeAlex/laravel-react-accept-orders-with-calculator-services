const MIN_PRICE = 250;

export const calculatePrice = (service) => {
    const { width, height, quantity, currentService, ftHeight } = service;
    const squareFt = ((height * width) / 144).toFixed(2);
    let totalSqFt = (squareFt * quantity).toFixed(2);
    const totalPerSqFt = squareFt * quantity * ((totalSqFt * currentService.price) / totalSqFt);
    const totalPerItem = squareFt * ((totalSqFt * currentService.price) / totalSqFt);

    if (currentService.disable === 'WIDTH:HEIGHT:HEIGHT-FOOT') {
        const price = currentService.price + ftHeight.price;
        return {
            // total: countTotal(price),
            total: price,
            totalPerSqFt: +(currentService.price).toFixed(2),
            totalPerItem: +(currentService.price).toFixed(2)
        };
    }

    // const totalForDefaultService = countTotal((totalSqFt * currentService.price) + ftHeight.price);

    return {
        total: (totalSqFt * currentService.price) + ftHeight.price,
        totalPerSqFt: +totalPerSqFt.toFixed(2),
        totalPerItem: +totalPerItem.toFixed(2)
    };
}

export const countTotal = (price) => {
    return price <= MIN_PRICE ? MIN_PRICE : +price;
}

export default {
    countTotal,     
    calculatePrice
}

