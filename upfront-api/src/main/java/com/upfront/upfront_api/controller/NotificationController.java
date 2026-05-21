package com.upfront.upfront_api.controller;

import com.upfront.upfront_api.dto.NotificationDto;
import com.upfront.upfront_api.dto.response.PagedResponse;
import com.upfront.upfront_api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/pagination")
    public ResponseEntity<PagedResponse<NotificationDto>> getNotification(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(notificationService.getUserBasedNotifications(page, size));
    }

    @GetMapping
    public ResponseEntity<List<NotificationDto>> getNotification() {
        return ResponseEntity.ok(notificationService.getNotifications());
    }
}