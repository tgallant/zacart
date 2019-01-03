/* global alert */

import React, { Component } from 'react'
import PizzaSizes from './PizzaSizes'
import Toppings from './Toppings'
import Checkout from './Checkout'
import Cart from './Cart'

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
      contents: [],
      dropdownOpen: false
    }

    this.handleSizeSelect = this.handleSizeSelect.bind(this)
    this.handleToppingsSelect = this.handleToppingsSelect.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleCartRemove = this.handleCartRemove.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
    this.handleDropdown = this.handleDropdown.bind(this)
  }

  handleSizeSelect (size) {
    const newPizza = {
      name: size.name,
      basePrice: size.basePrice,
      maxToppings: size.maxToppings
    }

    const { newToppings, price } = size.toppings.reduce((acc, cur) => {
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

    this.setState({ contents: [], dropdownOpen: false })
  }

  handleDropdown () {
    const { dropdownOpen } = this.state
    this.setState({ dropdownOpen: !dropdownOpen })
  }

  render () {
    const { sizes } = this.props

    const {
      newPizza,
      newToppings,
      maxedOut,
      orderPrice,
      contents,
      dropdownOpen
    } = this.state

    return (
      <main className='zacart'>
        <div className='row'>
          <Cart
            contents={contents}
            dropdownOpen={dropdownOpen}
            handleDropdown={this.handleDropdown}
            handleCartRemove={this.handleCartRemove}
            handleComplete={this.handleComplete}
          />
        </div>
        <div className='pizza-config row' data-active={newPizza.name != null}>
          <PizzaSizes
            sizes={sizes}
            handleSizeSelect={this.handleSizeSelect}
          />
          <Toppings
            toppings={newToppings}
            maxedOut={maxedOut}
            handleToppingsSelect={this.handleToppingsSelect}
          />
        </div>
        <div className='row'>
          <Checkout
            orderPrice={orderPrice}
            toppings={newToppings}
            handleCheckout={this.handleCheckout}
          />
        </div>
      </main>
    )
  }
}

export default ZaCart
