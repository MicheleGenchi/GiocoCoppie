package com.example.demo.model;

public class Carta  {
	private int id;
	private int val;
	private Seme seme;
	private String percorso;

	public Carta() {
	}
	
	public Carta(int id, int val, Seme seme) {
		this.id=id;
		this.val=val;
		this.seme=seme;
	}

	public int getVal() {
		return val;
	}

	public void setVal(int val) {
		this.val = val;
	}

	public Seme getSeme() {
		return seme;
	}

	public void setSeme(Seme seme) {
		this.seme = seme;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setPercorso(String percorso) {
		this.percorso=percorso;
	}

	public String getPercorso() {
			// 3. Costruzione del percorso dell'immagine
		StringBuilder calcola = new StringBuilder()
				//.append("resources/img/Carte_Napoletane/")
				.append(seme)
				.append("/")
				.append(val)
				.append(".jpg");
			percorso=calcola.toString();
		return percorso;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder
		.append("Carta [id=")
		.append(id)
		.append(", val=")
		.append(val)
		.append(", seme=")
		.append(seme)
		.append(percorso)
		.append("]");
		return builder.toString();
	}
	
	
}
