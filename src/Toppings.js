import React from 'react'

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

export default Toppings
