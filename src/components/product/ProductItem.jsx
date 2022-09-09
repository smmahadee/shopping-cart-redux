import { useDispatch } from 'react-redux';
import { decrease, increase } from '../../redux/product/productSlice';
import { useCartContext } from '../../context/cartContext';

function ProductItem({product}) {
  const { id, title, price, image, amount } = product;
  const {addToCart} = useCartContext();
  const dispatch = useDispatch();

  const increaseAmount = id => {
    dispatch(increase(id));
    addToCart(product)
  };

  return (
    <div className='product-box'>
      <img src={image} alt={title} />
      <h4>{String(title).slice(0,10)}</h4>
      <p>${price}</p>

      <div className='addToCart2'>
        <img
          src='minus.png'
          alt=''
          className={!amount ? 'none' : ''}
          onClick={() => dispatch(decrease(id))}
        />
        <button onClick={() => increaseAmount(id)}>
          {!amount ? 'Add to Cart' : amount}
        </button>
        <img
          src='plus.png'
          alt=''
          className={!amount ? 'none' : ''}
          onClick={() => increaseAmount(id)}
        />
      </div>
    </div>
  );
}
export default ProductItem;
