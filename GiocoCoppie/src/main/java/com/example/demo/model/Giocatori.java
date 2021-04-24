package com.example.demo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class Giocatori implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<Giocatore> lista;
	
	public Giocatori() {
		lista=new ArrayList<>();
	}

	public List<Giocatore> getLista() {
		return lista;
	}

	public void setLista(List<Giocatore> lista) {
		this.lista = lista;
	}

	
}
