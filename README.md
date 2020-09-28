# iFood Fullstack Test

Create a web application that lists Orders according to some criteria. 
The web application has only one page (no need for access control).

Use whatever language, tools and frameworks you feel comfortable to. 

Also, briefly elaborate on your solution, architecture details, choice of patterns, frameworks and components.

Fork this repository and submit your code.

## Requirements

* The page is composed by three elements, according to the ui mockup below:
    * One filter component with a search button.
    * One list of Orders matching the criterias.
    * One Order details modal, displayed when the users clicks an Order.
![UI Mockup](https://www.lucidchart.com/publicSegments/view/03c3ebfa-7115-4cbb-8b05-397551627f4f/image.png)
* The Order data is provided by the micro-service `/order-service`.
* Order is composed by its Id, Restaurant id, Client id, Creation date, Confirmation date and list of Items.
* Item is composed by Description, Quantity and Unit Price.
* The Client data is provided by the micro-service `/client-service`.
* Client is composed by its Id, Name, E-mail and Phone.

## Hints and Constraints

* The diagram below illustrates the high level architecture of the application. 
Feel free to implement whatever solution you judge necessary on the `???` layer.

![High level architecture](https://www.lucidchart.com/publicSegments/view/79f92b30-8631-4e04-82b0-339616abdd81/image.png)
* You may (perhaps should) change and customize the `/client-service` and `/order-service` micro-services. 
But **MUST NOT** change the [Client](./client-service/src/main/java/com/ifood/demo/client/Client.java) 
and [Order](./order-service/src/main/java/com/ifood/demo/order/Order.java) models. 
* Don't worry about their performance, they are just REST API examples made with 
[spring intializr](https://start.spring.io/) (spring boot + data jpa + data rest). Focus on the `???` layer.
* To install and run the micro-services, user maven commands `mvn package` and `mvn spring-boot:run` on both folders.
The Client will run on port 8081 and the Order on 8082. They are both HATEOAS compliant, 
so you can easily navigate through its endpoints.
* You could use Material UI, Bootstrap or any other toolkit to accelerate your resolution. We will not provide any UI design.

## Non functional requirements

As this web application will be a worldwide success, it must be prepared to be fault tolerant,responsive and resilient. 
In other words, each micro-service will constantly reiceive a POST requests 
(let's say 2/sec for client and 50/sec for order) and your web application will have a lots of users 
active simultaneously (about ~1k).

## App

The web application that lists the Orders and its details, was developed using
React framework. It's bootstrap was done with `create-react-app` with TypeScript
template enabled.

### Starting

To start the application, simply run:

```bash
$ npm install && npm start
```

It will start the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Architectural Decisions

#### Front-End

For the UI and Design, the application uses [https://material-ui.com/](Material UI).
The React elements inside [components/](./app/src/components) are supposed to be
independent, re-usable and expansible - meaning that they can be used as building
blocks to whatever screen we are designing. In general, we should push for them
to be Pure components.

On the other hand, elements inside [routes/](./app/src/routes) are supposed to be
complex, combining multiple components to create a screen. In general, routes can
be associated to a react router and should have their own model, receiving data
from external services: this can abstracts [redux](https://react-redux.js.org/)
(reducers and actions), calls to [Apollo Client](https://www.apollographql.com/docs/react/),
[Relay](https://relay.dev/), or even just plain [axios](https://github.com/axios/axios)
calls.

All components in this project are functional, they have their own hooks that is
located in its `hooks.ts` file. The only hooks that are not defined in the `hooks.ts`
are the ones that involves UI modifications, such as: animations, rendered memoization
with `useMemo`, etc. Those are maintained in the `index.tsx` file of the component.

#### Back-End

Even though there was no actual implementation on the back-end, I'd follow one of
the two approaches to provide a shim layer abstracting the micro-services from the
web applications.

##### REST

If a REST API with the application was needed, I'd go with implementing a shim
layer with [Fastify](https://www.fastify.io/) a lightweight framework on top of
node with JSON schema validator on the requests. This would be beneficial when
scaling up to receive thousands of requests per minute, but would imply maybe
redefining some entities to combine the data needed by the app.

#### GraphQL

If a GraphQL API was adopted, we could define a schema that represents the dataset
needed by the app to load the image. This would be in the a schema that apps can
request, via introspection, and know all the operations and types exposed by the
server. For example:

```graphql
type OrderItem {
  description: String
  quantity: Int
  price: Float
}

type Client {
  id: ID!
  name: String
  email: String
  phone: String
}

type Orders {
  id: ID!
  restaurantId: ID!
  createdAt: Date
  confirmedAt: Date
  items: [OrderItem]
  client: Client!
}

type Query {
  getClients: [Client]!
  getOrders(
    date: Date
    clientName: String
    phone: String
    email: String
  ): [Orders]!
  getOrdersByClient(clientId: ID!): [Orders]!
}
```

Then, we could use
[Apollo Federation](https://www.apollographql.com/docs/apollo-server/federation/introduction/)
to separate the resolvers for `Orders` and `Clients`, since they come from different
micro-services.

Each resolver, would be a
[REST Data Source](https://www.apollographql.com/docs/apollo-server/data/data-sources/#rest-data-source).

On the app, we could use [Apollo Client](https://www.apollographql.com/docs/react/)
to handle the requests. Each data type could have its own class, exported as a
Singleton instance, in which the hooks from routes and components could use to
make the requests.

```typescript
// src/models/Clients/index.ts
import { apolloClient } from './client';
import { getAllClients } from './queries';

export interface ClientsData {
    id: string;
    name: string;
    phone: string;
    email: string;
}

interface ClientsDataResponse {
    client: [ClientsData];
}

class Clients {
    getClients = async (): Promise<ClientsData> => {
        const { data } = await apolloClient.query<ClientsDataResponse>({
            query: getAllClients,
            fetch-policy: 'cache-first',
        });

        return data.client;
    };
}

export default Clients();
```

```typescript
// src/models/Clients/index.ts
import gql from 'graphql-tag';

export const getAllClients = gql`
  {
    query
    getClients {
      id
      name
      phone
      email
    }
  }
`;
```

To avoid data over-fetching, a LRU in-memory cache could be
used on Apollo Client.

```typescript
import { InMemoryCache, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(options),
});
```

#### Main UI Components

Most of the components are just simple wrappers to the Material-UI components:

- PillButton: Abstracts the [Button](https://material-ui.com/components/buttons/)
  component, but with a rounded shape (still a TODO). Used to trigger orders filtering.
- DatePicker: Abstracts the inline [DatePicker](https://material-ui.com/components/pickers/),
  users can input a date that will be used to filter the orders.
- TextInput: Abstracts [TextField](https://material-ui.com/components/text-fields/)
  component.
- OrdersTable: Uses [CollapsibleTable](https://material-ui.com/components/tables/#collapsible-table)
  to build the orders list and orders details (upon row click).

#### Routes

Currently, the only route available (apart from the `App` itself) is `Filters`,
which combines the components to create the main page.

#### Development Utils

Regarding linting and code style, it was configured [ESLint](https://eslint.org/),
with [AirBnB config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb),
and [Prettier](https://prettier.io/).

### TODO

#### Front-end

- Configure `babel-plugin-module-resolver`: avoid the `../../<bla>` imports.
- Configure passing generic `children` props to the components, so they can
  forward to the Material UI elements.
- Add `style` prop to components and set the style on the route that combines them,
  this will make it more reusable.
- Add `__tests__` folder for each component testing their hooks, if existing, with
  [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library),
  [jest](https://jestjs.io/docs/en/cli) and [sinon](https://sinonjs.org/).
- Add rendering tests with [enzyme](https://enzymejs.github.io/enzyme/)
- Add code coverage hooks
- Change Table implementation to have clickable rows so that we can open a
  [Modal](https://material-ui.com/components/modal/), instead of using the `Collapse`
  to display items of the order.
- Receive `theme` as an argument to the `makeStyles` of Material-UI and define
  the colors based on the palette from the theme.
- Create Models hooking up with back-end
- Webpack build with command to serve
- Docker deploy, orchestrated via `docker-compose.yaml`

#### Back-end

- Add fixtures (mocked data) to the Spring micro-services
- Configure CORS
- Bootstrap `Apollo Server` with federations
- Create `RestDatasource` classes, one for each micro-service
- Implement resolvers for types and queries
- Use [graphql-codegen](https://graphql-code-generator.com/) to generate TypeScript
  types based on the schema
- Docker deploy, orchestrated via `docker-compose.yaml`
