package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Giocatore;
import com.example.demo.model.Giocatori;

@RestController
@RequestMapping(value="giocatore")
public class GiocatoriController {
	
	@Autowired
	Giocatori giocatori;

	
	@GetMapping("aggiungi/{nome}")
	public ResponseEntity<String> aggiungiGiocatore(@PathVariable(value = "nome") String nome) {
		Giocatore giocatore=new Giocatore(nome);
		giocatori.getLista().add(giocatore);
		return new ResponseEntity<>("Giocatore "+nome+" aggiunto!", HttpStatus.OK);
	}

	@GetMapping("cerca/{id}")
	public ResponseEntity<Giocatore> getGiocatore(@PathVariable(value = "id") int id) {
		return new ResponseEntity<>(giocatori.getLista().get(id), HttpStatus.OK);
	}
	
	@GetMapping("aggiornaPunteggio/{id}")
	public ResponseEntity<Boolean> aggiornaPunteggio(@PathVariable(value = "id") int id) {
		giocatori.getLista().get(id).setPunti(giocatori.getLista().get(id).getPunti()+1);
		return new ResponseEntity<>(true, HttpStatus.OK);
	}
	
	
	@GetMapping("lista")
	public ResponseEntity<Giocatori> lista() {
		return new ResponseEntity<>(giocatori, HttpStatus.OK);
	}
	
	@GetMapping("azzeraLista")
	public ResponseEntity<String> azzeraLista() {
		giocatori.getLista().clear();
		return new ResponseEntity<>("lista giocatori cancellata", HttpStatus.OK);
	}
	
}
