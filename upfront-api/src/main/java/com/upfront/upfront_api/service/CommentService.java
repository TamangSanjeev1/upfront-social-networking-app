package com.upfront.upfront_api.service;

import com.upfront.upfront_api.dto.CommentDto;
import com.upfront.upfront_api.entity.CommentEntity;
import com.upfront.upfront_api.entity.PostEntity;
import com.upfront.upfront_api.mapper.CommentMapper;
import com.upfront.upfront_api.mapper.NotificationMapper;
import com.upfront.upfront_api.repository.CommentRepository;
import com.upfront.upfront_api.repository.PostRepository;
import com.upfront.upfront_api.utils.NotificationEnum;
import com.upfront.upfront_api.utils.SecurityUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final CommentMapper commentMapper;
    private final UserService userService;
    private final NotificationService notificationService;
    @Transactional(readOnly = true)
    public List<CommentDto> getComments(Long postId) {
        return commentRepository.findAllByPostId(postId)
                .stream().map(commentMapper::toDto).toList();
    }

    @Transactional
    public CommentDto addComment(Long postId, CommentDto request) {
        PostEntity post = postRepository.getReferenceById(postId);
        CommentEntity comment = CommentEntity.builder()
                .body(request.getBody())
                .post(post)
                .build();
        if (!Objects.equals(SecurityUtils.getCurrentUserId(), post.getUser().getId())) {
            String shortBody = request.getBody().length() > 20
                    ? request.getBody().substring(0, 20) + "..."
                    : request.getBody();
            String title = post.getTitle().length() > 20
                    ? post.getTitle().substring(0, 20)
                    : post.getTitle();
            notificationService.sendNotificationToUser(post.getUser().getId(), notificationService.save(NotificationMapper.toEntity(title + " — " + shortBody, NotificationEnum.COMMENT, post.getUser())));
        }
        CommentEntity commentEntity = commentRepository.save(comment);
        commentEntity.setUser(this.userService.findById(SecurityUtils.getCurrentUserId()));
        return commentMapper.toDto(commentEntity);
    }

    @Transactional
    public void deleteComment(Long postId, Long commentId) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));

        if (!comment.getPost().getId().equals(postId))
            throw new IllegalArgumentException("Comment does not belong to this post");

        if (!comment.getUser().getId().equals(SecurityUtils.getCurrentUserId()))
            throw new AccessDeniedException("Not your comment");

        commentRepository.delete(comment);
    }
}