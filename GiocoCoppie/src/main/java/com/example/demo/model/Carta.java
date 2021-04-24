package com.example.demo.model;

public class Carta {
	private int val;
	private Seme seme;
	
	public Carta() {
	}
	
	public Carta(int val, Seme seme) {
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

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Carta [val=").append(val).append(", seme=").append(seme).append("]");
		return builder.toString();
	}
	
	
}
