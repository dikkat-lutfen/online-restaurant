

import axios from "axios";
import { useState,useEffect } from "react";
import Pizza from '../Components/Pizza.js'

function HomeScreen() {

    const [data, setData]=useState([])

useEffect(()=>{
    axios.get("http://localhost:5000/api/pizzas/all").then(({data})=>{
        setData(data);
    })
},[])



  return (
    <div>
      <div className='row'>
      {data.map((pizza,index)=>{
        return(
            <div key={index} className='col-md-4'>
              <div >
                 <Pizza pizza={pizza}/>
              </div>
            </div>
        )
      })}
    </div>
    </div>
  )
}

export default HomeScreen;