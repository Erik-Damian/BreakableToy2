package com.breakabletoy.back_end.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class TokenService {

    @Value("${amadeus.apiKey}")
    private String apiKey;

    @Value("${amadeus.apiSecret}")
    private String apiSecret;

    @Value("${amadeus.apiEndpoint}")
    private String apiEndpoint;

    private final RestTemplate restTemplate;

    public TokenService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getAccessToken() {
        String requestBody = "grant_type=client_credentials"
                + "&client_id=" + apiKey
                + "&client_secret=" + apiSecret;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                apiEndpoint + "/v1/security/oauth2/token",
                request,
                Map.class
        );

        return (String) response.getBody().get("access_token");
    }
}