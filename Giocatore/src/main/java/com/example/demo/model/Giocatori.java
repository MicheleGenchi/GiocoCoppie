package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Component;
//import org.springframework.web.context.annotation.SessionScope;

@Component 
public class Giocatori {
	private List<Giocatore> lista = new ArrayList<>(); 
	
	public Giocatori() {
		lista=new ArrayList<>();
	}

	public List<Giocatore> getLista() {
		return lista;
	}

	public void setLista(List<Giocatore> lista) {
		this.lista = lista;
	}

	public boolean aggiungiGiocatore(Giocatore giocatore) {
		return lista.add(giocatore);
	}

	public Giocatore cercaXnome(String nome) {
		Giocatore giocatore=lista.stream()
				.filter(e -> e.getNome().equalsIgnoreCase(nome))
				.findFirst()
				.orElseThrow(() -> new NoSuchElementException("Giocatore non trovato: " + nome));
		return giocatore;
	}

	public Giocatore cercaXid(int id) {
		Giocatore giocatore=lista.stream()
				.filter(e -> e.getId()==id)
				.findFirst()
				.orElseThrow(() -> new NoSuchElementException("Giocatore non trovato: " + id));
		return giocatore;
	}

}
