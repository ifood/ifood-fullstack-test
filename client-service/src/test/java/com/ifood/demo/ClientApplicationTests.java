package com.ifood.demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ifood.demo.client.Client;
import com.ifood.demo.client.ClientRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

import static org.junit.Assert.assertEquals;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class ClientApplicationTests {

	@Autowired 
	ClientRepository clientRepository;

	@Test
	public void clientTest() {

		clientRepository.save(new Client("John Doe", "john@doe.com", "12345678"));
		clientRepository.save(new Client("Mary Doe", "mary@doe.com", "12348765"));
		clientRepository.save(new Client("Billy Bob", "billy@bob.com", "11112345"));

		Integer resultContAll = 0;
        UUID testCaseClientId = null;
        for (Client client : clientRepository.findAll()) {
			resultContAll++;
			System.out.println(client.getName());
			if (client.getName() ==  "John Doe") {
			    testCaseClientId = client.getId();
            }
		}
		assertEquals(resultContAll, new Integer(3));

		Integer resultContFindByQuery = 0;
		for (Client client : clientRepository.findByCustomQueryIgnoreCaseContaining(testCaseClientId, "", "", "john@doe.com")) {
            resultContFindByQuery++;
		}
		assertEquals(resultContFindByQuery, new Integer(1));

        Integer resultContFindByQueryEmpty = 0;
        for (Client client : clientRepository.findByCustomQueryIgnoreCaseContaining(testCaseClientId, "Nameless", "", "john@doe.com")) {
            resultContFindByQueryEmpty++;
        }
        assertEquals(resultContFindByQueryEmpty, new Integer(0));

	}
}