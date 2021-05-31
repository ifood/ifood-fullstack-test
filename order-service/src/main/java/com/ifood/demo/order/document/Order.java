package com.ifood.demo.order.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Wither;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Document
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Wither
public class Order {

    private final UUID clientId;
    private final UUID restaurantId;
    private final LocalDateTime createdAt;
    private final LocalDateTime confirmedAt;
    private final List<Item> items;
    private @Id
    UUID id = UUID.randomUUID();

    protected Order() {
        this(null, null, null, null, null);
    }


    @Data
    @Builder
    @RequiredArgsConstructor
    @Wither
    public static class Item {

        private final String description;
        private final Integer quantity;
        private final Double price;

        protected Item() {
            this(null, null, null);
        }
    }
}
