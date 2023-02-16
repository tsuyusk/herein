// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { products } from '../data'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query

  const product = products.find(product => String(product.id) === String(id))

  if (!product) {
    return res.status(400).json({ error: 'invalid product' })
  }

  res.status(200).json(product)
}
