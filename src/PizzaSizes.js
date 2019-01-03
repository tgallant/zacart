import React from 'react'

const PizzaSizes = ({ sizes, handleSizeSelect }) => (
  <section className='pizza-sizes'>
    <h3>Select a size:</h3>
    {sizes.map(size => (
      <div className='pizza-size' key={size.name}>
        <button className='' onClick={handleSizeSelect.bind(this, size)}>
          {`${size.name}: $${size.basePrice}`}
        </button>
      </div>
    ))}
  </section>
)

export default PizzaSizes
