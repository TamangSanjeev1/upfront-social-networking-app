package com.upfront.upfront_api;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;
import java.util.TimeZone;

@SpringBootApplication
@Slf4j
public class UpfrontApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(UpfrontApiApplication.class, args);
	}

	@PostConstruct
	public void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Tokyo"));
		log.info("Spring boot application running in JST timezone: " + new Date());
	}
}
