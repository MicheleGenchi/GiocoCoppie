package com.example.demo.model;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.springframework.stereotype.Component;

@Component
public class Intestazione implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String nome = "Michele";
	private String cognome = "Genchi";
	private String dataCorrente = new SimpleDateFormat("EEEE dd-MMM-yyyy").format(new Date());
	private String lingua = Locale.getDefault().getDisplayLanguage();

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public String getDataCorrente() {
		return dataCorrente;
	}

	public void setDataCorrente(String dataCorrente) {
		this.dataCorrente = dataCorrente;
	}

	public String getLingua() {
		return lingua;
	}

	public void setLingua(String lingua) {
		this.lingua = lingua;
	}
}
