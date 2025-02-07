package com.breakabletoy.back_end;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.springframework.test.annotation.DirtiesContext;

import org.springframework.context.annotation.Import;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
// @Import({SecurityConfig.class, TestcontainersConfiguration.class, ...}) // When is necessary to have extra configs
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class BackEndApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	void contextLoads() {
	}

	// FlightSearchController



	// LocationController

	// GET /api/location PARAMS ("AIRPORT","Muc")
	/* EXPECT {
		"data": [
			{
				"name": "MUNICH INTERNATIONAL",
				"iataCode": "MUC"
			}
		]
	} */

	@Test
	void testGETlocation() {
		String subtype = "AIRPORT";
		String keyword = "Muc";

		ResponseEntity<String> response = restTemplate.exchange(
				"/api/location?subType={subtype}&keyword={keyword}",
				HttpMethod.GET,
				null,
				String.class,
				subtype,
				keyword
		);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(response.getBody()).contains("MUNICH INTERNATIONAL");
	}


	// GET /api/location PARAMS ("")
		// EXPECT REUTRN ERROR 404


	// TextController
}
