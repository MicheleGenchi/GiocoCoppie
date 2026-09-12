package com.example.demo.controller;

import java.lang.invoke.MethodHandles;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.http.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.demo.model.Carta;
import com.example.demo.model.Napoletane;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@SessionScope
@RequestMapping("mazzo")
public class CarteController {

	private static final Logger LOGGER = LoggerFactory.getLogger(CarteController.class);
	
	@Autowired
	Napoletane napoletane;

	@GetMapping("carteATerra")
	public ResponseEntity<List<Carta>> carteATerra() {
		if (napoletane.getCarte().size() <= 0) 
			return new ResponseEntity<>(napoletane.getCarte(), HttpStatus.BAD_REQUEST);

		LOGGER.info("\nMazzo {}", napoletane.getCarte());
		return new ResponseEntity<>(napoletane.getCarte(), HttpStatus.OK);
	}

	@GetMapping("quanteCarteATerra")
	public ResponseEntity<Integer> quanteCarteATerra() {
		if (napoletane.getCarte().size() > 0)
			return new ResponseEntity<>(napoletane.getCarte().size(), HttpStatus.OK);
		return new ResponseEntity<>(napoletane.getCarte().size(), HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "mescolaCarte")
	public ResponseEntity<?> mescolaCarte() {
		boolean mescolate = napoletane.mescola();
		
		if (!mescolate) 
			return new ResponseEntity<>("Non mescolate", HttpStatus.BAD_REQUEST);
			
		LOGGER.info("Carte Mescolate {}", napoletane.getCarte());
		return new ResponseEntity<>("Mescolate", HttpStatus.OK);
	}

	@PostMapping(value = "carta", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getCarta(@RequestBody Map<String, Integer> payload ) {
		// TODO : considerare la possibilità di gestire le validazioni @Valid sulla RequestBody 
		Integer id=payload.get("id");

		// Controllo di sicurezza se la chiave "id" manca nel JSON
		if (id == null) {
			return ResponseEntity.badRequest().body("La chiave 'id' è obbligatoria nel payload JSON.");
		}

		// 1. Cerca la carta
		Carta carta = napoletane.trovaCarta(id);

		// 2. Controllo di sicurezza se la carta non esiste nel database/lista
		if (carta == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Immagine carta non trovata");
		}

		// 3. Costruzione del percorso dell'immagine
		StringBuilder percorso = new StringBuilder()
				.append("/resources/img/Carte_Napoletane/")
				.append(carta.getSeme())
				.append("/")
				.append(carta.getVal())
				.append(".jpg");

		// 4. Conversione in Map e aggiunta del percorso dell'immagine
		ObjectMapper mapper = new ObjectMapper();
		@SuppressWarnings("unchecked")
		Map<String, String> risposta = mapper.convertValue(carta, Map.class);
		risposta.put("percorso", percorso.toString()); // Convertito in stringa per pulizia JSON

		LOGGER.info("Carta {}", risposta);

		return ResponseEntity.ok(risposta);
	}

	@GetMapping("eliminaCarta/{idCarta}")
	public ResponseEntity<String> eliminaCarta(@PathVariable(value = "idCarta") int idCarta) {
		Boolean risposta = napoletane.eliminaCarta(idCarta);
		String msg=risposta?"Eliminata":"Non elimintata";
		
		if (!risposta)
			return new ResponseEntity<>(msg, HttpStatus.NOT_FOUND);
		
		LOGGER.info("Carta {} ", idCarta+msg);
		return new ResponseEntity<>(msg, HttpStatus.OK);
	}

	@GetMapping("confrontoCarte/{carta1}/{carta2}")
	public ResponseEntity<Boolean> confrontoCarte(@PathVariable(value = "carta1") Integer carta1,
			@PathVariable(value = "carta2") Integer carta2) {
		Carta primaCarta = null;
		Carta secondaCarta = null;
		primaCarta = napoletane.trovaCarta(carta1);
		secondaCarta = napoletane.trovaCarta(carta2);

		LOGGER.info("Prima carta {}", primaCarta);
		LOGGER.info("Seconda carta {}", secondaCarta);

		if (primaCarta != null & secondaCarta != null) {
			LOGGER.info("le due carte sono "+ (primaCarta.getVal() == secondaCarta.getVal()?"uguali":"diverse"));
			if (primaCarta.getVal() == secondaCarta.getVal())
				return new ResponseEntity<>(true, HttpStatus.OK);
			return new ResponseEntity<>(false, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}

	// Funzione di supporto per controllare IP interni
	private boolean isInternalNetwork(String host) {
		return host.equals("localhost") ||
				host.equals("127.0.0.1") ||
				host.startsWith("192.168.") ||
				host.startsWith("10.");
	}
}
