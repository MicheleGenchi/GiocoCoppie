package com.example.demo.model;

import org.springframework.stereotype.Component;

@Component
public class ImageRequest {

    private String urlImage;

    public String getUrlImage() {
        return this.urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }
}