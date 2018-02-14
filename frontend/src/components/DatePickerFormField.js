import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

export default ({input:{value, ...e} , meta: {touched, error}, className, ...other }) => (
  <React.Fragment>
    <DatePicker {...e} dateFormat="YYYY-MM-DD" {...other} className={className}
                value={value ? moment(value, 'YYYY-MM-DD') : null}
                selected={value ? moment(value, 'YYYY-MM-DD') : null} />
    {touched && error && <span>{error}</span>}
  </React.Fragment>
);