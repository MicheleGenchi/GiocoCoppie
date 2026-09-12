package com.example.demo.model;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import org.springframework.beans.factory.annotation.Value;
import java.util.Date;
import java.util.Locale;

import org.springframework.stereotype.Component;

@Component
public class Intestazione implements Serializable {

// valori recuperati da application.properties
	@Value("${app.titolo}")
    private String appTitolo;

    @Value("${app.descrizione}")
    private String appDescrizione;

	@Value("${app.versione}")
    private String appVersione;

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String nome = "Michele";
	private String cognome = "Genchi";
	// Specifica Locale.ITALY per avere "italiano" anziché la lingua del server
	private String lingua = Locale.ITALY.getDisplayLanguage(Locale.ITALY);
	
	// Specifica Locale.ITALY nel SimpleDateFormat per avere il giorno e il mese in italiano
	private String dataCorrente = new SimpleDateFormat("EEEE dd-MMM-yyyy", Locale.ITALY).format(new Date());

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

	public void setAppDescrizione(String appDescrizione) {
		this.appDescrizione = appDescrizione;
	}

	public String getAppDescrizione() {
		return this.appDescrizione;
	}

	public String getAppTitolo() {
		return this.appTitolo;
	}

	public String getAppVersione() {
		return this.appVersione;
	}

}
