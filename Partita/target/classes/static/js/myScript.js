/**
 * Variabili di stato del gioco
 */
var numeroPartecipanti = 0; // numero giocatori;
var carteATerra = 40;
var primaCarta = null;    // Conterrà l'elemento jQuery della prima carta cliccata
var secondaCarta = null;  // Conterrà l'elemento jQuery della seconda carta cliccata
var punti = 0;
var giocatore = 0;
var bloccoClic = false;   // Evita che l'utente clicchi altre carte durante le animazioni/attese

async function mescola() {
    return $.get("mazzo/mescolaCarte")
        .then(mescolate => {
            return "Carte mescolate: " + mescolate;
        })
        .catch(error => {
            return "carte non mescolate! " + error.statusText;
        });
}

async function preparaTavolo() {
    $("#avvia").remove();
    $("#listaGiocatori").remove();
    $("#tavolo").remove();
    $("#divAvvia").remove();
    
    $(".linea").after("<div id='carte' class='container'></div>");
    
    for (let riga = 1; riga <= 4; riga++) {
        $("#carte").append("<div class='col sm-8 text-center' id='riga" + riga + "'></div>");
        for (let col = 1; col <= 10; col++) {
            let idCarta = ((riga - 1) * 10 + col) - 1;
            $("#riga" + riga).append(
                "<img class='carte' id='" + idCarta + 
                "' src='resources/img/retro-carta.jpg' alt='coperta' Height='88' width='60' />"
            );
        }
    }
			
    const risultatoMescola = await mescola();
    console.log(risultatoMescola);

    // Attiva i listener per il clic sulle carte appena create
    attivaListenerCarte();

    return "Tavolo preparato!";
}

function lineaBefore(element) {
	$(element).before("<hr class='linea' align='center' size='1' color='blue' noshade />");
}

function nGiocatori() {
	$("#tavolo").append("<div class='container'><div id='nGiocatori' class='input-group-prepend'></div></div>");
	$("#tavolo #nGiocatori").append("<label for='inputNumeroGiocatori' class='input-group-text'>Giocatori</label>");
	$("#nGiocatori .input-group-text").after("<select class='col-m-4' id='inputNumeroGiocatori' aria-label='Example select with button addon'></Select>");
	$("#inputNumeroGiocatori").append("<option selected>Choose...</option>");
	for (let i = 1; i <= 10; i++) {
		$("#inputNumeroGiocatori").append("<option value='" + i + "'>" + i + "</option>");
	}
}

function inserimento_NomiGiocatori() {
	var deferred = $.Deferred();
	if (!(esiste("div.container#listaGiocatori"))) {
		$("#tavolo").append("<div class='container' id='listaGiocatori'></div>");
		for (let i = 1; i <= numeroPartecipanti; i++) {
			$('#listaGiocatori').append("<div class='row'><div class='input-group-prepend' id='divGiocatore" + i + "'></div></div>");
			$("#divGiocatore" + i).append("<label for='Giocatore" + i + "' class='input-group-text'>Giocatore n." + i + "</label>");
			$("#divGiocatore" + i).append("<input type='text' id='Giocatore" + i + "' class='form-control' placeholder='Giocatore" + i + "' aria-label='Giocatore" + i + "' aria-describedby='basic-addon1'></input>");
		}
		$("#listaGiocatori").after("<div class='col text-center' id='divGioca'></div>");
		$("#divGioca").append("<button id='gioca' class='btn btn-primary'>CONFERMA GIOCATORI</button>");
	}
	return deferred.resolve("input box per giocatori creati!");
}

function esiste(selettore) {
	return $(selettore).length > 0;
}

function aggiungiGiocatori() {
	for (let i = 1; i <= numeroPartecipanti; i++) {
		var nomeGiocatore = $("#Giocatore" + i).val();
		if (nomeGiocatore == "") nomeGiocatore = $("#Giocatore" + i).attr("Placeholder");
		$.get("giocatore/aggiungi/" + (i - 1) + "/" + nomeGiocatore);
	}
	return true;
}

