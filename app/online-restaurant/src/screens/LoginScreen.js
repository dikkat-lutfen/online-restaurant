import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const user = {
        email,
        password,
      };
      const response = await axios.post('api/users/login', user);
      localStorage.setItem('current-user', JSON.stringify(response.data));
      setLoading(false);
    } catch (error) {
      const { data } = error.response;
      console.log(data);
      setLoading(false);
    }
  };

  //if user exist at local storage navigate to the main page
  useEffect(() => {
    if (localStorage.getItem('current-user')) {
      navigate('/');
    }
  }, [navigate, loading]);

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: '35px' }}>
            Login
          </h2>
          <form>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              onClick={login}
              className="btn mt-3 mb-3 btn-primary"
              type="submit"
            >
              Login
            </button>
            <br />
            <Link style={{ color: 'black' }} to="/register">
              Click Here To Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
