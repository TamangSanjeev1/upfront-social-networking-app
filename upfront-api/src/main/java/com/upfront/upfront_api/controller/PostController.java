package com.upfront.upfront_api.controller;

import com.upfront.upfront_api.dto.NotificationDto;
import com.upfront.upfront_api.dto.PostDto;
import com.upfront.upfront_api.dto.response.PagedResponse;
import com.upfront.upfront_api.service.NotificationService;
import com.upfront.upfront_api.service.PostServiceImpl;
import com.upfront.upfront_api.service.UserService;
import com.upfront.upfront_api.utils.NotificationEnum;
import com.upfront.upfront_api.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postService;
    private final UserService userService;
    private final NotificationService notificationService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostDto create(
            @RequestBody PostDto request
    ) {
        userService.updateUserCounts();
        PostDto postDto = postService.create(request);
        notificationService.sendNotificationGeneral(NotificationDto.builder()
                        .unread(true)
                        .iconBg(NotificationEnum.POST.getIconBg())
                        .type(NotificationEnum.POST.getType())
                        .title(NotificationEnum.POST.getTitle() + SecurityUtils.getCurrentName())
                        .body(request.getTitle())
                        .timestamp(LocalDateTime.now())
                        .build());
        return postDto;

    }

    @GetMapping
    public List<PostDto> findAll() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    public PostDto findById(
            @PathVariable Long id
    ) {
        return postService.findById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable Long id
    ) {
        postService.delete(id);
    }

    @GetMapping("/pagination")
    public ResponseEntity<PagedResponse<PostDto>> getPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(postService.getPosts(page, size));
    }

    @GetMapping("/tag/{tag}")
    public ResponseEntity<PagedResponse<PostDto>> getPostsByTag(
            @PathVariable String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(postService.getPostsByTag(tag, page, size));
    }
}