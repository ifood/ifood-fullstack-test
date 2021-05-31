package com.ifood.demo.order.mock;

import com.ifood.demo.order.dto.Client;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class ClientData {

    public static final UUID CLIENT1_ID = UUID.fromString("4bb62d72-606b-4569-abee-0322b237b601");
    public static final String CLIENT1_NAME = "Some Name";
    public static final String CLIENT1_EMAIL = "email@email.com";
    public static final String CLIENT1_PHONE = "888888";

    public static final UUID CLIENT2_ID = UUID.fromString("a11a7629-10a9-4a0b-8bc5-b0f81badefd2");
    public static final String CLIENT2_NAME = "Some Other Name";
    public static final String CLIENT2_EMAIL = "email@false.com";
    public static final String CLIENT2_PHONE = "0021102";

    private static final UUID CLIENT3_ID = UUID.fromString("58ada496-b4b4-4386-a973-2bce08ed5bef");

    public static List<Client> getClientsMock() {
        List<Client> clients;
        Client client1 = Client.builder()
                .id(CLIENT1_ID)
                .name(CLIENT1_NAME)
                .email(CLIENT1_EMAIL)
                .phone(CLIENT1_PHONE)
                .build();

        Client client2 = Client.builder()
                .id(CLIENT2_ID)
                .name(CLIENT2_NAME)
                .email(CLIENT2_EMAIL)
                .phone(CLIENT2_PHONE)
                .build();
        clients = Arrays.asList(client1, client2);
        return clients;
    }
}
