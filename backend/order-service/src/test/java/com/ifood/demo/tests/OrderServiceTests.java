package com.ifood.demo.tests;

import com.ifood.demo.client.ClientService;
import com.ifood.demo.model.Client;
import com.ifood.demo.model.Order;
import com.ifood.demo.model.dto.OrderDto;
import com.ifood.demo.model.filter.OrderFilter;
import com.ifood.demo.repository.OrderRepository;
import com.ifood.demo.service.OrderService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import static org.mockito.Mockito.when;

@SpringBootTest
public class OrderServiceTests {

    @InjectMocks
    private OrderService orderService;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ClientService clientService;

    @Test
    public void shouldGetOnlyClietnWhenSearch() throws Exception {
        //prepare
        OrderFilter filter = new OrderFilter();
        filter.setStartDate(new Date(2020, 1, 1));
        filter.setEndDate(new Date(2020, 1, 6));

        //act
        List<OrderDto> admins = orderService.findAllByFilter(filter);

        //assert
        Assertions.assertEquals(admins.stream().count(), 1);
    }

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        Client client = new Client();
        client.setId(UUID.fromString("7478080b-9337-40d4-b640-2fc215516422"));

        Order order1 = new Order();
        order1.setClientId(UUID.fromString("52328202-0e89-4f1d-a2f6-c69e7b3d63e"));
        order1.setCreatedAt(new Date(2020, 1, 1));
        order1.setRestaurantId(UUID.fromString("52328202-0e89-4f1d-a2f6-c69e7b3d63e"));
        order1.setItems(new ArrayList<>());

        Order order2 = new Order();
        order2.setClientId(UUID.fromString("7478080b-9337-40d4-b640-2fc215516422"));
        order2.setCreatedAt(new Date(2020, 1, 5));
        order2.setRestaurantId(UUID.fromString("52328202-0e89-4f1d-a2f6-c69e7b3d63e"));
        order2.setItems(new ArrayList<>());

        when(orderRepository.findByCreatedAtBetween(new Date(2020, 1, 1), new Date(2020, 1, 6))).thenReturn(Arrays.asList(order2, order1));
        when(clientService.findAll(null, null, null)).thenReturn(Arrays.asList(client));
    }
}