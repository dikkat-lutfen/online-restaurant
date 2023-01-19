import React, { useState } from 'react';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const user = {
        email,
        password,
      };
      console.log(user);
      const response = await axios.post('api/users/login', user);
      localStorage.setItem('current-user', JSON.stringify(response.data));
      alert(`Login Successful! Welcome back ${response.data.name}`);
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
            Login
          </h2>
          <div>
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
              type="text"
              name="password"
              placeholder="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={login} className="btn mt-3 mb-3 btn-primary">
              Login
            </button>
            <br />
            <a style={{ color: 'black' }}>Click Here To Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
