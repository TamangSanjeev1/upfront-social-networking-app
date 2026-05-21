package com.upfront.upfront_api.utils;

public enum NotificationEnum {

    POST("post", "#4460ed", "Post Created by ");

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
