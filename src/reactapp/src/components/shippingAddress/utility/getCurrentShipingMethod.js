const inPostMethods = ['inpostpaczkomaty', 'inpostpaczkomatypobranie'];
const npMethods = ['novaposhta_to_warehouse', 'novaposhta_to_door'];

export const getCurrentShipingMethod = (methodInSelect, methodInCart) => {
  let methodName;
  if (
    inPostMethods.some(
      (method) => method === methodInSelect || method === methodInCart
    )
  ) {
    methodName = 'inpost';
  }
  if (
    npMethods.some(
      (method) => method === methodInSelect || method === methodInCart
    )
  ) {
    methodName = 'np';
  }
  if (
    methodInSelect === 'inpostpaczkomatykurier' ||
    methodInCart === 'inpostpaczkomatykurier'
  ) {
    methodName = 'inpost-kurier';
  }
  return methodName;
};
