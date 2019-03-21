import store from '../store';

// let orderId = null;
// store.subscribe(() => {
//   orderId = store.getState().oders.selectedOrderId;
// });

const endPoints = () => {  
  return {
  	orderList: '/order/findAll',
  };
};

export default endPoints;
