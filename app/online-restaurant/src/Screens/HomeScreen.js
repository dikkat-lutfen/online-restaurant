import axios from 'axios';
import { useState, useEffect } from 'react';
import Pizza from '../Components/Pizza.js';

function HomeScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/pizzas/all')
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        {data.map((pizza, index) => {
          return (
            <div key={index} className="col-md-3 m-3">
              <div>
                <Pizza pizza={pizza} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeScreen;
