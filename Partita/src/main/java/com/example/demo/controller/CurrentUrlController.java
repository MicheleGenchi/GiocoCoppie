package com.example.demo.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrentUrlController {

    @GetMapping("/get")
    public String getServerIp(HttpServletRequest request) {
        // Equivale esattamente a window.location.hostname
        String serverName = request.getServerName(); 
        
        return "L'host del server è: " + serverName;
    }
}
