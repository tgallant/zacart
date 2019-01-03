import React from 'react'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'

import 'normalize.css/normalize.css'
import 'milligram/dist/milligram.min.css'
import './App.css'
import ZaCart from './ZaCart'

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL
})

const query = gql`
  {
    pizzaSizes {
      name
      maxToppings
      toppings {
        topping {
          name
          price
        }
        defaultSelected
      }
      basePrice
    }
  }
`

const App = () => (
  <ApolloProvider client={client}>
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error...</p>

        return <ZaCart sizes={data.pizzaSizes} />
      }}
    </Query>
  </ApolloProvider>
)

export default App
