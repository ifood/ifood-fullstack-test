package com.ifood.demo.model.filter;

import io.micrometer.core.instrument.util.StringUtils;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class OrderFilter {

    public OrderFilter(Date startDate, Date endDate, String clientName, String mail, String phone) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.clientName = clientName;
        this.phone = phone;
        this.mail = mail;
    }

    private Date startDate;
    private Date endDate;
    private String clientName;
    private String phone;
    private String mail;

    public boolean isValidClientFilter() {
        return !StringUtils.isEmpty(clientName) || !StringUtils.isEmpty(mail) || !StringUtils.isEmpty(phone);
    }

}
