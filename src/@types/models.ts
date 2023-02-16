export interface ProductModel {
  id: string
  title: string
  description: string
  price: number
  images: string[]
}

export interface CategoryModel {
  id: string
  title: string
  slug: string
}
