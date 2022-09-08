import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux/product/productSlice';
import ProductItem from './ProductItem';

function ProductList() {
  const { isLoading, productData } = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className='container'>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading &&
        productData.length &&
        productData.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
}
export default ProductList;
