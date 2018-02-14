import React from 'react'
import Alert from 'react-bootstrap/lib/Alert'

export default ({error}) => {
  if (!error) return null;

  return (
    <Alert bsStyle="danger">
      Something went wrong :(
      <br />
      {error}
    </Alert>
  );
};
