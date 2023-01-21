import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios";


export default function OrdersScreen() {


const[data,setData]=useState([]);

useEffect(()=>{
    axios
    .get('http://localhost:5000/api/order/list')
    .then(({ data }) => {
      setData(data);
    })
    .catch((error) => console.log(error));
}, []);



  return (
    <div>
      <h2 className="orderTitle">My Orders</h2>
      <div className='row'>
        {data.map((e,i)=>{
            return(
                <div key={i} className="flex-container">
                    <div>
                        {e.name}
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>

                </div>
            )
        })}

      </div>
    </div>
  )
}
