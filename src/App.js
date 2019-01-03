import React, { Component } from 'react';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

import './App.css';
import PizzaSizes from './PizzaSizes'

const client = new ApolloClient({
  uri: 'https://core-graphql.dev.waldo.photos/pizza'
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

const Toppings = ({ toppings, maxedOut, handleToppingsSelect }) => (
  <section className='pizza-toppings'>
    {toppings.map(({ topping, selected }) => (
      <div className='pizza-topping' key={topping.name}>
        <input
          type='checkbox'
          name={topping.name}
          checked={selected}
          disabled={!selected && maxedOut}
          onChange={handleToppingsSelect.bind(this, topping.name)}
        />
        <label type='checkbox'>
          {`${topping.name}: $${topping.price}`}
        </label>
      </div>
    ))}
  </section>
)

const Checkout = ({ toppings, orderPrice, handleCheckout }) => (
  <section className='checkout'>
    <span>
      {`Total: $${orderPrice}`}
    </span>
    <button onClick={handleCheckout} disabled={orderPrice === 0}>
      Add to cart
    </button>
  </section>
)

const Cart = ({ contents, handleCartRemove, handleComplete }) => (
  <section className='cart'>
    <span>Cart ({contents.length})</span>
    {contents.map((item, index) => (
      <div className='cart-item'>
        <button onClick={handleCartRemove.bind(this, index)}>
          Remove
        </button>
        <span>{item.size.name}</span>
        <span>${item.orderPrice}</span>
      </div>
    ))}
    <p>Total: ${contents.reduce((a, c) => (a + Number(c.orderPrice)), 0)}</p>
    <button onClick={handleComplete} disabled={contents.length === 0}>
      Complete Order
    </button>
  </section>
)

class ZaCart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newPizza: {
        name: null,
        basePrice: null,
        maxToppings: null
      },
      newToppings: [],
      maxedOut: false,
      orderPrice: 0,
      contents: []
    }

    this.handleSizeSelect = this.handleSizeSelect.bind(this)
    this.handleToppingsSelect = this.handleToppingsSelect.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleCartRemove = this.handleCartRemove.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
  }

  handleSizeSelect (size) {
    const newPizza = {
      name: size.name,
      basePrice: size.basePrice,
      maxToppings: size.maxToppings
    }

    const { newToppings, price } = size.toppings.reduce((acc, cur)=> {
      cur.selected = cur.defaultSelected

      if (cur.selected) {
        acc.price += cur.topping.price
      }

      acc.newToppings.push(cur)

      return acc
    }, { newToppings: [], price: 0 })

    const orderPrice = (size.basePrice + price).toFixed(2)

    this.setState({ newPizza, newToppings, maxedOut: false, orderPrice })
  }

  handleToppingsSelect (toppingName) {
    const { newPizza, newToppings } = this.state

    const { toppings, price, selected } = newToppings.reduce((acc, cur) => {
      if (cur.topping.name === toppingName) {
        cur.selected = !cur.selected
      }

      if (cur.selected) {
        acc.price += cur.topping.price
        acc.selected += 1
      }

      acc.toppings.push(cur)

      return acc
    }, { toppings: [], price: 0, selected: 0 })

    this.setState({
      newToppings: toppings,
      maxedOut: selected >= (newPizza.maxToppings || toppings.length),
      orderPrice: (newPizza.basePrice + price).toFixed(2)
    })
  }

  handleCheckout () {
    const { newPizza, newToppings, orderPrice, contents } = this.state
    const order = { size: newPizza, toppings: newToppings, orderPrice }

    this.setState({
      newPizza: {
        name: null,
        basePrice: null,
        maxToppings: null
      },
      newToppings: [],
      orderPrice: 0,
      contents: [ ...contents, order ]
    })
  }

  handleCartRemove (cartIndex) {
    const { contents } = this.state
    contents.splice(cartIndex, 1)
    this.setState({ contents })
  }

  handleComplete () {
    const { contents } = this.state
    const pizzas = contents.map(() => '🍕').join('')
    alert(pizzas)
    this.setState({ contents: [] })
  }

  render () {
    const { sizes } = this.props

    const {
      newToppings,
      maxedOut,
      orderPrice,
      contents
    } = this.state

    return (
      <main className='zacart'>
        <Cart
          contents={contents}
          handleCartRemove={this.handleCartRemove}
          handleComplete={this.handleComplete}
        />
        <PizzaSizes
          sizes={sizes}
          handleSizeSelect={this.handleSizeSelect}
        />
        <Toppings
          toppings={newToppings}
          maxedOut={maxedOut}
          handleToppingsSelect={this.handleToppingsSelect}
        />
        <Checkout
          orderPrice={orderPrice}
          toppings={newToppings}
          handleCheckout={this.handleCheckout}
        />
      </main>
    )
  }
}

const App = () => (
  <ApolloProvider client={client}>
    <Query query={query}>
      {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;

          return <ZaCart sizes={data.pizzaSizes} />
      }}
    </Query>
  </ApolloProvider>
)

export default App;
