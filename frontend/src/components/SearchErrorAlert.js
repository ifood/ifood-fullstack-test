import React from 'react'
import {connect} from 'react-redux'
import ErrorAlert from './ErrorAlert'

const View = ({error}) => (
  <ErrorAlert error={error} />
);

const mapStateToProps = state => {
  return {
    error: state.error.searchMessage
  }
};

export default connect(mapStateToProps)(View);

