export interface ProductModel {
  id: string
  handle: string
  productType: string
  title: string
  description: string
  price: number
  variants: string[]
  images: string[]
}

export interface CategoryModel {
  id: string
  title: string
  slug: string
}

export interface Collection {
  id: string
  title: string
  handle: string
  products?: ProductModel[]
}
