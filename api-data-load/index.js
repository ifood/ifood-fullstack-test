const axios  = require('axios')

const ordersApiUrl = "http://localhost:8082/v1/orders/"
const clientsApiUrl = "http://localhost:8081/v1/clients/"

const clients = require('./clients.json')
const orders = require('./orders.json')

function loadData() {
  clients.forEach( (client) => {

    axios.post(clientsApiUrl, client)
    .then(function (response) {
      loadOrders(response.data.id)
    })
    .catch(function (error) {
      console.log(error)
    })

  })
}

function loadOrders(clientId) {
    orders.forEach( (order) => {

      order.clientId = clientId
      axios.post(ordersApiUrl, order)
      .then(function (response) {
        console.log("Data Loader created clients and orders sucessfull...")
      })
      .catch(function (error) {
        console.log(error)
      })

    })
}


loadData();
