import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
      } else {
        const user = {
          name,
          email,
          password,
        };

        const response = await axios.post('api/users/register', user);
        localStorage.setItem('current-user', JSON.stringify(response.data));
        setLoading(false);
      }
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
            Register
          </h2>
          <form>
            <input
              type="text"
              placeholder="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              name="name"
            />
            <input
              type="email"
              placeholder="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name="email"
            />
            <input
              type="password"
              placeholder="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
            />
            <input
              type="password"
              placeholder="confirm password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              onClick={register}
              className="btn mt-3 mb-3 btn-primary"
              type="submit"
            >
              Register
            </button>
            <br />
            <Link style={{ color: 'black' }} to="/login">
              Click Here To Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
