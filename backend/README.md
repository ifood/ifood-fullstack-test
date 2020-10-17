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
# ifood-fullstack-test
# ifood-fullstack-test
