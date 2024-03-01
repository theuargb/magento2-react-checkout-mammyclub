const cartItemsInfo = `
items {
  id
  quantity
  prices {
    base_price {
      value
      currency
    }
    price_including_tax {
      value
      currency
    }
    row_total_including_tax {
      value
      currency
    }
    discounts {
      label
      amount {
        value
      }
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
        url_webp
      }
      canonical_url
      categories{
        name
      }
      brand_name
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
        url_webp
      }
      canonical_url
      categories{
        name
      }
      brand_name
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
        url_webp
      }
      canonical_url
      categories{
        name
      }
      brand_name
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
        url_webp
      }
      canonical_url
      categories{
        name
      }
      brand_name
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
        url_webp
      }
      canonical_url
      categories{
        name
      }
      brand_name
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
