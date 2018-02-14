import React from 'react'
import {connect} from 'react-redux'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic'

const View = ({data}) => (
  <Form inline>
    <Row>
      <Col sm={12} lg={4}>
        <FormGroup>
          <ControlLabel>Client:&nbsp;</ControlLabel>
          <FormControlStatic>{data.clientName}</FormControlStatic>
        </FormGroup>
      </Col>
      <Col sm={12} lg={4}>
        <FormGroup>
          <ControlLabel>Phone:&nbsp;</ControlLabel>
          <FormControlStatic>{data.clientPhone}</FormControlStatic>
        </FormGroup>
      </Col>
      <Col sm={12} lg={4}>
        <FormGroup>
          <ControlLabel>E-mail:&nbsp;</ControlLabel>
          <FormControlStatic>{data.clientEmail}</FormControlStatic>
        </FormGroup>
      </Col>
    </Row>
  </Form>
);

const mapStateToProps = state => {
  return {
    data: state.orders.modal.data
  }
};

export default connect(mapStateToProps)(View);