package com.upfront.upfront_api.exception;

import org.springframework.http.HttpStatus;

public class GeneralException extends RuntimeException {
    private final String errorCode;
    private final HttpStatus status;

    public GeneralException(String message, String errorCode, HttpStatus status) {
        super(message);
        this.errorCode = errorCode;
        this.status = status;
    }

    public String getErrorCode() { return errorCode; }
    public HttpStatus getStatus() { return status; }
}
