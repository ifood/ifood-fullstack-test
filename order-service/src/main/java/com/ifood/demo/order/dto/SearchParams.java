package com.ifood.demo.order.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.ToString;
import lombok.Value;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@JsonDeserialize(builder = SearchParams.Builder.class)
@Value
@AllArgsConstructor
@Builder(builderClassName = "Builder")
@ToString
public class SearchParams {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private final LocalDateTime startDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private final LocalDateTime endDate;
    private final String clientName;
    private final String phone;
    private final String email;

    protected SearchParams() {
        this(null, null, null, null, null);
    }

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder {

    }
}
