const cartItemsInfo = `
items {
  id
  quantity
  prices {
    price {
      value
      currency
    },
    row_total {
      value
      currency
    }
  }
  ... on SimpleCartItem {
    product {
      id
      name
      sku
      small_image {
        label
        url
      }
      canonical_url
    }
  }

  ... on VirtualCartItem {
    product {
      id
      name
      sku
      small_image {
        label
        url
      }
      canonical_url
    }
  }

  ... on DownloadableCartItem {
    product {
      id
      name
      sku
      small_image {
        label
        url
      }
      canonical_url
    }
  }

  ... on ConfigurableCartItem {
    product: configured_variant {
      id
      name
      sku
      small_image {
        label
        url
      }
      canonical_url
    }

    parent: product {
      id
      name
      sku
      small_image {
        label
        url
      }
      canonical_url
    }

    configurable_options {
      option_label
      value_label
    }
  }

  ... on BundleCartItem {
    product {
      id
      name
      sku
      small_image {
        label
        url
      }
      canonical_url
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
