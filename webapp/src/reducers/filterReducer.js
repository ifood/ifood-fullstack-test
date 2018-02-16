const initialState = {
  filters: {
    minDate: new Date(2018, 0, 1),
    maxDate: new Date(2018, 1, 1),
    name: "",
    email: "",
    phone: ""
  }
}

export const filterReducer = (state=initialState, action) => {
  switch (action.type) {
    case "SET_FILTERS": {
      console.log("Filter payload -->", action.payload)
      state = {...state, filters:action.payload}
      break
    }
    default:
  }
  return state
}
