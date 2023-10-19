import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ProductList from './ProductList';
import Cart from './Cart';
import '../css/App.css';

function App() {
  const [activePage, setActivePage] = useState('products');
  const [cart, setCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [redirectToProducts, setRedirectToProducts] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, []);

  const updateProductList = () => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const addToCart = (product) => {
    if (product.stock > 0) {
      const updatedCart = [...cart];
      const itemInCart = updatedCart.find((item) => item.id === product.id);

      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }

      setCart(updatedCart);

      const totalCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(totalCount);

      setProducts((prevProducts) =>
        prevProducts.map((p) => {
          if (p.id === product.id) {
            return { ...p, stock: p.stock - 1 };
          }
          return p;
        })
      );
    }
  };

  const checkout = () => {
    const updatedCart = [...cart];
    let purchaseSuccessful = true;

    updatedCart.forEach((item) => {
      const productIndex = products.findIndex((product) => product.id === item.id);
      if (productIndex !== -1) {
        if (products[productIndex].stock >= item.quantity) {
          products[productIndex].stock -= item.quantity;
        } else {
          purchaseSuccessful = false;
        }
      }
    });

    const purchaseData = {
      items: updatedCart.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
        };
      }),
      totalPrice: updatedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    };

    fetch('http://localhost:3000/api/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Köpet har genomförts!') {
          setCart([]);
          setCartItemCount(0);

          setMessage('Köpet har genomförts! Återvänder till produktsidan.');

          
          setTimeout(() => {
            setMessage(''); 
            setActivePage('products'); 
            updateProductList();
          }, 3000);
        } else {
          setMessage('Köpet kunde inte genomföras!');
        }
      })
      .catch((error) => {
        console.error('Error', error);
        setMessage('Ett fel uppstod vid köpet');
      });
  };

  const emptyCart = () => {
    const productsWithResetStock = products.map((product) => {
      const itemInCart = cart.find((item) => item.id === product.id);
      if (itemInCart) {
        return { ...product, stock: product.stock + itemInCart.quantity };
      }
      return product;
    });

    setCart([]);
    setCartItemCount(0);
    setProducts(productsWithResetStock);
    setMessage('Du kommer återvända till produktsidan')
    setRedirectToProducts(true);

    
    setTimeout(() => {
      setMessage('');
      setActivePage('products'); 
      updateProductList();
    }, 3000);
  };

  return (
    <div>
      <Navbar setActivePage={setActivePage} cartItemCount={cartItemCount} />
      {message && <p>{message}</p>}

      <hr />
      {redirectToProducts}

      {message === '' && (
        activePage === 'products' ? (
          <ProductList products={products} addToCart={addToCart} />
        ) : activePage === 'cart' ? (
          <Cart cart={cart} checkout={checkout} emptyCart={emptyCart} products={products} />
        ) : null
      )}
    </div>
  );
}

export default App;
