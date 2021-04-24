package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Carta;
import com.example.demo.model.Napoletane;

@RestController
@RequestMapping("mazzo")
public class CarteController {
	
	@Autowired
	Napoletane napoletane;
	
	
	@RequestMapping(value = "mescolaCarte")
	public ResponseEntity<Napoletane> mescolaCarte() {
		napoletane.mescola();
		return new ResponseEntity<Napoletane>(napoletane, HttpStatus.OK);
	}
	
	@RequestMapping(value = "urlCarta/{idImage}")
	public ResponseEntity<String> getUrlCarta(@PathVariable(value = "idImage") Integer idImage) {
		Carta carta=napoletane.getCarte().get(idImage-1);
		return new ResponseEntity<String>("/resources/img/Carte_Napoletane/"+carta.getSeme()+"/"+carta.getVal()+".jpg", HttpStatus.OK);
	}
	
	@RequestMapping(value = "carta/{idImage}")
	public ResponseEntity<Carta> getCarta(@PathVariable(value = "idImage") Integer idImage) {
		Carta carta=napoletane.getCarte().get(idImage-1);
		return new ResponseEntity<Carta>(carta, HttpStatus.OK);
	}
	

	@RequestMapping(value = "confrontoCarte/{carta1}/{carta2}")
	public ResponseEntity<Boolean> confrontoCarte(@PathVariable(value="carta1") Integer carta1, 
			@PathVariable(value="carta2") Integer carta2) {
		Carta primaCarta=napoletane.getCarte().get(carta1-1);
		Carta secondaCarta=napoletane.getCarte().get(carta2-1);
		if (primaCarta.getVal() == secondaCarta.getVal())
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}
	
}