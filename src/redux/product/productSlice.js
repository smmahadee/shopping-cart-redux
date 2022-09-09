import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  productData: [],
  total: 0,
  amount: 0,
  error: '',
};

export const fetchProduct = createAsyncThunk('product/fetchProduct', () => {
  return axios
    .get('https://fakestoreapi.com/products/')
    .then(response => response.data)
    .catch(err => err.message);
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increase: (state, action) => {
      const updatedProduct = state.productData.map(product => {
        if (product.id === action.payload) {
          return { ...product, amount: product.amount + 1 };
        }

        return product;
      });

      state.productData = updatedProduct;
      // state.productData[0].amount++;
    },

    decrease: (state, action) => {
      const updatedProduct = state.productData.map(product => {
        if (product.id === action.payload) {
          return { ...product, amount: product.amount - 1 };
        }
        return product;
      });

      state.productData = updatedProduct;
    },

    getTotals: state => {
      const { amount, total } = state.productData.reduce(
        (acc, product) => {
          if (product.amount > 0) {
            acc.amount++;
          }
          acc.total += Math.floor(product.price) * product.amount;
          return acc;
        },
        {
          total: 0,
          amount: 0,
        }
      );

      state.amount = amount;
      state.total = total;
    },

    remove: (state, action) => {
      const updatedProduct = state.productData.map(product => {
        if (product.id === action.payload) {
          return { ...product, amount: 0 };
        }
        return product;
      });

      state.productData = updatedProduct;
    },

    updateProductData: (state, action) => {
      const cartItems = action.payload;
      const updatedData = state.productData.map(product => {
        const newProduct =  cartItems.map(item => {
          if (item.id === product.id) {
            return { ...product, amount: item.amount };
          }
          return '';
        });

        return newProduct.find(p => p.id > 0);
      });

      console.log('updated data', updatedData)
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchProduct.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productData = action.payload.map(data => ({
        ...data,
        amount: 0,
        price: Math.floor(data.price),
      }));
      state.error = '';
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.productData = [];
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
export const { increase, decrease, getTotals, remove, updateProductData } = productSlice.actions;
