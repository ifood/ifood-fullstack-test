package com.ifood.demo.client;

import lombok.Data;
import lombok.Value;

@Value
public @Data class  Event {

    private final String type;
    private final String payload;

    public Event(String type, String payload) {

        this.type = type;
        this.payload = payload;
    }


}
