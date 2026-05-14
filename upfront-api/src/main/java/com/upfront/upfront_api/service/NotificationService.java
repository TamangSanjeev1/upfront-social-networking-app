package com.upfront.upfront_api.service;

import com.upfront.upfront_api.dto.NotificationDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    private final List<String> SAMPLE_MESSAGES = List.of(
            "System health check completed successfully.",
            "New data sync completed.",
            "Your session is active and secure.",
            "Background task finished.",
            "Configuration updated."
    );

    private final List<String> TYPES = List.of("INFO", "SUCCESS", "WARNING");
    private final Random random = new Random();

    public void sendNotificationToUser(String email, NotificationDto notification) {
        messagingTemplate.convertAndSendToUser(email, "/queue/notifications", notification);
        log.debug("Sent notification to {}: {}", email, notification.getMessage());
    }

    // Broadcast a sample notification every 15 seconds (demo purposes)
    @Scheduled(fixedDelay = 15000)
    public void sendBroadcastNotification() {
        NotificationDto notification = NotificationDto.builder()
                .id(UUID.randomUUID().toString())
                .message(SAMPLE_MESSAGES.get(random.nextInt(SAMPLE_MESSAGES.size())))
                .type(TYPES.get(random.nextInt(TYPES.size())))
                .timestamp(LocalDateTime.now())
                .build();
        messagingTemplate.convertAndSend("/topic/notifications", notification);
        log.debug("Broadcast notification sent");
    }
}
