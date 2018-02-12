import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-grid-system'
import {Card, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSearch from 'material-ui/svg-icons/action/search'
import DatePicker from 'material-ui/DatePicker'
import { setFilters } from '../actions/filterActions'
import { fetchOrders } from '../actions/orderActions'

const mapStateToProps = (state) => {
  return {
    filters: state.filter.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (filters) => {
        dispatch(fetchOrders(filters))
        dispatch(setFilters(filters))
    }
  }
}

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      minDate: this.props.filters.minDate,
      maxDate: this.props.filters.maxDate
    }
  }

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    })
  }
  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    })
  }
  handleChangeName = (event, name) => {
    this.setState({
      name: name,
    })
  }
  handleChangePhone = (event, phone) => {
    this.setState({
      phone: phone,
    })
  }
  handleChangeMail = (event, mail) => {
    this.setState({
      mail: mail,
    })
  }

  render() {
    return (
      <Card>
      <Container>
        <Row align="start">
        <Col sm={2}>
        <DatePicker
            onChange={this.handleChangeMinDate}
            floatingLabelText="Min Date"
            defaultDate={this.props.filters.minDate}
          />
        </Col>

        <Col sm={2}>
        <DatePicker
            onChange={this.handleChangeMaxDate}
            floatingLabelText="Max Date"
            defaultDate={this.props.filters.maxDate}
          />
        </Col>

        <Col sm={2}>
          <TextField floatingLabelText="Client Name" floatingLabelFixed={true} defaultValue={this.props.filters.name} onChange={this.handleChangeName}/>
        </Col>
        <Col sm={2}>
          <TextField floatingLabelText="Phone" floatingLabelFixed={true} defaultValue={this.props.filters.phone} onChange={this.handleChangePhone}/>
        </Col>
        <Col sm={2}>
          <TextField floatingLabelText="Email" floatingLabelFixed={true} defaultValue={this.props.filters.email} onChange={this.handleChangeMail}/>
        </Col>
        <Col sm={2}>
            <CardActions>
              <FloatingActionButton onClick = { () => this.props.setFilters(this.state) }>
                <ContentSearch />
              </FloatingActionButton>
            </CardActions>
        </Col>
        </Row>
        </Container>
        </Card>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
