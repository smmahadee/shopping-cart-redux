import { useDispatch } from 'react-redux';
import { decrease, increase, remove } from '../../redux/product/productSlice';

import { useContext } from 'react';
import { cartContext } from '../../context/cartContext';


function CartItem({product}) {
  const {addToCart} = useContext(cartContext);
  const dispatch = useDispatch();
  const { image, title, price, amount, id } = product;

  return (
    <article className='cart-item'>
      <img src={image} alt={title} />
      <div>
        <h4>{String(title).slice(0, 10)}</h4>
        <h4 className='item-price'>${price}</h4>
        <button className='remove-btn' onClick={() => dispatch(remove(id))}>
          remove
        </button>
      </div>
      <div>
        <button className='amount-btn' onClick={() => {
          dispatch(increase(id))
          addToCart(product)
        }}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z'></path>
          </svg>
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn' onClick={() => dispatch(decrease(id))}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'></path>
          </svg>
        </button>
      </div>
    </article>
  );
}
export default CartItem;
