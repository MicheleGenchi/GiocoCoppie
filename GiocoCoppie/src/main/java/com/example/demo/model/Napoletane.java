package com.example.demo.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class Napoletane implements CarteManager {
	private List<Carta> carte=new ArrayList<>();
	
	public Napoletane() {
		for (int s=1; s<=4; s++)
			for (int v=1; v<=10; v++)
				carte.add(new Carta(v, Seme.get(s)));	
	}
	
	@Override
	public Boolean mescola() {
		Collections.shuffle(carte);
		return true;
	}

	public List<Carta> getCarte() {
		return carte;
	}

	public void setCarte(List<Carta> carte) {
		this.carte = carte;
	}
}
