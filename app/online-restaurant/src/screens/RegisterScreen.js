import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = async () => {
    try {
      if (password !== confirmPassword) {
        alert('passwords not matching');
      } else {
        const user = {
          name,
          email,
          password,
        };

        const response = await axios.post('api/users/register', user);
        localStorage.setItem('current-user', JSON.stringify(response.data));
        alert(`Registration Successful! Welcome ${response.data.name}`);
      }
    } catch (error) {
      const { data } = error.response;
      alert(`${data}`);
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: '35px' }}>
            Register
          </h2>
          <div>
            <input
              type="text"
              placeholder="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="confirm password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button onClick={register} className="btn mt-3 mb-3 btn-primary">
              Register
            </button>
            <br />
            <a style={{ color: 'black' }}>Click Here To Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
