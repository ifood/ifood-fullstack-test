import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import ModalBody from 'react-bootstrap/lib/ModalBody'
import ModalHeader from 'react-bootstrap/lib/ModalHeader'
import ModalTitle from 'react-bootstrap/lib/ModalTitle'
import OrderDetailHeader from './OrderDetailHeader'
import ItemsErrorAlert from './ItemsErrorAlert'
import ItemsTable from './ItemsTable'
import {hideItemsModal} from '../actions'

const View = ({modalVisible, handleCloseModal}) => (
  <Modal animation={false} backdropClassName={'backdrop-fade'}
         onHide={handleCloseModal} show={modalVisible} >
    <ModalHeader closeButton>
      <ModalTitle>
        Order Details
      </ModalTitle>
    </ModalHeader>
    <ModalBody>
      <OrderDetailHeader />
      <ItemsErrorAlert />
      <ItemsTable />
    </ModalBody>
  </Modal>
);

const mapStateToProps = state => {
  return {
    modalVisible: state.orders.modal.visible
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleCloseModal: () => {
      dispatch(hideItemsModal())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(View);