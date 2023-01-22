import React, { useState } from 'react';
import { useCartContext } from '../context/cart_context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const {
    cart,
    toggleAmount,
    deleteCartItem,
    total_items,
    total_amount,
    clearCart,
  } = useCartContext();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const setUserOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('current-user'));
      const order = { userId: user._id, orderItems: cart };
      await axios.post('/api/orders/order', order);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate('/');
        clearCart();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="row justify-content-around">
        <div className="col-md-6">
          <h2>My Cart</h2>
          {cart.length ? (
            cart.map((item) => {
              const { name, amount, variant, price, id, image } = item;
              return (
                <div
                  className="flex-container border-bottom align-items-center"
                  key={`${id}${variant}`}
                >
                  <div className=" w-100 m-2">
                    <h5>
                      {name} ({variant})
                    </h5>
                    <h5>Price : {price} €</h5>
                    <h5>
                      Amount :
                      <span>
                        <i
                          onClick={() => toggleAmount(item, 'inc')}
                          className="fa-solid fa-plus mx-2 text-success"
                          aria-hidden="true"
                        />
                        {amount}
                        <i
                          onClick={() => toggleAmount(item, 'dec')}
                          className="fa-solid fa-minus mx-2 text-danger"
                          aria-hidden="true"
                        />
                      </span>
                    </h5>
                  </div>
                  <div className="m-1 w-100">
                    <img src={image} style={{ width: '80px' }} alt="" />
                  </div>
                  <div className="m-1 w-100">
                    <i
                      className="fa fa-trash mx-2 text-danger"
                      aria-hidden="true"
                      onClick={() => deleteCartItem(id, variant)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <h2>Cart is empty</h2>
          )}
        </div>
        <div className="col-md-4">
          <h2>Totals</h2>
          <h4>Total items : {total_items}</h4>
          <h4>Total price : {total_amount} €</h4>
          {success ? (
            <div className="p-3 mb-2 bg-success text-white my-3">
              <h4>Your order has been placed</h4>
            </div>
          ) : null}

          <button
            onClick={setUserOrders}
            className="btn mt-2"
            disabled={cart.length ? false : true}
          >
            CheckOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
