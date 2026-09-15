package com.example.demo.controller;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.ResourceAccessException;

import com.example.demo.model.Giocatori;
import com.example.demo.model.Intestazione;

@Controller
@SessionScope
public class PageController {

	private static final Logger LOGGER = LoggerFactory.getLogger(PageController.class);
	private static final String URL_INTESTAZIONE = "http://intestazione:8080/intestazione/get";

	public Intestazione intestazione(
			String nome,
			String cognome,
			String lingua,
			String appTitolo,
			String appDescrizione,
			String appVersione,
			String dataCorrente) {
		return null; 
	}

	@GetMapping("/")
	public ModelAndView home(@ModelAttribute("messaggio") String messaggio) {
		ModelAndView modelAndView = new ModelAndView("home");

		try {
			RestTemplate restTemplate = new RestTemplate();
			Intestazione risposta = restTemplate.getForObject(URL_INTESTAZIONE, Intestazione.class);
			modelAndView.addObject("intestazione", risposta);

		} catch (RestClientResponseException ex) {
			System.err.println("Errore HTTP: " + ex.getRawStatusCode() + " - " + ex.getResponseBodyAsString());
			modelAndView.addObject("errore", "Errore di comunicazione con il servizio esterno.");
			
			// SOLUZIONE ALTERNATIVA: Usiamo il costruttore vuoto esistente
			Intestazione fallback = new Intestazione();
			// Se la classe ha un setter per il testo (es. setAppDescrizione o simile), puoi usarlo qui:
			// fallback.setAppDescrizione("Dato alternativo di recupero"); 
			
			modelAndView.addObject("intestazione", fallback);

		} catch (ResourceAccessException ex) {
			System.err.println("Impossibile raggiungere l'altro container: " + ex.getMessage());
			modelAndView.addObject("errore", "Servizio momentaneamente non raggiungibile.");
		}

		return modelAndView;
	}

	@GetMapping("vittoria")
	public ModelAndView vittoria(@ModelAttribute("messaggio") String messaggio) {
		ModelAndView modelAndView = new ModelAndView("vittoria");

		try {
			RestTemplate restTemplate = new RestTemplate();
			Intestazione risposta = restTemplate.getForObject(URL_INTESTAZIONE, Intestazione.class);
			modelAndView.addObject("intestazione", risposta);

		} catch (RestClientResponseException ex) {
			System.err.println("Errore HTTP: " + ex.getRawStatusCode() + " - " + ex.getResponseBodyAsString());
			modelAndView.addObject("errore", "Errore di comunicazione con il servizio esterno.");
			
			// SOLUZIONE ALTERNATIVA: Usiamo il costruttore vuoto esistente
			Intestazione fallback = new Intestazione();
			// fallback.setAppDescrizione("Dato alternativo di recupero");
			
			modelAndView.addObject("intestazione", fallback);

		} catch (ResourceAccessException ex) {
			System.err.println("Impossibile raggiungere l'altro container: " + ex.getMessage());
			modelAndView.addObject("errore", "Servizio momentaneamente non raggiungibile.");
		}

		return modelAndView;
	}
}
