package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

@Component
@SessionScope
public class Giocatori {
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
