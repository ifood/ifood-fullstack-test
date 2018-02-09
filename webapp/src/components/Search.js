import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import {Card, CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSearch from 'material-ui/svg-icons/action/search';
import DatePicker from 'material-ui/DatePicker';

class Search extends Component {
  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate
    };
  }

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
  };
  render() {
    return (
      <Card>
      <Container>
        <Row align="start">
        <Col sm={2}>
          <DatePicker
              onChange={this.handleChangeMinDate}
              autoOk={this.state.autoOk}
              floatingLabelText="Min Date"
              defaultDate={this.state.minDate}
              disableYearSelection={this.state.disableYearSelection}
            />
        </Col>
        <Col sm={2}>
            <DatePicker
              onChange={this.handleChangeMaxDate}
              autoOk={this.state.autoOk}
              floatingLabelText="Max Date"
              defaultDate={this.state.maxDate}
              disableYearSelection={this.state.disableYearSelection}
            />
        </Col>

        <Col sm={2}>
          <TextField hintText="Client Name" floatingLabelText="Client Name" />
        </Col>
        <Col sm={2}>
          <TextField hintText="Phone" floatingLabelText="Phone" />
        </Col>
        <Col sm={2}>
          <TextField hintText="Email" floatingLabelText="Email" />
        </Col>
        <Col sm={2}>
            <CardActions>
              <FloatingActionButton>
                <ContentSearch />
              </FloatingActionButton>
            </CardActions>
        </Col>
        </Row>
        </Container>
        </Card>
    );
  }
}

export default Search;
