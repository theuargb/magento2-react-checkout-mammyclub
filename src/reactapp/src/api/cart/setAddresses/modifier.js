export default function setAddressesModifier(result) {
  console.log(result);
  const shippingAddresses = _get(
    result,
    'data.setShippingAddressesOnCart.cart.shipping_addresses',
    []
  );

  return modifyShippingAddressList(shippingAddresses);
}
