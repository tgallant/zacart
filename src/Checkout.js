import React from 'react'

const Checkout = ({ toppings, orderPrice, handleCheckout }) => (
  <section className='checkout column column-50 column-offset-25'>
    <p className='checkout-total'>
      {`Total: $${orderPrice}`}
    </p>
    <button onClick={handleCheckout} disabled={orderPrice === 0}>
      Add to cart
    </button>
  </section>
)

export default Checkout
