package com.upfront.upfront_api.websocket;

import com.upfront.upfront_api.dto.NotificationDto;
import com.upfront.upfront_api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class NotificationWebSocketController {

    private final NotificationService notificationService;

    @MessageMapping("/ping")
    public void handlePing(Principal principal) {
        if (principal != null) {
            NotificationDto pong = NotificationDto.builder()
                    .id(UUID.randomUUID().toString())
                    .title("Connection Verified")
                    .body("Connection verified — you are securely connected.")
                    .type("SUCCESS")
                    .timestamp(LocalDateTime.now())
                    .build();
            notificationService.sendNotificationToUser(principal.getName(), pong);
        }
    }
}
