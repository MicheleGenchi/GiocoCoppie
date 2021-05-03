package com.example.demo.model;

public class Giocatore  {
	private int id;
	private String nome="";
	private int punti=0; // numeri di coppie
	
	public Giocatore() {
		
	}
	
	public Giocatore(int id, String nome, int punti) {
		this.id=id;
		this.nome=nome;
		this.punti=punti;
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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Giocatore [id=").append(id).append(", nome=").append(nome).append(", punti=").append(punti)
				.append("]");
		return builder.toString();
	}
	
}
