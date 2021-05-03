/**
 * 
 */
var numeroPartecipanti = 0; // numero giocatori;
var carteATerra=40;
var coppia=1;
var primaCarta=0;
var secondaCarta=0;
var punti=0;
var giocatore=0;

function preparaTavolo() {
	// alert("test!test!test!")
	$("#avvia").remove();
	$("#listaGiocatori").remove();
	$("#tavolo").remove();
	$("#divAvvia").remove();
	$(".linea").after("<div id='carte' class='container'></div>");
	var riga;
	for (riga = 1; riga <= 4; riga++) {
		var i;
		$("#carte").append("<div class='col sm-8 text-center' id='riga" + riga	+ "'></div>");
		for (col = 1; col <= 10; col++) {
			$("#riga" + riga).append("<img class='carte' id='" + (((riga-1)*10+col)-1)
									+ "' src='resources/img/retro-carta.jpg' alt='coperta' Height='88' width='60' />");
		}
	}
}

function lineaBefore(element) {
	$(element)
			.before(
					"<hr class='linea' align='center' size='1' color='blue' noshade />");
}

function mescola() {
	var deferred=$.Deferred();
	$.get("mazzo/mescolaCarte", function(mescolate, status) {
		switch (mescolate) {
			case true : return deferred.resolve("carte mescolate!");break;
			case false : return deferred.reject("carte non mescolate!");break;
		}
	});
	return deferred.promise();
	
}

function nGiocatori() {
	$("#tavolo").append("<div class='container'><div id='nGiocatori' class='input-group-prepend'></div></div>");
	$("#tavolo #nGiocatori").append("<label for='inputNumeroGiocatori' class='input-group-text'>Giocatori</label>");
	$("#nGiocatori .input-group-text").after("<select class='col-m-4' id='inputNumeroGiocatori' aria-label='Example select with button addon'></Select>");
	$("#inputNumeroGiocatori").append("<option selected>Choose...</option>");
	for (i = 1; i <= 10; i++) {
		$("#inputNumeroGiocatori").append(
				"<option value='" + i + "'>" + i + "</option>");
	}
}

function inserimento_NomiGiocatori() {
	var deferred=$.Deferred();
	if (!(esiste("div.container#listaGiocatori"))) {
		$("#tavolo").append("<div class='container' id='listaGiocatori'></div>");
		var i;
		for (i = 1; i <= numeroPartecipanti; i++) {
			$('#listaGiocatori').append("<div class='row'><div class='input-group-prepend' id='divGiocatore" + i + "'></div></div>");
			$("#divGiocatore" + i).append("<label for='Giocatore" + i
							+ "' class='input-group-text'>Giocatore n." + i
							+ "</label>");
			$("#divGiocatore" + i).append("<input type='text' id='Giocatore" + i
							+ "' class='form-control' placeholder='Giocatore" + i
							+ "' aria-label='Giocatore" + i
							+ "' aria-describedby='basic-addon1'></input>");
		}
		$("#listaGiocatori").after("<div class='col text-center' id='divGioca'></div>");
		$("#divGioca").append("<button id='gioca' class='btn btn-primary'>CONFERMA GIOCATORI</button>");
	} 
	return deferred.resolve("input box per giocatori creati!");
}

function esiste(selettore) {
	  if ($(selettore).length) return true;
	  else return false;
	}

function aggiungiGiocatori() {
	aggiungiGiocatori=false;
	for (i = 1; i <= numeroPartecipanti; i++) {
		var giocatore = $("#Giocatore" + i).val();
		if (giocatore=="") giocatore=$("#Giocatore" + i).attr("Placeholder");
		// alert(giocatore);
		$.get("giocatore/aggiungi/" + (i-1) +"/"+giocatore, function(dati, status) {
		});
	}
	aggiungiGiocatori=true;
	return aggiungiGiocatori; 
}

function azzeraListaGiocatori() {
	var deferred=$.Deferred();
	$.get("giocatore/azzeraLista", function(dati, status) {
		switch (status) {
		case "success" : return deferred.resolve("lista giocatori pulita");
		case "error" : return deferred.reject("lista giocatori non azzerata");
		}
	});
	return deferred.promise();
}

function inserimento_giocatori() {
	var deferred=$.Deferred();
	$.when(nGiocatori()).done(function() {
		$("#inputNumeroGiocatori").change(function() {
			$("#listaGiocatori").remove();
			$("#divGioca").remove();
			numeroPartecipanti = $("#inputNumeroGiocatori").val();
			$.when(inserimento_NomiGiocatori()).done(function(msgInputBoxCreati) {
				console.log(msgInputBoxCreati);
				$.when(azzeraListaGiocatori()).done(function(msgListaVuota) {
					console.log(msgListaVuota);
					return deferred.resolve();
				});
			});
		});
	});
	return deferred.promise();
}

function selezioneCarta(carta) {
	var deferred = $.Deferred();
	var idImage = parseInt(carta.attr("id"));
	var url = "mazzo/urlCarta/" + idImage;
	var msg = "";
	$.get(url, function(urlCarta, status) {
		switch (status) {
		    case "success" : 	
       			if (carta.attr("alt")!="girata") {
					carta.attr("alt", "girata");
					carta.attr("src", urlCarta);
					$.get("mazzo/carta/" + idImage, function(cartaSelezionata, status) {
					});
					return deferred.resolve("Carta selezionata!");
				} else {
					return deferred.reject("carta già girata");
				}
			case "error" :
				return deferred.reject("Non è stato possibile caricare l'immagine della carta!");
			default : return deferred.promise();	
		}
	});
	return deferred.promise();
}

