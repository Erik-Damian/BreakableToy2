package com.breakabletoy.back_end.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
public class FlightService {

    @Value("${amadeus.apiEndpoint}")
    private String apiEndpoint;

    private final RestTemplate restTemplate;
    private final AirlineService airlineService;
    private final AirportService airportService;

    public FlightService(RestTemplate restTemplate, AirlineService airlineService, AirportService airportService) {
        this.restTemplate = restTemplate;
        this.airlineService = airlineService;
        this.airportService = airportService;
    }

    public Map<String, Object> getFlightSearch(
            String origin,
            String destination,
            String departureDate,
            String returnDate,
            String adults,
            String nonStop,
            String currency,
            String accessToken,
            int page,
            String filter // New parameter: "price" or "duration"
    ) {
        int pageSize = 25;
        String flightsUrl = UriComponentsBuilder.fromHttpUrl(apiEndpoint + "/v2/shopping/flight-offers")
                .queryParam("originLocationCode", origin)
                .queryParam("destinationLocationCode", destination)
                .queryParam("departureDate", departureDate)
                .queryParam("returnDate", returnDate)
                .queryParam("adults", adults)
                .queryParam("nonStop", nonStop)
                .queryParam("currencyCode", currency)
                .toUriString();

        System.out.println("Flight Search URL: " + flightsUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<Map> flightsResponse = restTemplate.exchange(
                flightsUrl,
                HttpMethod.GET,
                requestEntity,
                Map.class
        );

        if (flightsResponse.getBody() == null || !flightsResponse.getBody().containsKey("data")) {
            throw new RuntimeException("The API did not return flight information.");
        }

        Object data = flightsResponse.getBody().get("data");
        if (!(data instanceof List)) {
            throw new RuntimeException("The API response is not in the expected format.");
        }

        List<Map<String, Object>> flightsData = (List<Map<String, Object>>) flightsResponse.getBody().get("data");

        // Apply sorting based on the filter
        if (filter == null || filter.equalsIgnoreCase("price")) {
            // Default: Sort by price (ascending)
            flightsData.sort(Comparator.comparing(flight -> extractPrice(flight)));
        } else if (filter.equalsIgnoreCase("duration")) {
            // Sort by total duration (ascending)
            flightsData.sort(Comparator.comparing(flight -> calculateTotalDuration(flight)));
        }

        // Implement pagination manually
        int totalResults = flightsData.size();
        int startIndex = (page - 1) * pageSize;
        int endIndex = Math.min(startIndex + pageSize, totalResults);

        // Get the sublist for the requested page
        List<Map<String, Object>> paginatedData = flightsData.subList(startIndex, endIndex);

        // Enrich only the paginated data
        enrichFlightData(paginatedData, accessToken);

        // Return the paginated response
        return Map.of(
                "data", paginatedData,
                "page", page,
                "pageSize", pageSize,
                "totalResults", totalResults
        );
    }

    private Double extractPrice(Map<String, Object> flight) {
        // Extract the price from the nested structure
        Map<String, Object> priceMap = (Map<String, Object>) flight.get("price");
        if (priceMap != null && priceMap.containsKey("total")) {
            Object total = priceMap.get("total");
            if (total instanceof String) {
                // If the total is a string, parse it to a Double
                try {
                    return Double.parseDouble((String) total);
                } catch (NumberFormatException e) {
                    // Handle the case where the string cannot be parsed to a Double
                    return Double.MAX_VALUE; // Fallback value
                }
            } else if (total instanceof Double) {
                // If the total is already a Double, return it directly
                return (Double) total;
            } else if (total instanceof Integer) {
                // If the total is an Integer, convert it to a Double
                return ((Integer) total).doubleValue();
            }
        }
        return Double.MAX_VALUE; // Default value if price is not found or invalid
    }

    private long calculateTotalDuration(Map<String, Object> flight) {
        // Calculate the total duration of the flight based on its itineraries and segments
        List<Map<String, Object>> itineraries = (List<Map<String, Object>>) flight.get("itineraries");
        long totalDuration = 0;

        if (itineraries != null) {
            for (Map<String, Object> itinerary : itineraries) {
                List<Map<String, Object>> segments = (List<Map<String, Object>>) itinerary.get("segments");
                if (segments != null) {
                    for (Map<String, Object> segment : segments) {
                        String duration = (String) segment.get("duration");
                        if (duration != null) {
                            totalDuration += parseDuration(duration);
                        }
                    }
                }
            }
        }

        return totalDuration;
    }

    private long parseDuration(String duration) {
        // Parse a duration string like "PT2H30M" into total minutes
        String[] parts = duration.split("PT")[1].split("H|M");
        long hours = Long.parseLong(parts[0]);
        long minutes = parts.length > 1 ? Long.parseLong(parts[1]) : 0;
        return hours * 60 + minutes;
    }

    private void enrichFlightData(List<Map<String, Object>> flightsData, String accessToken) {
        airlineService.enrichAirlineNames(flightsData, accessToken);
        airportService.enrichAirportNames(flightsData, accessToken);
    }
}