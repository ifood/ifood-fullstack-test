package com.ifood.demo.order.service;

import com.ifood.demo.order.client.ClientClient;
import com.ifood.demo.order.document.Order;
import com.ifood.demo.order.dto.Client;
import com.ifood.demo.order.dto.OrderDetails;
import com.ifood.demo.order.dto.SearchParams;
import com.ifood.demo.order.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OrderDetailsService {

    private ClientClient clientClient;
    private OrderRepository orderRepository;

    @Autowired
    public OrderDetailsService(OrderRepository orderRepository, ClientClient clientClient) {
        this.orderRepository = orderRepository;
        this.clientClient = clientClient;
    }

    /**
     * Retrieve the order details that matches the search criteria given by the parameters
     *
     * @param searchParams search params, containing:<br/>
     *                     <ul>
     *                      <li> order creation date must be after this date </li>
     *                      <li> order creation date must be before this date </li>
     *                      <li> client name to filter </li>
     *                      <li> client phone to filter </li>
     *                      <li> client email to filter </li>
     *                     </ul>
     * @return order details list matching the criteria
     */
    public List<OrderDetails> getOrderDetails(SearchParams searchParams) {
        List<OrderDetails> detailsList = new ArrayList<>();

        log.info("Searching order details using params: {}", searchParams.toString());

        Collection<Client> clients =
                clientClient.findAllFiltered(searchParams.getClientName(), searchParams.getEmail(), searchParams.getPhone()).getContent();

        Collection<Order> orders =
                orderRepository.findByCreatedAtBetween(searchParams.getStartDate(), searchParams.getEndDate());
        for (Order order : orders) {
            Optional<Client> client = clients.stream()
                    .filter(cli -> cli.getId().equals(order.getClientId()))
                    .findFirst();

            if (client.isPresent()) {
                detailsList.add(OrderDetails.builder()
                        .createdAt(order.getCreatedAt())
                        .name(client.get().getName())
                        .email(client.get().getEmail())
                        .phone(client.get().getPhone())
                        .items(order.getItems())
                        .build());
            }
        }

        return detailsList;
    }
}
