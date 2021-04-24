package com.example.demo.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class Napoletane implements CarteManager {
	private List<Carta> carte;
	
	public Napoletane() {
		carte=new ArrayList<>();
		for (int s=1; s<=4; s++)
			for (int v=1; v<=10; v++)
				carte.add(new Carta(v, Seme.get(s)));	
	}
	
	@Override
	public void mescola() {
		Set<Carta> carteMescolate=new HashSet<>();
		for (Carta carta: this.carte) { //carta[0] is null perciò utilizzo ciclo con indice i
			carteMescolate.add(carta);
		}
		this.carte=new ArrayList<>(carteMescolate);
	}

	public List<Carta> getCarte() {
		return carte;
	}

	public void setCarte(List<Carta> carte) {
		this.carte = carte;
	}
}
