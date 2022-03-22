
/*
  services: [
    {
      width: number,
      height: number,
      price: number,
      quantity: number,
      total: number,

      totalPerItem: 0.04
      totalPerSqFt: 0.04

      prices: {
        removal: number,
        installation: number
      },

      ftHeight: {}
      currentService: {},
      currentServiceType: {},
    }
  ],
  additional: {
    urgencyInstallation: number || 0,
    survey: 250 || 0,
    delivery: boolean
  }

  total: countAllServices * 1.20 + survey 
*/

import { calculatePrice } from "../components/Calculator/utils";

function countService (service) {
  const {prices} = service;

  const { total, totalPerSqFt, totalPerItem } = calculatePrice(service);

  let countedService = {
    ...service,
    price: total,
    totalPerItem,
    totalPerSqFt,
  };

  countedService.prices.removal = prices.removal ? total * 0.5 : 0;
  countedService.prices.installation = prices.installation ? total : 0;

  const countedTotal = Object.keys(countedService.prices).reduce((prev, currentKey) => {
    return prev + countedService.prices[currentKey];
  }, 0);

  countedService.total = +countedTotal.toFixed(2);

  return countedService;
}

function countAllCart (cart) {
  const {services, additional} = cart;
  
  const countedServices = services.map(service => countService(service));

  let countedCart = {
    services: countedServices,
    total: 0,
    additional
  };

  const countTotalOfServices = countedServices.reduce((total, service) => {
    return total + service.total;
  }, 0);

  countedCart.additional.urgencyInstsllstion = additional.urgencyInstsllstion ? countTotalOfServices * 0.20 : 0;
  countedCart.additional.survey = additional.survey ? 250 : 0;

  const countedAdditional = Object.keys(countedCart.additional).reduce((prev, currentKey) => {
    return prev + countedCart.additional[currentKey];
  }, 0);

  countedCart.total = +(countTotalOfServices + countedAdditional).toFixed(2);


  return countedCart;
}

export {
  countService,
  countAllCart
}