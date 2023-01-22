import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default function OrdersScreen() {
  const [data, setData] = useState([]);

  const getOrdersData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('current-user'));
      const response = await axios.get('/api/orders/list', {
        params: { userId: user._id },
      });
      setData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOrdersData();
  }, []);

  return (
    <div>
      <h2 className="orderTitle text-center mt-3">My Orders</h2>
      <hr />
      {data.map((order, i) => {
        const { orderItems, _id: id } = order;
        return (
          <div key={id} class="row justify-content-center m-3 text-center">
            <div className="col-auto mt-3 ">
              <Table
                striped
                bordered
                hover
                class="table table-bordered table-striped "
              >
                <thead>
                  <tr>
                    <th>Order Number: {id.slice(15, -1)}</th>
                    <th>Amount</th>
                    <th>Size</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, index) => {
                    const { name, amount, category, price, variant } = item;
                    return (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>{amount}</td>
                        <td>{variant}</td>
                        <td>{category}</td>
                        <td>{price} €</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
