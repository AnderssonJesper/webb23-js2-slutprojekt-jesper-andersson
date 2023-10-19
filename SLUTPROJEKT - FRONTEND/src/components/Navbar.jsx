import React from 'react';

function Navbar({ setActivePage, cartItemCount }) {
  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => setActivePage('products')}>Produkter</button>
        </li>
        <li>
          <button onClick={() => setActivePage('cart')}>Kundvagnen ({cartItemCount})</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
