package com.breakabletoy.back_end.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LocationService {

    @Value("${amadeus.apiEndpoint}")
    private String apiEndpoint;

    private final RestTemplate restTemplate;
    private final Map<String, Map<String, String>> locationsCache = new HashMap<>();

    public LocationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, Object> getLocations(String subType, String keyword, String accessToken) {
        List<Map<String, String>> cachedResults = locationsCache.values().stream()
                .filter(location -> location.get("iataCode").equalsIgnoreCase(keyword) || location.get("name").equalsIgnoreCase(keyword))
                .collect(Collectors.toList());

        if (!cachedResults.isEmpty()) {
            System.out.println("Recuperando datos desde el cache para: " + keyword);
            return Map.of("data", cachedResults);
        }

        System.out.println("Realizando llamada a la API de localización para: " + keyword);
        String url = UriComponentsBuilder.fromHttpUrl(apiEndpoint + "/v1/reference-data/locations")
                .queryParam("subType", subType)
                .queryParam("keyword", keyword)
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                requestEntity,
                Map.class
        );

        List<Map<String, Object>> data = (List<Map<String, Object>>) response.getBody().get("data");
        List<Map<String, String>> locations = data.stream()
                .map(location -> {
                    Map<String, String> result = Map.of(
                            "iataCode", (String) location.get("iataCode"),
                            "name", (String) location.get("name")
                    );

                    String iataKey = result.get("iataCode").toLowerCase();
                    locationsCache.put(iataKey, result);

                    String nameKey = result.get("name").toLowerCase();
                    locationsCache.put(nameKey, result);

                    return result;
                })
                .collect(Collectors.toList());

        if (locations.isEmpty()) {
            Map<String, String> unknownLocation = Map.of(
                    "iataCode", keyword.toUpperCase(),
                    "name", "UnknownAirport"
            );

            String iataKey = unknownLocation.get("iataCode").toLowerCase();
            locationsCache.put(iataKey, unknownLocation);

            String nameKey = unknownLocation.get("name").toLowerCase();
            locationsCache.put(nameKey, unknownLocation);

            return Map.of("data", List.of(unknownLocation));
        }

        return Map.of("data", locations);
    }
}