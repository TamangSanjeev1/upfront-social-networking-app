package com.upfront.upfront_api.utils;

public enum NotificationEnum {

    POST("post", "#4460ed", "Post Created by "),
    LIKE("like", "#44ed5b", "Post Liked by "),
    DISLIKE("dislike", "#ed4a44", "Post Disliked by "),
    COMMENT("comment", "#edeb44", "Post Commented by ");

    private final String type;
    private final String iconBg;
    private final String title;

    NotificationEnum(String type, String iconBg, String title) {
        this.type = type;
        this.iconBg = iconBg;
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public String getIconBg() {
        return iconBg;
    }

    public String getTitle() {
        return title;
    }
}
