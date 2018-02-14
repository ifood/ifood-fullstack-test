package com.ifood.demo.order;

import com.ifood.demo.SearchApplication;
import com.ifood.demo.client.Client;
import com.ifood.demo.client.ClientRepository;
import com.ifood.demo.search.SearchableItem;
import com.ifood.demo.search.SearchableItemRepository;
import com.ifood.demo.search.SearchableOrder;
import com.ifood.demo.search.SearchableOrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class OrderQueueListener {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private SearchableOrderRepository orderRepository;

    @Autowired
    private SearchableItemRepository itemRepository;

    @RabbitListener(queues = SearchApplication.ORDER_QUEUE_NAME)
    public void receiveNewMessage(final Order received) {

        log.info("Received message: {}", received.toString());

        Client client = clientRepository.findOne(received.getClientId());
        SearchableOrder newOrder = new SearchableOrder(received);

        if (client != null){
            newOrder.setClientName(client.getName());
            newOrder.setClientEmail(client.getEmail());
            newOrder.setClientPhone(client.getPhone());
        }

        Double totalValue = received.getItems().stream()
                .mapToDouble(item -> item.getPrice()*item.getQuantity())
                .sum();

        newOrder.setTotalValue(totalValue);

        orderRepository.save(newOrder);

        received.getItems().forEach(item -> {
            itemRepository.save(new SearchableItem(newOrder.getId(), item));
        });
    }
}
