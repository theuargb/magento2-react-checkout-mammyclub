const cartItemsInfo = `
items {
  id
  quantity
  prices {
    price {
      value
      currency
    }
    row_total {
      value
      currency
    }
  }

  ... on SimpleCartItem {
    product {
      ...productFields
    }
  }

  ... on VirtualCartItem {
    product {
      ...productFields
    }
  }

  ... on DownloadableCartItem {
    product {
      ...productFields
    }
  }

  ... on ConfigurableCartItem {
    product: configured_variant {
      ...productFields
    }

    parent: product {
      ...productFields
    }
  }

  ... on BundleCartItem {
    product {
      ...productFields
    }

    bundle_options {
      label
      values {
        label
        price
        quantity
      }
    }
  }
}`;

export default cartItemsInfo;