function azzeraListaGiocatori() {
	var deferred = $.Deferred();
	$.get("giocatore/azzeraLista", function (dati, status) {
		if (status === "success") {
            return deferred.resolve("lista giocatori pulita");
        } else {
            return deferred.reject("lista giocatori non azzerata");
        }
	});
	return deferred.promise();
}

function inserimento_giocatori() {
	var deferred = $.Deferred();
	$.when(nGiocatori()).done(function () {
		$("#inputNumeroGiocatori").change(function () {
			$("#listaGiocatori").remove();
			$("#divGioca").remove();
			numeroPartecipanti = $("#inputNumeroGiocatori").val();
			$.when(inserimento_NomiGiocatori()).done(function (msgInputBoxCreati) {
				console.log(msgInputBoxCreati);
				$.when(azzeraListaGiocatori()).done(function (msgListaVuota) {
					console.log(msgListaVuota);
					return deferred.resolve();
				});
			});
		});
	});
	return deferred.promise();
}

async function giraCarta(carta) {
	var idImage = parseInt(carta.attr("id"));
	var url = "mazzo/urlCarta/" + idImage;

	try {
		var urlImmagine = await $.get(url);
		carta.attr("alt", "girata");
		carta.attr("src", urlImmagine);
		await $.get("mazzo/carta/" + idImage);
		return true;
	} catch (error) {
		console.error("Errore nel girare la carta", error);
		return false;
	}
}

// Gestore dell'evento click strutturato per il Memory
function attivaListenerCarte() {
    $(document).off("click", ".carte").on("click", ".carte", async function() {
        var cartaCliccata = $(this);

        // Impedisce il clic se stiamo aspettando l'animazione o se la carta è già girata/rimossa
        if (bloccoClic || cartaCliccata.attr("alt") === "girata") {
            return;
        }

        if (!primaCarta) {
            // Primo clic
            primaCarta = cartaCliccata;
            bloccoClic = true; // Blocca momentaneamente durante l'animazione di rotazione
            await giraCarta(primaCarta);
            bloccoClic = false;
        } else if (!secondaCarta && cartaCliccata.attr("id") !== primaCarta.attr("id")) {
            // Secondo clic (su una carta diversa dalla prima)
            secondaCarta = cartaCliccata;
            bloccoClic = true;
            await giraCarta(secondaCarta);
            
            // Avvia la logica di confronto del turno
            gestisciTurno();
        }
    });
}

function gestisciTurno() {
    var idPrima = primaCarta.attr("id");
    var idSeconda = secondaCarta.attr("id");

    $.getJSON("mazzo/confrontoCarte/" + idPrima + "/" + idSeconda)
    .done(function (confronto) {
        console.log("Le due carte sono " + (confronto ? "uguali" : "diverse"));
        
        // Timeout di 1 secondo per dare il tempo al giocatore di vedere le carte girate
        setTimeout(function() {
            if (confronto) {
                le_due_carte_sono_uguali(idPrima, idSeconda);
                if (carteATerra <= 0) {
                    alert("PARTITA FINITA! Avete rimosso tutte le carte.");
					terminaPartita();
                }
            } else {
                le_due_carte_sono_diverse(idPrima, idSeconda);
                giocatoreSuccessivo();
            }

            // Resetta lo stato del turno per i prossimi clic
            primaCarta = null;
            secondaCarta = null;
            bloccoClic = false;
        }, 1000);
    })
    .fail(function() {
        console.error("Errore nella chiamata di confronto carte");
        bloccoClic = false;
    });
}

