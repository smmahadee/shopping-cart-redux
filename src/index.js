import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import CartProvider from './context/cartContext';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CartProvider>
);
