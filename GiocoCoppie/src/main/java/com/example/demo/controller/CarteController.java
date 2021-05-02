package com.example.demo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	private static Logger LOGGER = LoggerFactory.getLogger(GiocatoriController.class);
	
	@RequestMapping(value = "carteATerra")
	public ResponseEntity<List<Carta>> carteATerra() {
		if (napoletane.getCarte().size()>0)
			return new ResponseEntity<>(napoletane.getCarte(), HttpStatus.OK);
		return new ResponseEntity<>(napoletane.getCarte(), HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value = "mescolaCarte")
	public ResponseEntity<Boolean> mescolaCarte() {
		boolean mescolate=false;
		mescolate=napoletane.mescola();
		if (mescolate)
			return new ResponseEntity<>(mescolate, HttpStatus.OK);
		return new ResponseEntity<>(mescolate, HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value = "urlCarta/{idImage}")
	public ResponseEntity<String> getUrlCarta(@PathVariable(value = "idImage") Integer idImage) {
		Carta carta=null;
		carta=napoletane.getCarte().get(idImage-1);
		if (carta!=null)
			return new ResponseEntity<>("resources/img/Carte_Napoletane/"+carta.getSeme()+"/"+carta.getVal()+".jpg", HttpStatus.OK);
		return new ResponseEntity<>("Immagine carta non trovata", HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value = "elimina/{idCarta}")
	public ResponseEntity<String> eliminaCarta(@PathVariable(value = "idCarta") Integer idCarta) {
		Carta carta=null;
		carta=napoletane.getCarte().remove(idCarta-1);
		if (carta!=null)
			return new ResponseEntity<>(carta.getVal()+" di "+carta.getSeme(), HttpStatus.OK);
		return new ResponseEntity<>("La carta non può essere eliminata", HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value = "carta/{idImage}")
	public ResponseEntity<Carta> getCarta(@PathVariable(value = "idImage") Integer idImage) {
		Carta carta=null;
		carta=napoletane.getCarte().get(idImage-1);
		if (carta!=null)
			return new ResponseEntity<>(carta, HttpStatus.OK);
		return  new ResponseEntity<>(carta, HttpStatus.BAD_REQUEST);
	}
	

	@RequestMapping(value = "confrontoCarte/{carta1}/{carta2}")
	public ResponseEntity<Boolean> confrontoCarte(@PathVariable(value="carta1") Integer carta1, 
			@PathVariable(value="carta2") Integer carta2) {
		Carta primaCarta=null;
		Carta secondaCarta=null;
		primaCarta=napoletane.getCarte().get(carta1-1);
		secondaCarta=napoletane.getCarte().get(carta2-1);
		if (primaCarta!=null & secondaCarta!=null) {
			if (primaCarta.getVal()==secondaCarta.getVal())
				return new ResponseEntity<>(true, HttpStatus.OK);
			return new ResponseEntity<>(false, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
	}
	
}
