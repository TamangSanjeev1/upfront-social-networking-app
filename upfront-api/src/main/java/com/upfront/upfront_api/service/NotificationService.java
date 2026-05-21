package com.upfront.upfront_api.service;

import com.upfront.upfront_api.dto.NotificationDto;
import com.upfront.upfront_api.dto.response.PagedResponse;
import com.upfront.upfront_api.entity.NotificationEntity;
import com.upfront.upfront_api.mapper.NotificationMapper;
import com.upfront.upfront_api.repository.NotificationRepository;
import com.upfront.upfront_api.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationRepository notificationRepository;

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
        messagingTemplate.convertAndSend("/user/notifications/" + email, notification);
        log.debug("Sent notification to {}: {}", email, notification.getBody());
    }

    public void sendNotificationGeneral(NotificationDto notification) {
        messagingTemplate.convertAndSend("/topic/notifications", notification);
        log.debug("Sent notification to : {}", notification);
    }

    // Broadcast a sample notification every 15 seconds (demo purposes)
//    @Scheduled(fixedDelay = 15000)
    public void sendBroadcastNotification() {
        NotificationDto notification = NotificationDto.builder()
                .id(1L)
                .title("SAMPLE MESSAGE")
                .body(SAMPLE_MESSAGES.get(random.nextInt(SAMPLE_MESSAGES.size())))
                .type(TYPES.get(random.nextInt(TYPES.size())))
                .timestamp(LocalDateTime.now())
                .build();
        messagingTemplate.convertAndSend("/topic/notifications", notification);
        log.debug("Broadcast notification sent");
    }

    public PagedResponse<NotificationDto> getNotificationsByPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<NotificationEntity> result = notificationRepository.findAllByOrderByTimestampDesc(pageable);
        return toPagedResponse(result, page, size);
    }

    public List<NotificationDto> getNotifications() {
        return notificationRepository.findAllByOrderByTimestampDesc().stream().map(NotificationMapper::toResponse).toList();
    }

    public PagedResponse<NotificationDto> getUserBasedNotifications(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return toPagedResponse(notificationRepository.findByUserIdOrGlobal(SecurityUtils.getCurrentUserId(), pageable), page, size);
    }

    private PagedResponse<NotificationDto> toPagedResponse(Page<NotificationEntity> result, int page, int size) {
        return new PagedResponse<>(
                result.getContent().stream().map(NotificationMapper::toResponse).toList(),
                page,
                size,
                result.getTotalElements(),
                result.getTotalPages(),
                result.isLast(),
                result.isFirst()
        );
    }

    public NotificationDto save(NotificationEntity notificationEntity) {
        return NotificationMapper.toResponse(this.notificationRepository.save(notificationEntity));
    }
}
