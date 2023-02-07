import axios from 'axios';
import { useState, useEffect } from 'react';
import Pizza from '../Components/Pizza.js';
import Loader from '../Components/Loader.js';

function HomeScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPizzas = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/pizzas/all');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPizzas();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
