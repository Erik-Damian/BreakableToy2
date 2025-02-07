package com.breakabletoy.back_end.controller;

import com.breakabletoy.back_end.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TextController {

    private final TokenService service;

    @Autowired
    public TextController(TokenService service) {
        this.service = service;
    }

    @GetMapping("/token")
    public String getAccessToken() {
        return service.getAccessToken();
    }
}

