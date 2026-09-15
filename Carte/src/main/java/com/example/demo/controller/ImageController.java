package com.example.demo.controller;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;

import com.example.demo.model.ImageRequest;

@RestController
@RequestMapping("carta")
public class ImageController {

    @Autowired
    ImageRequest imageRequest;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final Logger LOGGER = LoggerFactory.getLogger(ImageController.class);

    @PostMapping(value = "download", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> downloadCarta(@RequestBody ImageRequest request) {
        try {

            LOGGER.info("urlImage = "+request.getUrlImage());

            // 1. Prepariamo gli header della richiesta verso il server 7003
            HttpHeaders headers = new HttpHeaders();
            // Accettiamo esplicitamente le immagini JPEG
            headers.setAccept(Collections.singletonList(MediaType.IMAGE_JPEG)); 
            
            // Creiamo l'entità della richiesta (senza body, solo header)
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            // 2. Eseguiamo la chiamata GET verso l'URL (http://localhost:7003/...)
            ResponseEntity<byte[]> response = restTemplate.exchange(
                request.getUrlImage(),
                HttpMethod.GET,
                entity,
                byte[].class
            );

            // 3. Se il server remoto risponde con successo, restituiamo i byte
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(response.getBody());
            }

            // Se il server remoto (7003) restituisce un altro stato (es. 404) lo propaghiamo
            return ResponseEntity.status(response.getStatusCode()).build();

        } catch (Exception e) {
            System.err.println("[ERRORE] Impossibile scaricare l'immagine dall'URL remoto: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
