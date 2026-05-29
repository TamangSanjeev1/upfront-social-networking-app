package com.upfront.upfront_api.utils;

public enum DBConstantsEnum {
    /**
     * A  = Active Record
     * X  = Deleted Record
     */
    ACTIVE("A", "Active Record"),
    DELETED("X", "Deleted Record");

    private final String status;
    private final String description;

    DBConstantsEnum(String status, String description) {
        this.status = status;
        this.description = description;
    }

    public String getStatus() {
        return this.status;
    }

    public String getDescription() {
        return this.description;
    }

    public static DBConstantsEnum getByStatus(String status) {
        for (DBConstantsEnum e : values()) {
            if (e.status.equals(status)) {
                return e;
            }
        }
        throw new IllegalArgumentException("No enum constant with code " + status);
    }
}
