import React from 'react'

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

export default Cart
