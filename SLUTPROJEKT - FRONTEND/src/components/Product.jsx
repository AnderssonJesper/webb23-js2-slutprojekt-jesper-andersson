import React from 'react';

function Product({ product, addToCart }) {
  return (
    <li>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Pris: {product.price} kr</p>
      <p>Lagersaldo: {product.stock}</p>
      <button
        onClick={() => addToCart(product)}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? "Slut i lager" : "Lägg till i kundvagnen"}
      </button>
    </li>
  );
}

export default Product;
