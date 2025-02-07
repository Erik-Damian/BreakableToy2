package com.breakabletoy.back_end.controller;

import com.breakabletoy.back_end.service.LocationService;
import com.breakabletoy.back_end.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/location")
public class LocationController {
    private final LocationService service;
    private final  TokenService token;

    @Autowired
    public LocationController(LocationService service, TokenService token) {
        this.service = service;
        this.token = token;
    }

    @GetMapping
    public Map<String, Object> getLocations(
            @RequestParam String subType,
            @RequestParam String keyword
    ) {
        // Get the access token
        String accessToken = token.getAccessToken();

        // Call the client to get locations
        return service.getLocations(subType, keyword, accessToken);
    }
}