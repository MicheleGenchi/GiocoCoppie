package com.example.demo.model;

public class Carta  {
	private int id;
	private int val;
	private Seme seme;
	
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

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Carta [id=").append(id).append(", val=").append(val).append(", seme=").append(seme).append("]");
		return builder.toString();
	}
	
	
}
