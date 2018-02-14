package com.ifood.demo.client;

import com.ifood.demo.SearchApplication;
import com.ifood.demo.search.SearchableOrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ClientQueueListener {

    @Autowired
    private ClientRepository repository;

    @Autowired
    private SearchableOrderRepository searchableOrderRepository;

    @RabbitListener(queues = SearchApplication.CLIENT_QUEUE_NAME)
    public void receiveNewClientMessage(final Client received) {
        log.info("Received message as client: {}", received.toString());

        repository.save(received);

        searchableOrderRepository.findByClientId(received.getId()).forEach(order -> {
            order.setClientPhone(received.getPhone());
            order.setClientEmail(received.getEmail());
            order.setClientName(received.getName());
            searchableOrderRepository.save(order);
        });
    }
}
