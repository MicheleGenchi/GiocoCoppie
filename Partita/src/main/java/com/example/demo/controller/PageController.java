package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.ResourceAccessException;

import com.example.demo.model.Intestazione;

@Controller
public class PageController {

	private static final Logger LOGGER = LoggerFactory.getLogger(PageController.class);
	@Value("${giococoppie.url.intestazione:http://host.docker.internal:7100/giococoppie/intestazione/get}")
	private String urlIntestazione;
	private final RestTemplate restTemplate;

	public PageController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	@GetMapping("/")
	public ModelAndView home(@ModelAttribute("messaggio") String messaggio) {
		ModelAndView modelAndView = new ModelAndView("home");
		valorizzaIntestazione(modelAndView);
		return modelAndView;
	}

	@GetMapping("vittoria")
	public ModelAndView vittoria(@ModelAttribute("messaggio") String messaggio) {
		ModelAndView modelAndView = new ModelAndView("vittoria");
		valorizzaIntestazione(modelAndView);
		return modelAndView;
	}

	/**
	 * Metodo privato di supporto per centralizzare la chiamata REST e la gestione
	 * degli errori.
	 */
	private void valorizzaIntestazione(ModelAndView modelAndView) {
		try {
			Intestazione risposta = restTemplate.getForObject(urlIntestazione, Intestazione.class);
			modelAndView.addObject("intestazione", risposta);

		} catch (RestClientResponseException ex) {
			LOGGER.error("Errore HTTP: {} - {}", ex.getRawStatusCode(), ex.getResponseBodyAsString());
			modelAndView.addObject("errore", "Errore di comunicazione con il servizio esterno.");

			Intestazione fallback = new Intestazione();
			modelAndView.addObject("intestazione", fallback);

		} catch (ResourceAccessException ex) {
			LOGGER.error("Impossibile raggiungere l'altro container: {}", ex.getMessage());
			modelAndView.addObject("errore", "Servizio momentaneamente non raggiungibile.");

			// Aggiunto fallback anche qui per evitare NullPointerException nella view
			Intestazione fallback = new Intestazione();
			modelAndView.addObject("intestazione", fallback);
		}
	}
}
