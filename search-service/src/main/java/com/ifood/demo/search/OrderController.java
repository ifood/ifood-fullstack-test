package com.ifood.demo.search;

import com.ifood.demo.search.response.SearchableItemResponse;
import com.ifood.demo.search.response.SearchableOrderResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
public class OrderController {

    @Autowired
    private SearchableOrderRepository orderRepository;
    @Autowired
    private SearchableItemRepository itemRepository;

    @RequestMapping(method = RequestMethod.GET, value = "/orders/search")
    @ResponseBody
    public Iterable<SearchableOrderResponse> search(
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate,
            @RequestParam(value = "clientName", required = false) String name,
            @RequestParam(value = "clientEmail", required = false) String email,
            @RequestParam(value = "clientPhone", required = false) String phone) {

        String clientName = fromBase64(name);
        String clientEmail = fromBase64(email);
        String clientPhone = fromBase64(phone);

        QSearchableOrder qSearchableOrder = new QSearchableOrder("");

        BooleanExpression current = null;

        if (!StringUtils.isEmpty(startDate) && !StringUtils.isEmpty(endDate)){
            current = qSearchableOrder.createdAt.between(
                    Date.from(LocalDate.parse(startDate).atStartOfDay().atOffset(ZoneOffset.UTC).toInstant()),
                    Date.from(LocalDate.parse(endDate).atStartOfDay().atOffset(ZoneOffset.UTC).toInstant()));
        }

        if (!StringUtils.isEmpty(clientName)){
            if (current == null){
                current = qSearchableOrder.clientName.containsIgnoreCase(clientName);
            } else {
                current = current.and(qSearchableOrder.clientName.containsIgnoreCase(clientName));
            }
        }
        if (!StringUtils.isEmpty(clientEmail)){
            if (current == null){
                current = qSearchableOrder.clientEmail.containsIgnoreCase(clientEmail);
            } else {
                current = current.and(qSearchableOrder.clientEmail.containsIgnoreCase(clientEmail));
            }
        }
        if (!StringUtils.isEmpty(clientPhone)){
            if (current == null){
                current = qSearchableOrder.clientPhone.containsIgnoreCase(clientPhone);
            } else {
                current = current.and(qSearchableOrder.clientPhone.containsIgnoreCase(clientPhone));
            }
        }

        if (current == null){
            current = qSearchableOrder.clientName.isNotNull();
        } else {
            current = current.and(qSearchableOrder.clientName.isNotNull());
        }

        return StreamSupport.stream(orderRepository.findAll(current).spliterator(), false)
                .map(SearchableOrderResponse::new)
                .collect(Collectors.toList());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/orders/{id}/items")
    @ResponseBody
    public Iterable<SearchableItemResponse> items(@PathVariable("id") UUID id){
        return itemRepository.findByOrderId(id).stream()
                .map(SearchableItemResponse::new)
                .collect(Collectors.toList());
    }

    private String fromBase64(String s){
        if (StringUtils.isEmpty(s)) return "";

        return new String(Base64Utils.decodeFromUrlSafeString(s));
    }
}