function le_due_carte_sono_uguali() {
	carteATerra=carteATerra-2;
	$.when(eliminaCarta(primaCarta)).done(
			$.when(eliminaCarta(secondaCarta)).done())
	.then(function() {
				$("#puntiGiocatore").disabled=false;
				$("#puntiGiocatore").val(punti);
				$("#puntiGiocatore").disabled=true;
				$.get("giocatore/aggiornaPunteggio/"+giocatore, function (dati, status) {
					console.log("Giocatore "+giocatore+(dati==true?"  Punteggio aggiornato!":"  Punteggio invariato"));
					aggiornaCampiGiocatore();
				});
	});
}

function gioca() {
	var deferred=$.Deferred();
	$(".carte").click(function(e) {
		console.log("e = "  + e);
		var cartaCliccata=$(this);
		$.when(selezioneCarta(cartaCliccata)).done(function(msg) {
			console.log("......."+msg);
			switch (coppia) {
				case 1:primaCarta=parseInt(cartaCliccata.attr("id"));console.log("prima carta "+primaCarta);coppia++;break;
				case 2:secondaCarta=parseInt(cartaCliccata.attr("id"));console.log("seconda carta "+secondaCarta);coppia++;
					$.getJSON("mazzo/confrontoCarte/"+(primaCarta)+"/"+(secondaCarta), function (confronto, status) {
						if (status="success") {
							coppia=1;
							switch (confronto) {
								case true :
									var wait=confirm("le due carte sono uguali!");
									if (wait) {
										le_due_carte_sono_uguali();
										if (carteATerra<=0) // alert("HAI VINTO! carteATerra = "+carteATerra);
											return deferred.resolve("Partita finita!");
									};break;
								case false :
									var wait=confirm("Mi spiace! Le due carte sono diverse...");
									if (wait) {
										copriCarta(primaCarta);
										copriCarta(secondaCarta);
										giocatoreSuccessivo();
									};break;
							}
						} else {
							console.log("Errore nel confronto della coppia di carte...");
						}
					});	
					break;
				}
		});
	});
	return deferred.promise();
}


function aggiornaCampiGiocatore() {
	$.getJSON("giocatore/cerca/"+giocatore, function(dati, status) {
		if (status=="success") {
			$("#nomeGiocatore").val(dati.nome);
			$("#puntiGiocatore").val(dati.punti);
			console.log("I dati del giocatore sono stati aggiornati!");
		} else {
			console.log("I dati del giocatore non sono stati recuperati!");
		}
	});
}

function giocatoreSuccessivo() {
	giocatore++;
    if (giocatore>=numeroPartecipanti)
    	giocatore=0;
	aggiornaCampiGiocatore();

}

function copriCarta(carta) {
	// alert("copri la carta "+carta.attr("class")+" "+carta.attr("id"));
	$(".carte#"+parseInt(carta)).attr("alt", "coperta");
	$(".carte#"+parseInt(carta)).attr("src", "resources/img/retro-carta.jpg");
}

function eliminaCarta(idxCarta) {
	var deferred=$.Deferred();
	$.get("mazzo/eliminaCarta/"+idxCarta, function(cartaEliminata, status) {
		console.log("carta da eliminare è con id "+idxCarta);
		switch (status) {
			case "success" : 
				$(".carte#"+parseInt(idxCarta)).remove();
				return deferred.resolve(cartaEliminata);
			case "error" : 
				return deferred.reject(cartaEliminata);
			default : 
				return deferred.promise();
		}
	});
	return deferred.promise();

}

function avvia() {
	var deferred=$.Deferred();
	$("#avvia").click(function() {
		return deferred.resolve("Avvio partita!!!");
	});
	return deferred.promise();
}

$().ready(function() {
	$.when(avvia()).done(function(msgAvvio){
		console.log(msgAvvio);
		$.when(inserimento_giocatori()).done(function(){
			$("#gioca").click(function() {
				console.log("GIOCHIAMOOOO!!!");
				if (!aggiungiGiocatori()) {
					location.ref("home");
				}
				alert("GIOCHIAMOOOOO!!!!");
				preparaTavolo();
				$.when(mescola()).done().then(function(msg) {
					console.log(msg);
					$.get("giocatore/cerca/"+giocatore, function(dati, status) {
						$("#carte").before("<center><div id='giocatore' class='container'></div></center>");
						$("#giocatore").append("<label style='font-size: 16px; margin-left: 50px' for='nomeGiocatore' class='col-m-4 badge badge-pill badge-secondary'>GIOCATORE : </label>");
						$("#giocatore").append("<input type='text' id='nomeGiocatore' disabled value='"+dati.nome+"'></input>");
						$("#giocatore").append("<label style='font-size: 16px; margin-left: 50px' for='puntiGiocatore' class='col-m-4 badge badge-pill badge-secondary'>PUNTI : </label>");
						$("#giocatore").append("<input type='text' id='puntiGiocatore' disabled value='"+dati.punti+"'></input>");
						$.when(gioca()).done(function(msg){
							console.log(msg);
							location.href = "/vittoria";
						});
					}).fail(function() {
						console.log("Non ci sono giocatori");
						location.ref="home";
					});
				}).fail(function(msg) {
					console.log(msg);
				});
			});
		});
	});
});
	

