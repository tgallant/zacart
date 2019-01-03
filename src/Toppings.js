import React from 'react'

const Toppings = ({ toppings, maxedOut, handleToppingsSelect }) => (
  <section className='pizza-toppings column'>
    <h3>Pick your toppings:</h3>
    {toppings.map(({ topping, selected }) => (
      <div className='pizza-topping' key={topping.name}>
        <input
          type='checkbox'
          name={topping.name}
          checked={selected}
          disabled={!selected && maxedOut}
          onChange={handleToppingsSelect.bind(this, topping.name)}
        />
        <label className='label-inline'>
          {`${topping.name}: $${topping.price}`}
        </label>
      </div>
    ))}
  </section>
)

export default Toppings
