import { SHOPIFY_CONFIG } from '@/@config/shopify'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: `https://${SHOPIFY_CONFIG.domainUrl}/api/2022-10/graphql.json`
})

const credentialsLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.key
    }
  }
})

export const client = new ApolloClient({
  link: credentialsLink.concat(httpLink),
  cache: new InMemoryCache()
})
