package com.ifood.demo.order.service;

import com.ifood.demo.order.client.ClientClient;
import com.ifood.demo.order.document.Order;
import com.ifood.demo.order.dto.Client;
import com.ifood.demo.order.dto.OrderDetails;
import com.ifood.demo.order.dto.SearchParams;
import com.ifood.demo.order.exception.ServiceException;
import com.ifood.demo.order.repository.OrderRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.hateoas.Resources;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static com.ifood.demo.order.mock.ClientData.CLIENT1_EMAIL;
import static com.ifood.demo.order.mock.ClientData.CLIENT1_NAME;
import static com.ifood.demo.order.mock.ClientData.CLIENT1_PHONE;
import static com.ifood.demo.order.mock.ClientData.CLIENT2_EMAIL;
import static com.ifood.demo.order.mock.ClientData.CLIENT2_NAME;
import static com.ifood.demo.order.mock.ClientData.CLIENT2_PHONE;
import static com.ifood.demo.order.mock.ClientData.getClientsMock;
import static com.ifood.demo.order.mock.OrderData.ORDER1_CREATED;
import static com.ifood.demo.order.mock.OrderData.ORDER2_CREATED;
import static com.ifood.demo.order.mock.OrderData.getItemsMock;
import static com.ifood.demo.order.mock.OrderData.getOrdersMock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class OrderDetailsServiceTest {

    @Mock
    private ClientClient clientClient;
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private Resources<Client> resource;

    @InjectMocks
    private OrderDetailsService service;

    @Test
    public void getOrderDetails() throws ServiceException {
        List<Client> clients = getClientsMock();
        List<Order> orders = getOrdersMock();
        SearchParams searchParams = SearchParams.builder()
                .clientName("Name")
                .phone("phone")
                .email("email")
                .startDate(ORDER1_CREATED)
                .endDate(ORDER2_CREATED)
                .build();

        when(clientClient.findAllFiltered(anyString(), anyString(), anyString())).thenReturn(resource);
        when(resource.getContent()).thenReturn(clients);
        when(orderRepository.findByCreatedAtBetween(any(LocalDateTime.class), any(LocalDateTime.class))).thenReturn(
                orders);

        List<OrderDetails> orderDetails =
                service.getOrderDetails(searchParams);

        Assert.assertEquals(2, orderDetails.size());
        checkOrderDetails(orderDetails);

        verify(clientClient).findAllFiltered(anyString(), anyString(), anyString());
        verify(resource).getContent();
        verify(orderRepository).findByCreatedAtBetween(any(LocalDateTime.class), any(LocalDateTime.class));
    }

    private void checkOrderDetails(List<OrderDetails> orderDetails) {
        OrderDetails orderDetails1 = OrderDetails.builder()
                .name(CLIENT1_NAME)
                .email(CLIENT1_EMAIL)
                .phone(CLIENT1_PHONE)
                .createdAt(ORDER1_CREATED)
                .items(getItemsMock())
                .build();

        OrderDetails orderDetails2 = OrderDetails.builder()
                .name(CLIENT2_NAME)
                .email(CLIENT2_EMAIL)
                .phone(CLIENT2_PHONE)
                .createdAt(ORDER2_CREATED)
                .items(getItemsMock())
                .build();

        List<OrderDetails> expectedList = Arrays.asList(orderDetails1, orderDetails2);

        Assert.assertEquals(expectedList, orderDetails);
    }
}