function le_due_carte_sono_uguali(id1, id2) {
	carteATerra = carteATerra - 2;
	$.when(eliminaCarta(id1), eliminaCarta(id2))
		.done(function () {
			$(".carte#" + id1).remove();
			$(".carte#" + id2).remove();
			
            $("#puntiGiocatore").prop("disabled", false).val(punti).prop("disabled", true);
            
			$.get("giocatore/aggiornaPunteggio/" + giocatore, function (dati) {
				console.log("Giocatore " + giocatore + (dati == true ? " Punteggio aggiornato!" : " Punteggio invariato"));
				aggiornaCampiGiocatore();
			});
		})
		.fail(function () {
			console.log("Errore nell'eliminazione delle carte!");
		});
}

function le_due_carte_sono_diverse(id1, id2) {
	copriCarta(id1);
	copriCarta(id2);
}

function aggiornaCampiGiocatore() {
	$.getJSON("giocatore/cerca/" + giocatore, function (dati, status) {
		if (status == "success") {
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
	if (giocatore >= numeroPartecipanti)
		giocatore = 0;
	aggiornaCampiGiocatore();
}

function copriCarta(idCarta) {
	$(".carte#" + idCarta).attr("alt", "coperta").attr("src", "resources/img/retro-carta.jpg");
}

// Completata la funzione che risultava troncata nel tuo frammento
function eliminaCarta(idxCarta) {
	var deferred = $.Deferred();
	$.get("mazzo/eliminaCarta/" + idxCarta, function (dati, status) {
		if(status === "success") {
            deferred.resolve();
        } else {
            deferred.reject();
        }
	});
    return deferred.promise();
}

function avvia() {
	var deferred = $.Deferred();
	$("#avvia").click(function() {
		return deferred.resolve("Avvio partita!!!");
	});
	return deferred.promise();
}

$().ready(function() {
	$.when(avvia()).done(function(msgAvvio){
		console.log(msgAvvio);
		
		$.when(inserimento_giocatori()).done(function(){
			// Usiamo il delegation per gestire il click su #gioca che viene creato dinamicamente
			$(document).on("click", "#gioca", async function() {
				console.log("GIOCHIAMOOOO!!!");
				
				if (!aggiungiGiocatori()) {
					location.href = "home"; // Corretto .ref con .href
					return;
				}
				
				alert("GIOCHIAMOOOOO!!!!");
				
				// preparaTavolo è async e al suo interno chiama già mescola() con await.
				// Aspettiamo che finisca completamente la preparazione.
				await preparaTavolo();
				
				// Recuperiamo il primo giocatore per mostrare l'interfaccia del punteggio
				$.getJSON("giocatore/cerca/" + giocatore, function(dati, status) {
					if (status === "success") {
						// Rimosso il tag deprecato <center>, sostituito con classi Bootstrap per centrare
						$("#carte").before("<div id='giocatore' class='container text-center my-3'></div>");
						
						$("#giocatore").append("<label style='font-size: 16px; margin-left: 20px' for='nomeGiocatore' class='col-m-4 badge badge-pill badge-secondary'>GIOCATORE : </label>");
						$("#giocatore").append("<input type='text' id='nomeGiocatore' class='mx-2' disabled value='" + dati.nome + "'></input>");
						
						$("#giocatore").append("<label style='font-size: 16px; margin-left: 20px' for='puntiGiocatore' class='col-m-4 badge badge-pill badge-secondary'>PUNTI : </label>");
						$("#giocatore").append("<input type='text' id='puntiGiocatore' class='mx-2' disabled value='" + dati.punti + "'></input>");
						
						console.log("Interfaccia giocatore caricata. In attesa delle mosse...");
						// Nota: Non serve chiamare gioca() qui all'avvio. 
						// I clic sulle carte sono ora gestiti in modalità asincrona dal listener attivato in preparaTavolo().
					}
				}).fail(function() {
					console.log("Non ci sono giocatori");
					location.href = "home"; // Corretto .ref con .href
				});
			});
		});
	});
});

/**
 * Funzione da richiamare quando le carte a terra finiscono (carteATerra <= 0)
 * all'interno del file delle funzioni visto in precedenza.
 */
function terminaPartita() {
	console.log("Partita finita!");
	location.href = "/vittoria";
}