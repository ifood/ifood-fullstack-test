import axios from 'axios'

const ordersApiUrl = "http://localhost:8082/v1/orders/search/byDate"
const clientsApiUrl = "http://localhost:8081/v1/clients/search/byCustomQuery/"

export function fetchOrders(filters) {

  return (dispatch) => {

    let params = {
      start: filters.minDate.toUTCString(),
      end: filters.maxDate.toUTCString()
    }

    axios.get(ordersApiUrl, {params}).then( (response) => {

      let orders = handleOrdersResponse(response.data._embedded.orders, filters)
      dispatch({type:"FETCH_ORDERS_FULLILED", payload: orders})

    })
    .catch( (err) => {
      // TODO: implementar estado de erro e loading centralizado
      dispatch({type:"FETCH_ORDERS_REJECTED", payload: err})
    })
  }
}

function handleOrdersResponse(orders, filters) {

  try {

    let resultOrders = [];
    orders.forEach( (order) => {

      let params = {
        id: order.clientId,
        name: (filters.name) ? filters.name : "",
        phone: (filters.phone) ? filters.name : "",
        email: (filters.email) ? filters.name : "",
      }

      axios.get(clientsApiUrl, {params}).then( (response) => {

        let clientsLenght = response.data._embedded.clients.length
        let client = response.data._embedded.clients[0]

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
