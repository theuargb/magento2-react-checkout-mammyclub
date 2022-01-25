import cartShippingMethods from './cartShippingMethods';

const cartShippingAddrInfo = `
shipping_addresses {
  city
  country {
    code
    label
  }
  region {
    code
    label
  }
  company
  firstname
  lastname
  postcode
  region {
    code
    label
  }
  street
  telephone
  customer_notes
  ${cartShippingMethods}
}`;

export default cartShippingAddrInfo;
