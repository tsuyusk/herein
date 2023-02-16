import { ProductModel } from '@/@types/models'

export function parseProducts(products: any): ProductModel[] {
  return products.map((product: any) => ({
    id: product.id,
    images: [product.image],
    price: product.price,
    title: product.title,
    description: product.description
  }))
}
