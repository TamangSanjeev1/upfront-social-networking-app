package com.upfront.upfront_api.security.oauth2;

import com.upfront.upfront_api.entity.User;
import com.upfront.upfront_api.security.jwt.JwtUtils;
import com.upfront.upfront_api.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    @Value("${app.base-url}")
    private String appBaseUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        User user = userService.processOAuthLogin(oAuth2User.getAttributes());

        String token = jwtUtils.generateToken(user.getEmail(), user.getName(), user.getProfileImage());

        String redirectUrl = UriComponentsBuilder.fromUriString(appBaseUrl + "/auth/callback")
                .queryParam("token", token)
                .build().toUriString();

        log.info("OAuth2 success for user: {}, redirecting to frontend", user.getEmail());
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
