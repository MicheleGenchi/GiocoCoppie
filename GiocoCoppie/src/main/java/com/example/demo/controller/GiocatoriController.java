package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	private static Logger LOGGER = LoggerFactory.getLogger(GiocatoriController.class);
	
	@GetMapping("aggiungi/{id}/{nome}")
	public ResponseEntity<String> aggiungiGiocatore(@PathVariable(value = "id") int id, @PathVariable(value = "nome") String nome) {
		Giocatore giocatore=new Giocatore(id,nome,0);
		if (giocatori.getLista().add(giocatore))
			return new ResponseEntity<>("Giocatore "+nome+" aggiunto!", HttpStatus.OK);
		return new ResponseEntity<>("Giocatore "+nome+" non aggiunto!", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("cerca/{id}")
	public ResponseEntity<Giocatore> getGiocatore(@PathVariable(value = "id") int id) {
		Giocatore giocatore=null;
		giocatore=giocatori.getLista().get(id);
		if (giocatore!=null)
			return new ResponseEntity<>(giocatore, HttpStatus.OK);
		return new ResponseEntity<>(giocatore, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("aggiornaPunteggio/{id}")
	public ResponseEntity<Boolean> aggiornaPunteggio(@PathVariable(value = "id") int id) {
		Giocatore giocatore=null;
		giocatore=giocatori.getLista().get(id);
		if (giocatore!=null) {
			giocatore.setPunti(giocatori.getLista().get(id).getPunti()+1);
			return new ResponseEntity<>(true, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("lista")
	public ResponseEntity<Giocatori> lista() {
		LOGGER.debug(new StringBuilder().append(giocatori.getLista().stream().allMatch(n->(n==n))).toString());
		if (giocatori.getLista().size()>0)
			return new ResponseEntity<>(giocatori, HttpStatus.OK);
		return new ResponseEntity<>(giocatori, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("azzeraLista")
	public ResponseEntity<String> azzeraLista() {
		giocatori.getLista().clear();
		if (giocatori.getLista().size()==0)
			return new ResponseEntity<>("lista giocatori cancellata", HttpStatus.OK);
		return new ResponseEntity<>("Non è stato possibile cancellare lista giocatori", HttpStatus.BAD_REQUEST);
	}
	
}
