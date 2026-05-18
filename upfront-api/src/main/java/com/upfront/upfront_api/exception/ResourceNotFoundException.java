package com.upfront.upfront_api.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends GeneralException {
    public ResourceNotFoundException(String resource, String id) {
        super(resource + " not found with id: " + id, "RESOURCE_NOT_FOUND", HttpStatus.NOT_FOUND);
    }
}
