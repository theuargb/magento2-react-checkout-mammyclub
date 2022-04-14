import { CART_DATA_FRAGMENT } from '../utility/query/cartQueryInfo';

export const SET_SHIPPING_ADDR_MUTATION = `
mutation setShippingAddress(
  $cartId: String="<null>",
  $firstname: String="<null>",
  $lastname: String="<null>",
  $company: String="<null>",
  $street: [String]!,
  $city: String="<null>",
  $region: String="<null>",
  $zipcode: String="<null>",
  $country: String!,
  $phone: String="<null>",
  $customer_notes: String="<null>",
  $street_ref: String,
  $city_ref: String,
  $warehouse_ref: String,
) {
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
