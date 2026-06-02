package com.upfront.upfront_api.service;

import com.upfront.upfront_api.dto.ReactionDto;
import com.upfront.upfront_api.entity.PostEntity;
import com.upfront.upfront_api.entity.ReactionEntity;
import com.upfront.upfront_api.entity.User;
import com.upfront.upfront_api.mapper.NotificationMapper;
import com.upfront.upfront_api.repository.PostRepository;
import com.upfront.upfront_api.repository.ReactionRepository;
import com.upfront.upfront_api.utils.NotificationEnum;
import com.upfront.upfront_api.utils.ReactionType;
import com.upfront.upfront_api.utils.SecurityUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;
    private final NotificationService notificationService;

    @Transactional
    public ReactionDto.Response react(Long postId, ReactionDto.Request request) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));

        Optional<ReactionEntity> existing = reactionRepository.findByPostIdAndUserId(postId, SecurityUtils.getCurrentUserId());
        boolean sameUser = false;
        if (Objects.equals(SecurityUtils.getCurrentUserId(), post.getUser().getId())) {
            sameUser = true;
        }
        if (existing.isPresent()) {
            ReactionEntity reaction = existing.get();
            if (reaction.getCreatedAt().isBefore(LocalDateTime.now().minusHours(1)) && !sameUser) {
                // createdAt is more than 1 hour ago
                notificationService.sendNotificationToUser(post.getUser().getId(), notificationService.save(NotificationMapper.toEntity(post.getTitle(), request.getType().name().equals("LIKE") ? NotificationEnum.LIKE : NotificationEnum.DISLIKE)));
            }
            if (reaction.getType() == request.getType()) {
                // Toggle off: same reaction clicked again
                reactionRepository.delete(reaction);
            } else {
                // Switch reaction
                reaction.setType(request.getType());
                reactionRepository.save(reaction);
            }
        } else {
            ReactionEntity newReaction = ReactionEntity.builder()
                    .type(request.getType())
                    .user(User.builder().id(SecurityUtils.getCurrentUserId()).build())
                    .post(post)
                    .build();
            if (!sameUser) {
                notificationService.sendNotificationToUser(post.getUser().getId(), notificationService.save(NotificationMapper.toEntity(post.getTitle(), request.getType().name().equals("LIKE") ? NotificationEnum.LIKE : NotificationEnum.DISLIKE)));
            }
            reactionRepository.save(newReaction);
        }

        long likes = reactionRepository.countByPostIdAndType(postId, ReactionType.LIKE);
        long dislikes = reactionRepository.countByPostIdAndType(postId, ReactionType.DISLIKE);
        ReactionType userReaction = reactionRepository.findByPostIdAndUserId(postId, SecurityUtils.getCurrentUserId())
                .map(ReactionEntity::getType).orElse(null);

        return ReactionDto.Response.builder()
                .likeCount(likes)
                .dislikeCount(dislikes)
                .userReaction(userReaction)
                .build();
    }
}
