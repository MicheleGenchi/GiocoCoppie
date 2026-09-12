package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.model.Giocatori;
import com.example.demo.model.Intestazione;

@Controller
@SessionScope
public class PageController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PageController.class);

	Logger logger = LoggerFactory.getLogger(PageController.class);

	@GetMapping("/")
	public ModelAndView home(@ModelAttribute String messaggio) { 
		//chiamata a intestazione
		Intestazione intestazione = new Intestazione();
		Map<String, Object> myMap=new HashMap<>();
		myMap.put("dataCorrente", intestazione.getDataCorrente());
		myMap.put("mioNome", intestazione.getCognome()+" "+intestazione.getNome());
		myMap.put("lingua", intestazione.getLingua());
		myMap.put("messaggio", messaggio);
		return new ModelAndView("home", myMap);
	}
	
	@GetMapping("vittoria")
	public ModelAndView vittoria(@ModelAttribute String messaggio) {
		//chiamata a intestazione
		Intestazione intestazione=null;		
		Map<String, Object> myMap=new HashMap<>();
		myMap.put("dataCorrente", intestazione.getDataCorrente());
		myMap.put("mioNome", intestazione.getCognome()+" "+intestazione.getNome());
		myMap.put("lingua", intestazione.getLingua());
		myMap.put("messaggio", messaggio);

		// chiamata a giocatore
		Giocatori giocatori=null;
		myMap.put("giocatori", giocatori);
		return new ModelAndView("vittoria", myMap);
	}
}
