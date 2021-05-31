package com.ifood.demo.order.mock;

import com.ifood.demo.order.dto.OrderDetails;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static com.ifood.demo.order.mock.ClientData.CLIENT1_EMAIL;
import static com.ifood.demo.order.mock.ClientData.CLIENT1_NAME;
import static com.ifood.demo.order.mock.ClientData.CLIENT1_PHONE;
import static com.ifood.demo.order.mock.ClientData.CLIENT2_EMAIL;
import static com.ifood.demo.order.mock.ClientData.CLIENT2_NAME;
import static com.ifood.demo.order.mock.ClientData.CLIENT2_PHONE;
import static com.ifood.demo.order.mock.OrderData.getItemsMock;

public class OrderDetailsData {
    public static final String CREATED_DATE_STR = "2017-12-01T18:00:00Z";
    public static final LocalDateTime CREATED_DATE = LocalDateTime.from(Instant.parse(CREATED_DATE_STR));

    public static List<OrderDetails> getOrderDetailsMock() {
        OrderDetails orderDetails1 = OrderDetails.builder()
                .name(CLIENT1_NAME)
                .phone(CLIENT1_PHONE)
                .email(CLIENT1_EMAIL)
                .createdAt(CREATED_DATE)
                .items(getItemsMock())
                .build();


        OrderDetails orderDetails2 = OrderDetails.builder()
                .name(CLIENT2_NAME)
                .phone(CLIENT2_PHONE)
                .email(CLIENT2_EMAIL)
                .createdAt(CREATED_DATE)
                .items(getItemsMock())
                .build();

        return Arrays.asList(orderDetails1, orderDetails2);
    }
}
