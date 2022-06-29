import { CART_DATA_FRAGMENT } from '../utility/query/cartQueryInfo';

export const SET_ADDRESSES_MUTATION = `
mutation SetAddresses(
  $cartId: String!,
  $firstname: String,
  $lastname: String,
  $company: String,
  $street: [String]!,
  $city: String,
  $region: String,
  $zipcode: String,
  $country: String!,
  $phone: String!,
  $customer_notes: String,
  $street_ref: String,
  $city_ref: String,
  $warehouse_ref: String,
  $new_customer_email: String,
  $billingSameAsShipping: Boolean,
) {
  setBillingAddressOnCart(
    input: {
      billing_address: { same_as_shipping: $billingSameAsShipping }
      cart_id: $cartId
    }
  ) {
    cart {
      id
    }
  }
  setShippingAddressesOnCart(
    input: {
      cart_id: $cartId
      shipping_addresses: [{
      	address: {
          firstname: $firstname
          lastname: $lastname
          company: $company
          street: $street
          city: $city
          region: $region
          postcode: $zipcode
          country_code: $country
          telephone: $phone
          save_in_address_book: false
          perspective_np: {
            street_ref: $street_ref
            city_ref: $city_ref
            warehouse_ref: $warehouse_ref
          }
          amasty_order_attributes: {
            new_customer_email: $new_customer_email
          }
        }
        customer_notes: $customer_notes
      }]
    }
  ) {
    cart {
      ${CART_DATA_FRAGMENT}
    }
  }

}`;
