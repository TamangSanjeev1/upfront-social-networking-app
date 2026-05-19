package com.upfront.upfront_api.service;

import com.upfront.upfront_api.dto.PostDto;
import com.upfront.upfront_api.entity.PostEntity;
import com.upfront.upfront_api.mapper.PostMapper;
import com.upfront.upfront_api.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}