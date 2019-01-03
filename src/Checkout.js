import React from 'react'

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

export default Checkout
