package com.ifood.demo;

import com.ifood.demo.client.ClientApplication;
import com.ifood.demo.client.document.Client;
import com.ifood.demo.client.repository.ClientRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {ClientApplication.class})
public class ClientApplicationTests {

    @Autowired
    ClientRepository clientRepository;

    @Test
    public void clientTest() {

        clientRepository.save(new Client("John Doe", "john@doe.com", "12345678"));
        clientRepository.save(new Client("Mary Doe", "mary@doe.com", "12348765"));
        clientRepository.save(new Client("Billy Bob", "billy@bob.com", "11112345"));

        int allClientsSize = 0;
        for (Client client : clientRepository.findAll()) {
            log.info("Hello {}", client.toString());
            allClientsSize += 1;
        }
        assertEquals(3, allClientsSize);

        int doeClients = 0;
        for (Client client : clientRepository.findByNameIgnoreCaseContaining("doe")) {
            log.info("Hello 'Doe' {}", client.toString());
            doeClients += 1;
        }
        assertEquals(2, doeClients);

    }
}