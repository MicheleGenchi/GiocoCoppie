package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.SessionScope;

import com.example.demo.model.Intestazione;

@RestController
@SessionScope
@RequestMapping(value="intestazione")
public class IntestazioneController {
	
	@Autowired 
	Intestazione intestazione;
	// private static Logger LOGGER = LoggerFactory.getLogger(IntestazioneController.class);

	@GetMapping("get")
	public ResponseEntity<Intestazione> get() {
		return new ResponseEntity<>(intestazione, HttpStatus.OK);
	}
	
}
