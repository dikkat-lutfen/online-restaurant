import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';

import {
  ADD_TO_CART,
  CLEAR_CART,
  TOGGLE_CART_ITEM_AMOUNT,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
} from '../actions/actions';

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  return cart ? JSON.parse(localStorage.getItem('cart')) : [];
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product, id, amount, variant) => {
    console.log(product);
    dispatch({ type: ADD_TO_CART, payload: { product, amount, id, variant } });
  };

  const toggleAmount = (product, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { product, value } });
  };

  const deleteCartItem = (id, variant) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id, variant } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  /* every time the state.cart changes use the dispatch
  and update the local storage */
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        toggleAmount,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
