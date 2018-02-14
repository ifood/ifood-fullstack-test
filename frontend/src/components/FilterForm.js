import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import DatePickerFormField from './DatePickerFormField'
import {searchOrders} from '../types'

const View = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit(searchOrders)}>
      <Grid>
        <Row>
          <Col sm={12} lg={2}>
            <FormGroup>
              <ControlLabel>Start Date</ControlLabel>
              <Field name="startDate" component={DatePickerFormField} className={'form-control'} />
            </FormGroup>
          </Col>
          <Col sm={12} lg={2}>
            <FormGroup>
              <ControlLabel>End Date</ControlLabel>
              <Field name="endDate" component={DatePickerFormField} className={'form-control'} />
            </FormGroup>
          </Col>
          <Col sm={12} lg={3}>
            <FormGroup>
              <ControlLabel>Client Name</ControlLabel>
              <Field name="clientName" component={'input'} type={'text'} className={'form-control'} />
            </FormGroup>
          </Col>
          <Col sm={12} lg={2}>
            <FormGroup>
              <ControlLabel>Phone</ControlLabel>
              <Field name="phone" component={'input'} type={'text'} className={'form-control'}
                     normalize={phone} />
            </FormGroup>
          </Col>
          <Col sm={12} lg={3}>
            <FormGroup>
              <ControlLabel>E-mail</ControlLabel>
              <Field name="email" component={'input'} type={'text'} className={'form-control'} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={2} mdOffset={5}>
            <Button bsStyle="primary" type={'submit'} block>Search</Button>
          </Col>
        </Row>
      </Grid>
    </form>
  )
};

export default reduxForm({
  form: 'search-order'
})(connect()(View));

const phone = (value) => {

  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 4) {
    return `${onlyNums}`;
  }
  if (onlyNums.length <= 8) {
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4)}`
  }
  return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 9)}`
};
