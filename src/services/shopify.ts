import { Collection, ProductModel } from '@/@types/models'
import {
  GET_ALL_PRODUCTS_FROM_COLLECTION,
  GET_ALL_COLLECTIONS_NAMES,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  CREATE_CHECKOUT
} from '@/apollo/queries/services/shopify'
import { client } from '../apollo/client'

export function parseProduct(product: any): ProductModel {
  const data = product.node || product

  const price = Number(data.priceRange.minVariantPrice.amount)

  return {
    id: data.id,
    handle: data.handle,
    productType: data.productType,
    description: data.description,
    title: data.title,
    price,
    variants: data.variants.edges.map((variant: any) => variant.node.id),
    images: data.images.edges.map((image: any) => image.node.url)
  }
}

export function parseCollection(collection: any): Collection {
  const data = collection.node || collection
  const hasProducts = collection.products

  return {
    id: data.id,
    title: data.title,
    handle: data.handle,
    ...(hasProducts
      ? {
          products: collection.products.nodes.map(parseProduct)
        }
      : {})
  }
}

export async function getAllProducts(): Promise<ProductModel[]> {
  const shopifyProducts = await client.query({ query: GET_ALL_PRODUCTS })
  return shopifyProducts.data.products.edges.map(parseProduct)
}

export async function getProductByHandle(
  handle: string
): Promise<ProductModel> {
  const shopifyProduct = await client.query({
    query: GET_PRODUCT_BY_HANDLE,
    variables: {
      handle
    }
  })

  return parseProduct(shopifyProduct.data.product)
}

export async function getAllColectionsNames(): Promise<Collection[]> {
  const shopifyCollections = await client.query({
    query: GET_ALL_COLLECTIONS_NAMES
  })

  return shopifyCollections.data.collections.edges.map(parseCollection)
}

export async function getCollectionWithProductsByHandle(
  handle: string
): Promise<Collection> {
  const shopifyCollections = await client.query({
    query: GET_ALL_PRODUCTS_FROM_COLLECTION,
    variables: { handle }
  })

  return parseCollection(shopifyCollections.data.collectionByHandle)
}

interface CreateCheckoutResponse {
  checkoutCreate: {
    checkout: {
      webUrl: string
    }
  }
}

export async function createCheckout(input: any) {
  return (
    await client.mutate<CreateCheckoutResponse>({
      mutation: CREATE_CHECKOUT,
      variables: { input }
    })
  ).data?.checkoutCreate
}
