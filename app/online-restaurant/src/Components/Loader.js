import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <div className="loader">
      <Spinner animation="border" role="status" variant="success" />
    </div>
  );
};

export default Loader;
