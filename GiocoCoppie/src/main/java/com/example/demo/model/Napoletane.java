package com.example.demo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

@Component
@SessionScope
public class Napoletane implements CarteManager, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4748335644739141887L;
	private List<Carta> carte;
	
	public Napoletane() {
		carte=new ArrayList<>();
		for (int s=1; s<=4; s++) 
			for (int v=1; v<=10; v++) 
				carte.add(new Carta(((s-1)*10+v)-1, v, Seme.get(s)));
	}
	
	@Override
	public Boolean mescola() {
		Collections.shuffle(carte);
		for (int i=0; i<40; i++) {
			carte.get(i).setId(i);
		}
		return true;
	}
	
	public Carta trovaCarta(int idx) {
		return carte.stream().filter(a -> a.getId()==idx).findFirst().get();
	}

	public List<Carta> getCarte() {
		return carte;
	}

	public void setCarte(List<Carta> carte) {
		this.carte = carte;
	}
}
