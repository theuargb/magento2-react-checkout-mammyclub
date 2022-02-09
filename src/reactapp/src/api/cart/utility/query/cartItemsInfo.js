export const cartItemsInfo = `
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

export const cartItemsFragments = `
fragment productFields on ProductInterface {
    id
    name
    sku
    small_image {
        label
        url
    }
    canonical_url
}`;
