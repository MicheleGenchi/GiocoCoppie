package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

@Component
@SessionScope
public class Napoletane  {
	private List<Carta> carte;
	
	public Napoletane() {
		carte=new ArrayList<>();
		for (int s=1; s<=4; s++) 
			for (int v=1; v<=10; v++) 
				carte.add(new Carta(((s-1)*10+v)-1, v, Seme.get(s)));
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
