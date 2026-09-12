package com.example.demo.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class Napoletane  {
	private List<Carta> carte;
	
	public Napoletane() {
		carte=new ArrayList<>();
		for (int s=1; s<=4; s++) 
			for (int v=1; v<=10; v++) 
				carte.add(new Carta(((s-1)*10+v)-1, v, Seme.get(s)));
	}
	
	public Carta trovaCarta(int idx) {
		return carte.stream().filter(a -> a.getId()==idx)
		.findFirst()
		.orElseThrow(() -> new IllegalArgumentException("Carta con ID " + idx + " non trovata"));
	}

	public List<Carta> getCarte() {
		return carte;
	}

	public void setCarte(List<Carta> carte) {
		this.carte = carte;
	}

	public Boolean mescola() {
		try {
			Collections.shuffle(this.getCarte());
			for (int i=0; i<40; i++) 
				this.getCarte().get(i).setId(i);
			return true;
		} catch (Exception e) {
			return false;
		}
		// for (int i=0; i<40; i++) {
		// 	this.getCarte().get(i).setId(i);
		// }
	}

	public Boolean eliminaCarta(Integer idCarta) {
		return carte.removeIf(a -> a.getId() == idCarta);
	}
}
