package com.breakabletoy.back_end;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpMethod;

import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
// @Import({SecurityConfig.class, TestcontainersConfiguration.class, ...}) // When is necessary to have extra configs
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class FlightServiceTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testGetFlightSearch() {

        String origin = "MUC";
        String destination = "JFK";
        String departure = "2025-12-06";
        String adults = "3";
        String currency = "MXN";

        // Mock the response from the API
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/flights/search?origin={origin}&destination={destination}&departureDate={departure}&adults={adults}&nonStop=false&currency={currency}&page=1&filter=price",
                HttpMethod.GET,
                null,
                String.class,
                origin,
                destination,
                departure,
                adults,
                currency
        );


        // Verify the result
        assertNotNull(response);
        assertThat(response.getBody()).contains("data");
    }
}