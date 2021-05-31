package com.ifood.demo.order.exception;

import java.util.UUID;

public class ClientNotFoundException extends ServiceException {

    private static String MESSAGE_BASE = "User with id wasn't %s found";

    public ClientNotFoundException(UUID clientId) {
        super(String.format(MESSAGE_BASE, clientId.toString()));
    }

    public ClientNotFoundException(UUID clientId, Throwable throwable) {
        super(String.format(MESSAGE_BASE, clientId.toString()), throwable);
    }
}
