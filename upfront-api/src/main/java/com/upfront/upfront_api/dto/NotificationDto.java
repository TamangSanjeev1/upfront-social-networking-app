package com.upfront.upfront_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private String id;
    private String message;
    private String type; // INFO, SUCCESS, WARNING
    private LocalDateTime timestamp;
}
