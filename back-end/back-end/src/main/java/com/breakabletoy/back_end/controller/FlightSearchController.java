package com.breakabletoy.back_end.controller;

import com.breakabletoy.back_end.service.FlightService;
import com.breakabletoy.back_end.service.TokenService;
import org.apache.el.parser.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/flights")
public class FlightSearchController {
    private final FlightService service;
    private final TokenService token;

    @Autowired
    public FlightSearchController(FlightService service, TokenService token) {
        this.service = service;
        this.token = token;
    }


    @GetMapping("/search")
    public Map<String, Object> getFlights(
        @RequestParam String origin,
        @RequestParam String destination,
        @RequestParam String departureDate,
        @RequestParam(required = false) String returnDate, //Parametro opcional
        @RequestParam String adults,
        @RequestParam String nonStop,
        @RequestParam String currency,
        @RequestParam (defaultValue = "1") int page,
        @RequestParam (defaultValue = "price") String filter
    ){
        //Llamar al cliente para consegui el access token
        String accessToken = token.getAccessToken();

        return service.getFlightSearch(
                origin,
                destination,
                departureDate,
                returnDate,
                adults,
                nonStop,
                currency,
                accessToken,
                page,
                filter);
    }

}
