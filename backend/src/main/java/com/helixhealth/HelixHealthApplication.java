package com.helixhealth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class HelixHealthApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelixHealthApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Helix Health - Spring Boot funcionando";
    }
}
