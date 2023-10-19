import React from 'react';

function CartItem({ item, products }) {
  const product = products.find((product) => product.id === item.id);
  const originalPrice = product.price;

  return (
    <li key={item.id}>
      {item.name} x{item.quantity} - {originalPrice} kr
    </li>
  );
}

export default CartItem;
