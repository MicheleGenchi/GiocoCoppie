package com.example.demo.model;

public class Giocatore {
	private String nome;
	private int punti; // numeri di coppie
	
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
}
