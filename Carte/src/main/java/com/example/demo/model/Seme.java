package com.example.demo.model;

public enum Seme {
	Denari, Spade, Bastoni, Coppe;

	static Seme get(int val) {
		Seme semeForNum;
		switch (val) {
			case 1: semeForNum=Seme.Denari;break;
			case 2: semeForNum=Seme.Spade;break;
			case 3: semeForNum=Seme.Bastoni;break;
			case 4: semeForNum=Seme.Coppe;break;
			default : semeForNum=Seme.Denari;
		}
		return semeForNum;
	}
	
	static Integer getVal(Seme seme) {
		Integer valForSeme;
		switch (seme) {
			case Denari: valForSeme=1;break;
			case Spade: valForSeme=2;break;
			case Bastoni: valForSeme=3;break;
			case Coppe: valForSeme=4;break;
			default : valForSeme=1;
		}
		return valForSeme;	
	}
	
	/*
	@Override
	public String toString() {
		return this.name();
	}
	*/
}
