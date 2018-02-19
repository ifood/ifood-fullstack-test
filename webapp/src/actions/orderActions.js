// Core
import axios from 'axios'

const ordersApiUrl = "http://localhost:8082/v1/orders/search/byDate"
const clientsApiUrl = "http://localhost:8081/v1/clients/search/byCustomQuery/"


export function fetchRequested() {
  let payload = {
    status: "loading"
  }
  return {
    type: "FETCH_ORDERS_REQUESTED",
    payload: payload
  }
}
export function fetchFullfiled(orders) {
  let payload = {
    status: "loading",
    orders: orders
  }
  return {
    type: "FETCH_ORDERS_FULLILED",
    payload: payload
  }
}
export function fetchCompleted() {
  let payload = {
    status: "fetched..."
  }
  return {
    type: "FETCH_ORDERS_COMPLETED",
    payload: payload
  }
}
export function fetchRejected(error) {
  let payload = {
    status: "err",
    errorMessage: error
  }
  return {
    type: "FETCH_ORDERS_REJECTED",
    payload: payload
  }
}


export function fetchOrders(filters) {

  return (dispatch) => {

    let params = {
      start: filters.minDate.toUTCString(),
      end: filters.maxDate.toUTCString()
    }
    dispatch( fetchRequested() )
    axios.get(ordersApiUrl, {params}).then( (response) => {

      let orders = handleOrdersResponse(response.data._embedded.orders, filters)
      dispatch(fetchFullfiled(orders))

    })
    .catch( (err) => {
      dispatch(fetchRejected(err))
    })
  }
}

function handleOrdersResponse(orders, filters) {

  try {

    if (filters.name === "ERROR") {
      throw { error: "Error." }
    }

    let resultOrders = []
    orders.forEach( (order) => {

      console.log("filters -->", filters)
      let params = {
        id: order.clientId,
        name: (filters.name) ? filters.name : "",
        phone: (filters.phone) ? filters.phone : "",
        email: (filters.email) ? filters.email : "",
      }
      console.log("params -->", params)
      axios.get(clientsApiUrl, {params}).then( (response) => {

        let clientsLenght = response.data._embedded.clients.length
        let client = response.data._embedded.clients[0]
        let totalAmount = 0

        order.items.forEach ( (item) => {
          let price =  parseInt(item.price, 10)
          totalAmount = totalAmount + price

        })
        order.total = totalAmount

        if (clientsLenght > 0) {
          order.clientName = client.name
          order.clientPhone = client.phone
          order.clientEmail = client.email

          resultOrders.push(order)
        }

      })
      .catch( (err) => {
        console.log(err)
        throw(err)
      })

    })
    return resultOrders

  } catch(err) {
    console.log(err)
    throw(err)
  }

}
