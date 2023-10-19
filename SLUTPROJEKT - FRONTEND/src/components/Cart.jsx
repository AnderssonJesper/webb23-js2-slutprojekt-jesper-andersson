import React from 'react';
import CartItem from './CartItem';

function Cart({ cart, checkout, emptyCart, products }) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Kundvagn</h2>
      <ul>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} products={products} />
        ))}
      </ul>
      <p>Totalt: {totalPrice} kr</p>
      <button onClick={checkout}>Genomför köp</button>
      <button onClick={emptyCart}>Töm kundvagnen</button>
    </div>
  );
}

export default Cart;
