import React from 'react'
import FilterPanel from './components/FilterPanel'
import SearchErrorAlert from './components/SearchErrorAlert'
import OrdersTable from './components/OrdersTable'
import ItemsModal from './components/ItemsModal'
import './App.css';
import { connect } from 'react-redux'

const View = () => (
  <div>
    <FilterPanel />
    <SearchErrorAlert />
    <OrdersTable />
    <ItemsModal />
  </div>
);

export default connect((state) => state)(View)
