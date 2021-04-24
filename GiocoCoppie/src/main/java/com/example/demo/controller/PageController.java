package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.model.Giocatori;
import com.example.demo.model.Intestazione;

@Controller
@RequestMapping("GiocoCoppie")
public class PageController {
	
	@Autowired 
	Intestazione intestazione;
	@Autowired
	Giocatori giocatori;
	
	Logger logger = LoggerFactory.getLogger(PageController.class);

	@GetMapping("homepage")
	public ModelAndView home(@ModelAttribute String messaggio) {
		Map<String, Object> myMap=new HashMap<>();
		myMap.put("dataCorrente", intestazione.getDataCorrente());
		myMap.put("mioNome", intestazione.getCognome()+" "+intestazione.getNome());
		myMap.put("lingua", intestazione.getLingua());
		myMap.put("messaggio", messaggio);
		return new ModelAndView("home", myMap);
	}
	
	@GetMapping("vittoria")
	public ModelAndView vittoria(@ModelAttribute String messaggio) {
		Map<String, Object> myMap=new HashMap<>();
		myMap.put("dataCorrente", intestazione.getDataCorrente());
		myMap.put("mioNome", intestazione.getCognome()+" "+intestazione.getNome());
		myMap.put("lingua", intestazione.getLingua());
		myMap.put("messaggio", messaggio);
		myMap.put("giocatori", giocatori);
		return new ModelAndView("vittoria", myMap);
	}
}
