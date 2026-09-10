package com.campuseats.dto;

import lombok.Data;

@Data
public class GoogleLoginRequest {
    private String email;
    private String displayName;
    private String photoURL;
    private String uid;
}
