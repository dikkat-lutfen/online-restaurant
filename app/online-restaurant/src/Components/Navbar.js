import React from 'react';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { cart } = useCartContext();
  const navigate = useNavigate();

  //get user name
  const user = JSON.parse(localStorage.getItem('current-user'));

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded ">
        <Link className="navbar-brand" to="/">
          ONLINE-PIZZA
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate('/orders')}>
                      Stored Orders
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        localStorage.removeItem('current-user');
                        navigate('/login');
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart {cart.length}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
