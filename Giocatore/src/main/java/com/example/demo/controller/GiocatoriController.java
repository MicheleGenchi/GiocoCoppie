package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.SessionScope;

import com.example.demo.model.Giocatore;
import com.example.demo.model.Giocatori;

@RestController
@SessionScope
@RequestMapping(value = "giocatore")
public class GiocatoriController {

	private static final Logger LOGGER = LoggerFactory.getLogger(GiocatoriController.class);

	@Autowired
	private Giocatori giocatori;

	@PostMapping("aggiungi")
	public ResponseEntity<?> aggiungiGiocatore(@RequestBody Giocatore giocatore) {

		LOGGER.info("payload : " + giocatore);

		// 1. Corretto l'errore logico sul controllo dell'esistenza
		boolean giaEsistente = !giocatori.aggiungiGiocatore(giocatore);

		if (giaEsistente) {
			LOGGER.info("Il giocatore esiste id {}", giocatore.getId());
			// 2. Modificato HttpStatus da NOT_IMPLEMENTED a CONFLICT
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("Il giocatore con id {" + giocatore.getId() + "} esiste già");
		}

		// 3. Rimossa la doppia inizializzazione della mappa
		Map<String, Object> risposta = new HashMap<>();
		risposta.put("giocatore", giocatore);
		risposta.put("Risposta", "CREATO");

		return ResponseEntity.status(HttpStatus.CREATED)
				.body(risposta);
	}

	@PostMapping("cerca")
	public ResponseEntity<?> getGiocatore(@RequestBody Map<String, Object> payload) {
		Giocatore trovato = null;
		// LOGGER.info("payload : " + payload);
		LOGGER.info("payload : " + payload);
		try {
			// 1. Controllo e conversione dell'ID o del Nome
			if (payload.containsKey("id") && payload.get("id") != null) {
				Object idObj = payload.get("id");
				Optional<Integer> idOpt = Optional.of(idObj)
						.map(id -> {
							if (id instanceof Number) {
								return ((Number) id).intValue();
							} else {
								try {
									return Integer.parseInt(id.toString());
								} catch (NumberFormatException e) {
									return null;
								}
							}
						});

				if (idOpt.isPresent()) {
					trovato = (Giocatore) giocatori.cercaXid(idOpt.get());
				} else {
					return ResponseEntity.badRequest().body("L'ID fornito non è un numero valido.");
				}

			} else if (payload.containsKey("nome") && payload.get("nome") != null) {
				trovato = (Giocatore) giocatori.cercaXnome(payload.get("nome").toString());
			} else {
				return ResponseEntity.badRequest().body("Parametri di ricerca mancanti (inserire id o nome).");
			}

			// 2. Se non ha lanciato eccezioni, il giocatore è stato trovato
			LOGGER.info("Giocatore trovato con successo: {}", trovato);
			return ResponseEntity.ok(trovato);

		} catch (java.util.NoSuchElementException e) {
			// 3. Intercettiamo l'eccezione lanciata da orElseThrow() e restituiamo 404
			LOGGER.info("Ricerca fallita: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PutMapping("aggiornaPunteggio")
	public ResponseEntity<?> aggiornaPunteggio(@RequestBody Map<String, Object> payload) {
		Giocatore trovato = null;
		// LOGGER.info("payload : " + payload);
		LOGGER.info("payload : " + payload);
		ResponseEntity<?> chiamata = getGiocatore(payload);
		if (chiamata.getStatusCodeValue() != 200) {
			LOGGER.info("Giocatore non trovato  {}", payload);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Giocatore non trovato");
		}

		trovato = (Giocatore) chiamata.getBody();
		trovato.setPunti(trovato.getPunti() + 1);
		LOGGER.info("Giocatore trovato  {}", payload);
		return ResponseEntity.status(HttpStatus.OK).body(trovato);
	}

	@GetMapping("lista")
	public ResponseEntity<?> lista() {
		List<Giocatore> lista = new ArrayList<Giocatore>();
		if (!giocatori.getLista().isEmpty()) {
			lista = giocatori.getLista().stream()
					.map(g -> new Giocatore(g.getId(), g.getNome(), g.getPunti()))
					.collect(Collectors.toList());
			LOGGER.info("lista = []", lista);
			return ResponseEntity.status(HttpStatus.OK).body(lista);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Non ci sono giocatori");
	}

	@DeleteMapping("azzeraLista")
	public ResponseEntity<String> azzeraLista() {
		// 1. Controllo di sicurezza per evitare NullPointerException
		if (giocatori == null || giocatori.getLista() == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Errore: la risorsa giocatori o la lista non sono inizializzate.");
		}

		try {
			// 2. Svuota la lista (funziona anche se la lista è già vuota)
			giocatori.getLista().clear();
			return ResponseEntity.ok("La lista dei giocatori è stata svuotata con successo.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Si è verificato un errore imprevisto durante lo svuotamento.");
		}
	}
}
