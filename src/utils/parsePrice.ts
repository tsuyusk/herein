export function parsePrice(price: number) {
  let parsedPrice = `R$ ${price.toString().replace('.', ',')}`

  return parsedPrice
}
