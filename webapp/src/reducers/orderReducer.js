const initialState = {
  orders : []
}

export const orderReducer = (state=initialState, action) => {
  switch (action.type) {
    case "FETCH_ORDERS_FULLILED":
      state = {...state, orders:action.payload}
      break
    case "FETCH_ORDERS_REJECTED":
        state = {...state}
        break
    default:
  }
  return state
}
