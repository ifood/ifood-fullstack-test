import * as actions from "../actions/orderDetails";

import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import Paper from "@material-ui/core/Paper";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import moment from "moment";
import { path } from "ramda";

export class OrderSearch extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment().subtract('3', 'days').startOf('day'),
            endDate: moment().endOf('day'),
            clientName: '',
            phone: '',
            email: '',
        };
    }

    search() {
        const { fetchOrderDetails } = this.props;
        const { startDate, endDate, clientName, phone, email } = this.state;
        const searchParams = {
            startDate: startDate ? startDate.toISOString() : null,
            endDate: endDate ? endDate.toISOString() : null,
            clientName,
            phone,
            email,
        };

        fetchOrderDetails(searchParams);
    }

    onFieldChange = name => e => {
        const value = path(['target', 'value'], e);
        this.setState({
            [name]: value ? value : e
        });
    }

    render() {
        const { startDate, endDate, clientName, phone, email } = this.state;
        return (
            <div className="order-search">
                <div className="search-fields">
                    <Paper className="page">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className="field"
                                margin="dense"
                                format="dd/MM/yyyy"
                                label="Start Date"
                                value={startDate}
                                onChange={this.onFieldChange('startDate')}
                                InputLabelProps={{shrink: true,}}
                            />
                            <KeyboardDatePicker
                                className="field"
                                margin="dense"
                                format="dd/MM/yyyy"
                                label="Start Date"
                                value={endDate}
                                onChange={this.onFieldChange('endDate')}
                                InputLabelProps={{shrink: true,}}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            className="field"
                            type="text"
                            margin="dense"
                            label="Client name"
                            placeholder="Client name"
                            value={clientName}
                            onChange={this.onFieldChange('clientName')}
                            InputLabelProps={{shrink: true,}}
                        />
                        <TextField
                            className="field"
                            type="text"
                            margin="dense"
                            label="Phone"
                            placeholder="Phone"
                            value={phone}
                            onChange={this.onFieldChange('phone')}
                            InputLabelProps={{shrink: true,}}
                        />
                        <TextField
                            className="field"
                            type="text"
                            margin="dense"
                            label="E-mail"
                            placeholder="E-mail"
                            value={email}
                            onChange={this.onFieldChange('email')}
                            InputLabelProps={{shrink: true,}}
                        />
                    </Paper>
                </div>
                <div className="search-submit">
                    <Button variant="contained" color="primary" onClick={this.search.bind(this)}>Search</Button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrderDetails: (searchParams) => dispatch(actions.fetchOrderDetails(searchParams))
    };
};

const connector = connect(
    undefined,
    mapDispatchToProps
);

export default connector(OrderSearch);
