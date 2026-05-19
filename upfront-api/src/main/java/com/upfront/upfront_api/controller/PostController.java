package com.upfront.upfront_api.controller;

import com.upfront.upfront_api.dto.PostDto;
import com.upfront.upfront_api.service.PostServiceImpl;
import com.upfront.upfront_api.service.UserService;
import com.upfront.upfront_api.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postService;
    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostDto create(
            @RequestBody PostDto request, Principal principal
    ) {
        userService.updateUserCounts();
        return postService.create(request);

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
}