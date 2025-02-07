package com.breakabletoy.back_end.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AirlineService {

    @Value("${amadeus.apiEndpoint}")
    private String apiEndpoint;

    private final RestTemplate restTemplate;

    public AirlineService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void enrichAirlineNames(List<Map<String, Object>> flightsData, String accessToken) {
        List<String> airlineCodes = flightsData.stream()
                .map(flight -> {
                    List<String> codes = (List<String>) flight.get("validatingAirlineCodes");
                    if (codes != null && !codes.isEmpty()) {
                        return codes.get(0);
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());

        if (!airlineCodes.isEmpty()) {
            String airlinesUrl = UriComponentsBuilder.fromHttpUrl(apiEndpoint + "/v1/reference-data/airlines")
                    .queryParam("airlineCodes", String.join(",", airlineCodes))
                    .toUriString();

            System.out.println("Airline Search URL: " + airlinesUrl);

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<String> requestEntity = new HttpEntity<>(headers);

            ResponseEntity<Map> airlinesResponse = restTemplate.exchange(
                    airlinesUrl,
                    HttpMethod.GET,
                    requestEntity,
                    Map.class
            );

            if (airlinesResponse.getBody() == null || !airlinesResponse.getBody().containsKey("data")) {
                throw new RuntimeException("The API did not return airline information.");
            }

            Map<String, String> airlineNames = ((List<Map<String, Object>>) airlinesResponse.getBody().get("data")).stream()
                    .filter(airline -> airline.get("iataCode") != null && airline.get("businessName") != null)
                    .collect(Collectors.toMap(
                            airline -> (String) airline.get("iataCode"),
                            airline -> (String) airline.get("businessName")
                    ));

            flightsData.forEach(flight -> {
                List<String> codes = (List<String>) flight.get("validatingAirlineCodes");
                if (codes != null && !codes.isEmpty()) {
                    String airlineCode = codes.get(0);
                    flight.put("airlineName", airlineNames.getOrDefault(airlineCode, "Unknown Airline"));
                }
            });
        }
    }
}