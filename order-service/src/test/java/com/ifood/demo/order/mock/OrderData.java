package com.ifood.demo.order.mock;

import com.ifood.demo.order.document.Order;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static com.ifood.demo.order.mock.ClientData.CLIENT1_ID;
import static com.ifood.demo.order.mock.ClientData.CLIENT2_ID;

public class OrderData {
    public static final UUID RESTAURANT_ID = UUID.fromString("eb1fcf3e-e0c4-4910-bf1a-4b18447d2794");

    public static final UUID ORDER1_ID = UUID.fromString("fb0fd214-aa4f-4509-b1ad-c6ad22648193");
    public static final String ORDER1_CREATED_STR = "2017-10-01T12:30:00Z";
    public static final LocalDateTime ORDER1_CREATED = LocalDateTime.from(Instant.parse(ORDER1_CREATED_STR));
    public static final String ORDER1_CONFIRMED_STR = "2017-10-01T12:30:00Z";
    public static final LocalDateTime ORDER1_CONFIRMED = LocalDateTime.from(Instant.parse(ORDER1_CONFIRMED_STR));

    public static final UUID ORDER2_ID = UUID.fromString("eeed66a5-d4f4-4a72-9014-f05a1f747a7c");
    public static final String ORDER2_CREATED_STR = "2017-10-01T12:30:00Z";
    public static final LocalDateTime ORDER2_CREATED = LocalDateTime.from(Instant.parse(ORDER2_CREATED_STR));
    public static final String ORDER2_CONFIRMED_STR = "2018-07-11T15:30:00Z";
    public static final LocalDateTime ORDER2_CONFIRMED = LocalDateTime.from(Instant.parse(ORDER2_CONFIRMED_STR));

    public static final String ITEM_DESCRIPTION = "description";
    public static final int ITEM_QUANTITY = 21;
    public static final double ITEM_PRICE = 243.22;

    public static List<Order> getOrdersMock() {
        Order order1 = Order.builder()
                .id(ORDER1_ID)
                .clientId(CLIENT1_ID)
                .restaurantId(RESTAURANT_ID)
                .createdAt(ORDER1_CREATED)
                .confirmedAt(ORDER1_CONFIRMED)
                .items(getItemsMock())
                .build();

        Order order2 = Order.builder()
                .id(ORDER2_ID)
                .clientId(CLIENT2_ID)
                .restaurantId(RESTAURANT_ID)
                .createdAt(ORDER2_CREATED)
                .confirmedAt(ORDER2_CONFIRMED)
                .items(getItemsMock())
                .build();

        return Arrays.asList(order1, order2);
    }

    public static List<Order.Item> getItemsMock() {
        Order.Item item1 = new Order.Item(ITEM_DESCRIPTION, ITEM_QUANTITY, ITEM_PRICE);
        Order.Item item2 = new Order.Item(ITEM_DESCRIPTION, ITEM_QUANTITY, ITEM_PRICE);
        Order.Item item3 = new Order.Item(ITEM_DESCRIPTION, ITEM_QUANTITY, ITEM_PRICE);
        return Arrays.asList(item1, item2, item3);
    }
}
