package com.upfront.upfront_api.dto;

import com.upfront.upfront_api.utils.ReactionType;
import jakarta.validation.constraints.NotNull;
import lombok.*;

public class ReactionDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        @NotNull(message = "Reaction type is required")
        private ReactionType type;

        private Long userId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private long likeCount;
        private long dislikeCount;
        private ReactionType userReaction;
    }
}
