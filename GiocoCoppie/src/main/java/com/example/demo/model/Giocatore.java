package com.example.demo.model;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
public class Giocatore  {
	private String nome="";
	private int punti=0; // numeri di coppie
	
	public Giocatore() {
		
	}
	
	public Giocatore(String nome, int punti) {
		this.nome=nome;
		this.punti=punti;
	}

	public Giocatore(String nome) {
		this(nome, 0);
	}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public int getPunti() {
		return punti;
	}
	public void setPunti(int punti) {
		this.punti = punti;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Giocatore [nome=").append(nome).append(", punti=").append(punti).append("]");
		return builder.toString();
	}
	
	
}
