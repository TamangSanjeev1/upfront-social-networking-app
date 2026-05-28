package com.upfront.upfront_api.service;

import com.upfront.upfront_api.dto.PostDto;
import com.upfront.upfront_api.dto.response.PagedResponse;
import com.upfront.upfront_api.entity.PostEntity;
import com.upfront.upfront_api.mapper.PostMapper;
import com.upfront.upfront_api.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl {

    private final PostRepository postRepository;

    public PostDto create(PostDto request) {

        PostEntity entity = PostMapper.toEntity(request);

        PostEntity saved = postRepository.save(entity);

        return PostMapper.toResponse(saved);
    }

    public List<PostDto> findAll() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PostMapper::toResponse)
                .toList();
    }

    public PostDto findById(Long id) {

        PostEntity entity = postRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Post not found"));

        return PostMapper.toResponse(entity);
    }

    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    public PagedResponse<PostDto> getPosts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PostEntity> result = postRepository.findAllByOrderByCreatedAtDesc(pageable);
        return toPagedResponse(result, page, size);
    }

    @Transactional(readOnly = true)
    public PagedResponse<PostDto> getPostsByUser(int page, int size, Long userId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PostEntity> result = postRepository.findAllByUserIdWithReactions(userId, pageable);
        return toPagedResponse(result, page, size);
    }


    public PagedResponse<PostDto> getPostsByTag(String tag, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PostEntity> result = postRepository.findByTypeOrderByCreatedAtDesc(tag, pageable);
        return toPagedResponse(result, page, size);
    }

    public PagedResponse<PostDto> getPostsByTagAndUser(Long userId, String tag, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PostEntity> result = postRepository.findPostByUserAndTag(tag, userId, pageable);
        return toPagedResponse(result, page, size);
    }

    private PagedResponse<PostDto> toPagedResponse(Page<PostEntity> result, int page, int size) {
        return new PagedResponse<>(
                result.getContent().stream().map(PostMapper::toResponse).toList(),
                page,
                size,
                result.getTotalElements(),
                result.getTotalPages(),
                result.isLast(),
                result.isFirst()
        );
    }
}