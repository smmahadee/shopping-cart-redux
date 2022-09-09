import { createContext, useContext, useEffect, useState } from 'react';

export const cartContext = createContext();

function CartProvider({ children }) {
  const cartFromLocalStorage =
    (typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('cart'))) ||
    [];

  const [cartItems, setCartItems] = useState(cartFromLocalStorage);

  const addToCart = product => {
    const exist = cartItems.find(item => item.id === product.id);

    if (!exist) {
      setCartItems([...cartItems, { ...product, amount: product.amount + 1 }]);
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...exist, amount: exist.amount + 1 } : item
        )
      );
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <cartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </cartContext.Provider>
  );
}

export const useCartContext = () => useContext(cartContext);


export default CartProvider;
