import {
  GET_ORDERS_LIST_START,
  GET_ORDERS_LIST_FAIL,
  GET_ORDERS_LIST_SUCCESS,

  SET_SELECTED_ORDER
} from '../actions/types';

export const INITIAL_STATE = {
  selectedOrderId: null,  
  isLoadingList: null,
  orderList: null,
  errorLoadingList: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case GET_ORDERS_LIST_START:      
  	  return {
  	    ...state,
  	    isLoadingList: true,
  	    orderList: null,        
  	  };

  	case GET_ORDERS_LIST_SUCCESS:    
  	  const defaultCampaing = action.payload[0]

      if (!state.selectedCampaignName) 
        state.selectedCampaignName = defaultCampaing.name

      if (!state.selectedCampaignId)
        state.selectedCampaignId = defaultCampaing._id      
      
      return {
  	    ...state,
  	    isLoadingList: false,
  	    orderList: action.payload,
  	    errorLoadingList: null        
  	  };

  	case GET_ORDERS_LIST_FAIL:
  	  return {
  	    ...state,
  	    isLoadingList: false,
  	    orderList: null,
  	    errorLoadingList: action.payload,        
  	  }

    case SET_SELECTED_ORDER:       
      return {
        ...state,
        selectedOrderId: action.payload._id,        
      }

    default:
      return state;
  }
};
