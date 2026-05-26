package com.upfront.upfront_api.utils;

import com.github.javafaker.Faker;
import com.upfront.upfront_api.security.jwt.UserPrincipal;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {

    private SecurityUtils() {
    }

    public static UserPrincipal getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserPrincipal userPrincipal) {
            return userPrincipal;
        }

        if (authentication instanceof UsernamePasswordAuthenticationToken token
                && token.getPrincipal() instanceof UserPrincipal userPrincipal) {

            return userPrincipal;
        }

        return null;
    }

    public static Long getCurrentUserId() {

        UserPrincipal user = getCurrentUser();

        return user != null ? user.getId() : null;
    }

    public static String getCurrentName() {

        UserPrincipal user = getCurrentUser();

        return user != null ? user.getUserName() : null;
    }

    public static String getGoogleId() {

        UserPrincipal user = getCurrentUser();

        return user != null ? user.getGoogleId() : null;
    }

    public static boolean isAuthenticated() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return authentication != null
                && authentication.isAuthenticated()
                && !"anonymousUser".equals(authentication.getPrincipal());
    }

    public static String randomUserNameGenerator() {
        Faker faker = new Faker();
        String username = "";
        for (int i = 0; i < 10; i++) {
            username = faker.name().username() + "_" + faker.number().digits(3);
        }

        return username;
    }
}