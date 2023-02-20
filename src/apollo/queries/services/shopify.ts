import { gql } from '@apollo/client'

const productData = `
  id
  handle
  title
  description
  productType
  priceRange {
    minVariantPrice {
      amount
    }
  }
  images(first: 5) {
    edges {
      node {
        url
      }
    }
  }
  variants(first: 5) {
    edges {
      node {
        id
      }
    }
  }
`

export const GET_ALL_PRODUCTS = gql`
  query products {
    products(first: 250) {
      edges {
        node {
          ${productData}
        }
      }
    }
  }
`

export const GET_PRODUCT_BY_HANDLE = gql`
  query product($handle: String!) {
    product(handle: $handle) {
      ${productData}
    }
  }
`

export const GET_ALL_COLLECTIONS_NAMES = gql`
  query collections {
    collections(first: 250) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`

export const GET_ALL_PRODUCTS_FROM_COLLECTION = gql`
  query collectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      products(first: 250) {
        nodes {
          ${productData}
        }
      }
    }
  }
`

export const CREATE_CHECKOUT = gql`
  mutation createCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
    }
  }
`
