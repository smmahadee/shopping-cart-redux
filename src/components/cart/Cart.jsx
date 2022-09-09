import { useState } from 'react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

function Cart() {
  const [isCartClosed, setIsCartClosed] = useState(true);
  const { productData, amount, total } = useSelector(state => state.product);


  return (
    <div
      className={`cart-container ${isCartClosed ? 'cart-container-close' : ''}`}
    >
      <section className='cart'>
        <header>
          <h2>{!amount ? 'Cart Empty' : 'Your Cart'} </h2>
          <button
            className='cart-close-btn'
            onClick={() => setIsCartClosed(true)}
          >
            Close
          </button>
        </header>

        <div>
          {productData.map(product => {
            if (product.amount > 0) {
              return <CartItem key={product.id} product={product} />;
            }
            return '';
          })}
        </div>
        {/*  <div>
          {cartItems.map(item => (
            <CartItem key={item.id} product={item} />
          ))}
        </div>*/}
        <footer>
          <hr />
          <div className='cart-total'>
            <h4>
              total <span>${total}</span>
            </h4>
          </div>
          <button className='btn clear-btn'>Checkout</button>
        </footer>
      </section>

      <div
        className={`cart-button ${isCartClosed ? '' : 'none'}`}
        onClick={() => setIsCartClosed(false)}
      >
        <h4>{amount} Items</h4>
        <h3>${total}</h3>
        <span>Details &rarr;</span>
      </div>
    </div>
  );
}
export default Cart;
