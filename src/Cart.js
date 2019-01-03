import React from 'react'

const Cart = ({
  contents,
  dropdownOpen,
  handleDropdown,
  handleCartRemove,
  handleComplete
}) => (
  <section className='cart column column-25 column-offset-75' data-open={dropdownOpen}>
    <span className='cart-link float-right' onClick={handleDropdown}>
      Cart ({contents.length})
    </span>
    <div className='cart-dropdown'>
      {contents.map((item, index) => (
        <div className='cart-item'>
          <button onClick={handleCartRemove.bind(this, index)}>
            x
          </button>
          <span className='cart-item-name'>{item.size.name}</span>
          <span className='cart-item-price'>${item.orderPrice}</span>
        </div>
      ))}
      <p className='cart-total'>
        Total: ${(contents.reduce((a, c) => (a + Number(c.orderPrice)), 0)).toFixed(2)}
      </p>
      <button onClick={handleComplete} disabled={contents.length === 0}>
        Complete Order
      </button>
    </div>
  </section>
)

export default Cart
