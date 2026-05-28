package com.upfront.upfront_api.controller;

import com.upfront.upfront_api.dto.ReactionDto;
import com.upfront.upfront_api.service.ReactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reaction/{postId}")
@RequiredArgsConstructor
public class ReactionController {

    private final ReactionService reactionService;

    @PostMapping
    public ResponseEntity<ReactionDto.Response> react(
            @PathVariable Long postId,
            @Valid @RequestBody ReactionDto.Request request) {
        return ResponseEntity.ok(reactionService.react(postId, request));
    }
}
