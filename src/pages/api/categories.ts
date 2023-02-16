// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { products } from './data'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const categories = products

  res.status(200).json(categories)
}
