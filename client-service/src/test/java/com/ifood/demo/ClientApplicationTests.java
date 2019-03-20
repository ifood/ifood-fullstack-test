package com.ifood.demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ifood.demo.model.Client;
import com.ifood.demo.repository.ClientRepository;

import lombok.extern.slf4j.Slf4j;

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

		for (Client client : clientRepository.findAll()) {
			log.info("Hello {}", client.toString());
		}
		
		for (Client client : clientRepository.findByNameIgnoreCaseContaining("doe")) {
			log.info("Hello 'Doe' {}", client.toString());		
		}

	}
}