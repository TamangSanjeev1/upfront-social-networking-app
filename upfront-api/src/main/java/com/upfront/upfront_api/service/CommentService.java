package com.upfront.upfront_api.service;

import com.upfront.upfront_api.dto.CommentDto;
import com.upfront.upfront_api.entity.CommentEntity;
import com.upfront.upfront_api.entity.PostEntity;
import com.upfront.upfront_api.mapper.CommentMapper;
import com.upfront.upfront_api.repository.CommentRepository;
import com.upfront.upfront_api.repository.PostRepository;
import com.upfront.upfront_api.utils.SecurityUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final CommentMapper commentMapper;
    private final UserService userService;

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