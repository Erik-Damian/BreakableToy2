package com.breakabletoy.back_end.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AirportService {

    private final LocationService locationService;

    public AirportService(LocationService locationService) {
        this.locationService = locationService;
    }

    public void enrichAirportNames(List<Map<String, Object>> flightsData, String accessToken) {
        flightsData.forEach(flight -> {
            List<Map<String, Object>> itineraries = (List<Map<String, Object>>) flight.get("itineraries");
            if (itineraries != null) {
                itineraries.forEach(itinerary -> {
                    List<Map<String, Object>> segments = (List<Map<String, Object>>) itinerary.get("segments");
                    if (segments != null) {
                        segments.forEach(segment -> {
                            Map<String, Object> departure = (Map<String, Object>) segment.get("departure");
                            if (departure != null) {
                                String departureCode = (String) departure.get("iataCode");
                                if (departureCode != null) {
                                    Map<String, Object> location = locationService.getLocations("AIRPORT", departureCode, accessToken);
                                    if (location != null && location.containsKey("data")) {
                                        List<Map<String, String>> locationData = (List<Map<String, String>>) location.get("data");
                                        if (!locationData.isEmpty()) {
                                            departure.put("airportName", locationData.get(0).get("name"));
                                        }
                                    }
                                }
                            }

                            Map<String, Object> arrival = (Map<String, Object>) segment.get("arrival");
                            if (arrival != null) {
                                String arrivalCode = (String) arrival.get("iataCode");
                                if (arrivalCode != null) {
                                    Map<String, Object> location = locationService.getLocations("AIRPORT", arrivalCode, accessToken);
                                    if (location != null && location.containsKey("data")) {
                                        List<Map<String, String>> locationData = (List<Map<String, String>>) location.get("data");
                                        if (!locationData.isEmpty()) {
                                            arrival.put("airportName", locationData.get(0).get("name"));
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });
    }
}