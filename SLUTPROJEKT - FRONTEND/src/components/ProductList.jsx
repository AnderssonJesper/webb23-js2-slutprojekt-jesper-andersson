import React, { useState } from 'react';
import Product from './Product';

function ProductList({ products, addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedProducts = [...products];

  if (sortOrder === 'asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="product-list">
      <div className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Sök efter en produkt"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSortOrder('asc')} className="search-button">
          Sortera stigande
        </button>
        <button onClick={() => setSortOrder('desc')} className="search-button">
          Sortera fallande
        </button>
      </div>

      {sortedProducts
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((product) => (
          <div className="product-item" key={product.id}>
            <h2 className="product-name">{product.name}</h2>
            <div className="product-image-container">
              <img className="product-image" src={product.image} alt={product.name} />
            </div>
            <p className="product-price">Pris: {product.price} kr</p>
            <p className="product-stock">Lagersaldo: {product.stock}</p>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
            >
              Lägg till i kundvagn
            </button>

          </div>
        ))}
    </div>
  );
}

export default ProductList;
