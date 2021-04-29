/**
 * 
 */
var numeroPartecipanti = 0; // numero giocatori;
var carteATerra=40;
var coppia=1;
var primaCarta="";
var secondaCarta="";
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
		$("#carte").append(
				"<div class='col sm-8 text-center' id='riga" + riga
						+ "'></div>");
		for (i = 1; i <= 10; i++) {
			var idCarta;
			idCarta = ((riga - 1) * 10) + i;
			$("#riga" + riga)
					.append(
							"<img class='carte' id='"
									+ idCarta
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
	$.getJSON("mazzo/mescolaCarte", function(dati, status) {
		if (status=="success") {
			return deferred.resolve("carte mescolate!");
		} else {
			return deferred.reject("carte non mescolate!");
		}
		return deferred.promise();
	});
}

function nGiocatori() {
	
	$("#tavolo").append(
			"<div class='container'><div id='nGiocatori' class='input-group-prepend'></div></div>");
	$("#tavolo #nGiocatori")
			.append(
					"<label for='inputNumeroGiocatori' class='input-group-text'>Giocatori</label>");
	$("#nGiocatori .input-group-text")
			.after(
					"<select class='col-m-4' id='inputNumeroGiocatori' aria-label='Example select with button addon'></Select>");
	$("#inputNumeroGiocatori").append("<option selected>Choose...</option>");
	for (i = 1; i <= 10; i++) {
		$("#inputNumeroGiocatori").append(
				"<option value='" + i + "'>" + i + "</option>");
	}
}

function inserimento_NomiGiocatori() {
	$("#tavolo").append("</br><div class='container' id='listaGiocatori'></div>");
	var i;
	for (i = 1; i <= numeroPartecipanti; i++) {
		$('#listaGiocatori').append(
				"<div class='row'><div class='input-group-prepend' id='divGiocatore" + i + "'></div></div>");
		$("#divGiocatore" + i).append(
				"<label for='Giocatore" + i
						+ "' class='input-group-text'>Giocatore n." + i
						+ "</label>");
		$("#divGiocatore" + i).append(
				"<input type='text' id='Giocatore" + i
						+ "' class='form-control' placeholder='Giocatore" + i
						+ "' aria-label='Giocatore" + i
						+ "' aria-describedby='basic-addon1'></input>");
	}
	$("#listaGiocatori")
			.after(
					"</br><div class='col text-center'><button id='gioca' class='btn btn-primary'>CONFERMA GIOCATORI</button>");
	numeroPartecipanti = i - 1;
}

function aggiungiGiocatori() {
	for (i = 1; i <= numeroPartecipanti; i++) {
		var giocatore = $("#Giocatore" + i).val();
		if (giocatore=="") giocatore=$("#Giocatore" + i).attr("Placeholder");
		// alert(giocatore);
		$.get("giocatore/aggiungi/" + giocatore, function(dati, status) {
		});
	}
}

function avvia() {
	var deferred=$.Deferred();
	$("#avvia").click(function() {
		$.get("giocatore/azzeraLista", function(dati, status) {
			if (status=="success")
				return deferred.resolve();
			else 
				return deferred.reject();
		});
	});
	return deferred.promise();
}

function inserimento_giocatori() {
	var deferred = $.Deferred();
	$.when(nGiocatori()).done(function() {
		$("#inputNumeroGiocatori").change(function() {
			numeroPartecipanti = $("#inputNumeroGiocatori").val();
			// alert("numero partecipanti " + numeroPartecipanti);
			inserimento_NomiGiocatori();
			$("button#gioca").click(function() {
				aggiungiGiocatori();
				return deferred.resolve();
			});
		});
	});
	return deferred.promise();
}

function selezioneCarta(carta) {
	var deferred = $.Deferred();
	var idImage = carta.attr("id");
		var url = "mazzo/urlCarta/" + idImage;
		$.get(url, function(dati, status) {
			if (status == "success") {
				carta.attr("alt", "girata");
				carta.attr("src", dati);
				$.get("mazzo/carta/" + idImage, function(dati, status) {
					if (status == "success")
						return deferred.resolve("Carta selezionata "+dati.val+" di "+dati.seme);
					else
						return deferred.reject("carta non presente nel mazzo");
				});
			} 
		});
	return deferred.promise();
}

function le_due_carte_sono_uguali() {
	carteATerra=carteATerra-2;
	eliminaCarta(primaCarta);
	eliminaCarta(secondaCarta);
	$("#puntiGiocatore").disabled=false;
	$("#puntiGiocatore").val(punti);
	$("#puntiGiocatore").disabled=true;
	$.get("giocatore/aggiornaPunteggio/"+giocatore, function (dati, status) {
		console.log("Giocatore "+giocatore+(dati==true?"  Punteggio aggiornato!":"  Punteggio invariato"));
		aggiornaCampiGiocatore();
	});
}

function gioca() {
	$(".carte").click(function(e) {
		console.log("coppia = "+coppia);
		console.log("carta = "+$(this).attr("id"));
		var app=$(this).attr("id");
		$.when(selezioneCarta($(this))).done(function(dati) {
			switch (coppia) {
				case 1:coppia++;console.log("prima carta\n"+dati);primaCarta=app;break;
				case 2:if (primaCarta!=app) {
						coppia++;
						console.log("seconda carta\n"+dati);secondaCarta=app;
						$.get("mazzo/confrontoCarte/"+parseInt(primaCarta)+"/"+parseInt(secondaCarta), function (dati, status) {
							// alert("ci sono due carte da confrontare! \nPrima carta =
							// "+primaCarta+"\nSeconda carta = "+secondaCarta);
								if (dati==true) {
									alert("le due carte sono uguali!");
									le_due_carte_sono_uguali();
									if (carteATerra<=0) // alert("HAI VINTO! carteATerra = "+carteATerra);
										location.href = "vittoria";
								} else {
									alert("Mi spiace! Le due carte sono diverse...")
									copriCarta(primaCarta);
									copriCarta(secondaCarta);
									giocatoreSuccessivo();
								}
								coppia=1;
							});
						} else {
							coppia=2;
							console.log("Stai cliccando sulla carta, già girata!");
						}
					break;
					default :coppia=1; primaCarta=""; secondaCarta=""; 
				}
			});
	});
}


function aggiornaCampiGiocatore() {
	$.getJSON("giocatore/cerca/"+giocatore, function(dati, status) {
		if (status=="success") {
			$("#carte").before("<center><div id='giocatore' class='container'></div></center>");
			$("#nomeGiocatore").val(dati.nome);
			$("#puntiGiocatore").val(dati.punti);
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

function eliminaCarta(carta) {
	// alert("copri la carta "+carta.attr("class")+" "+carta.attr("id"));
	$(".carte#"+parseInt(carta)).remove();
	// $(".carte#"+parseInt(carta)).attr("src",
	// "/resources/img/retro-carta.jpg");
}

$().ready(function() {
	$.when(avvia()).done(function(){
		$.when(inserimento_giocatori()).done(function(){

			alert("GIOCHIAMO!!!");

			$.when(mescola()).done(function() {
				preparaTavolo();
				// nome e punteggio giocatore
				$.get("giocatore/cerca/"+giocatore, function(dati, status) {
					$("#carte").before("<center><div id='giocatore' class='container'></div></center>");
					$("#giocatore").append("<label style='font-size: 16px; margin-left: 50px' for='nomeGiocatore' class='col-m-4 badge badge-pill badge-secondary'>GIOCATORE : </label>");
					$("#giocatore").append("<input type='text' id='nomeGiocatore' disabled value='"+dati.nome+"'></input>");
					$("#giocatore").append("<label style='font-size: 16px; margin-left: 50px' for='puntiGiocatore' class='col-m-4 badge badge-pill badge-secondary'>PUNTI : </label>");
					$("#giocatore").append("<input type='text' id='puntiGiocatore' disabled value='"+dati.punti+"'></input>");
					gioca();
				});
			}).fail(function(msg) {
				console.log(msg);
			});

			
		});
	});
});
	


			


	

