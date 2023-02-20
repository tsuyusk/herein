import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2022-10/graphql.json`
})

const credentialsLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token':
        process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
    }
  }
})

export const client = new ApolloClient({
  link: credentialsLink.concat(httpLink),
  cache: new InMemoryCache()
})
