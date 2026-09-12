//<script src="resources/js/partita.js" type="module"></script>
// importa funzioni da giocatore.js
import { cerca } from './giocatore.js';
import { aggiornaPunteggio } from './giocatore.js';
import { inserimento_giocatori } from './giocatore.js';
import { aggiungiGiocatori } from './giocatore.js';
// importa funzioni da carte.js
import { carteATerra } from './carte.js';
import { mescola } from './carte.js';
import { le_due_carte_sono_diverse } from './carte.js';
import { le_due_carte_sono_uguali } from './carte.js';
import { confrontoCoppia } from './carte.js';

// intestazione
import { crea_intestazione } from './intestazione.js'

/**
 * Variabili di stato del gioco
 */
var numeroPartecipanti = 0; // numero giocatori;
var carte = [];
var conteggioCarte = 40;
var primaCarta = null;    // Conterrà l'elemento jQuery della prima carta cliccata
var secondaCarta = null;  // Conterrà l'elemento jQuery della seconda carta cliccata
var idGiocatoreCorrente = 0; // Sostituito 'id' generico per chiarezza
var giocatoreCorrente = null;
var bloccoClic = false;   // Evita che l'utente clicchi altre carte durante le animazioni/attese
var giocatori=[];

// Configurazione Base URL per evitare ripetizioni (Modifica se necessario)
const URL_MAZZO = "http://localhost:7003";
const URL_GIOCATORE = "http://localhost:7002";

async function preparaTavolo() {
	$("#avvia").remove();
	$("#listaGiocatori").remove();
	$("#tavolo").remove();
	$("#divAvvia").remove();
	$("#divGioca").remove();

	// Crea il contenitore se non esiste già
	if (!esiste("#carte")) {
		$(".linea").after("<div id='carte' class='container'></div>");
	} else {
		$("#carte").empty();
	}

	// Prepara il tavolo con tutte le carte coperte
	for (let riga = 1; riga <= 4; riga++) {
		$("#carte").append("<div class='row justify-content-center mb-2' id='riga" + riga + "'></div>");
		for (let col = 1; col <= 10; col++) {
			let idCarta = ((riga - 1) * 10 + col) - 1;
			$("#riga" + riga).append(
				"<div class='col-auto px-1'>" +
				"<img class='carte' id='" + idCarta +
				"' src='" + URL_MAZZO + "/resources/img/retro-carta.jpg' alt='coperta' height='108' width='80' style='cursor:pointer;' />" +
				"</div>"
			);
		}
	}

	const risultatoMescola = await mescola();
	console.log(risultatoMescola);
	if (risultatoMescola)
		carteATerra()
			.then(mazzo =>
				carte = mazzo)
			.error(error =>
				console.error(error)
			);

	// Attiva i listener per il clic sulle carte appena create
	attivaListenerCarte();

	return "Tavolo preparato!";
}

function lineaBefore(element) {
	$(element).before("<hr class='linea' align='center' size='1' color='blue' noshade />");
}

function esiste(selettore) {
	return $(selettore).length > 0;
}

function attivaListenerCarte() {
	$(document).off("click", ".carte").on("click", ".carte", async function () {
		var cartaCliccata = $(this);

		if (bloccoClic || cartaCliccata.attr("alt") === "girata" || cartaCliccata.attr("alt") === "rimossa") {
			return;
		}

		if (primaCarta && cartaCliccata.attr("id") === primaCarta.attr("id")) {
			return;
		}

		bloccoClic = true;

		if (!primaCarta) {
			let girata = await giraCarta(cartaCliccata);
			if (girata) {
				primaCarta = cartaCliccata;
				console.log("primaCarta " + (girata ? "girata con successo" : "non girata"));
			}
			bloccoClic = false;
		} else {
			let girata = await giraCarta(cartaCliccata);
			if (girata) {
				secondaCarta = cartaCliccata;
				console.log("Seconda carta " + (girata ? "girata con successo" : "non girata"));
				gestisciTurno();
			} else {
				bloccoClic = false;
			}
		}
	});
}

function gestisciTurno() {
	var idPrima = primaCarta.attr("id");
	var idSeconda = secondaCarta.attr("id");
	giocatoreCorrente = cerca(idGiocatoreCorrente);
	confrontoCoppia(idPrima, idSeconda)
		.then(confronto => {
			if (confronto) {
				le_due_carte_sono_uguali(idPrima, idSeconda);
				aggiornaPunteggio(giocatoreCorrente);
				conteggioCarte -= 2;
				console.log("Coppia trovata! Carte rimaste a terra: " + carteATerra);
			} else {
				le_due_carte_sono_diverse(idPrima, idSeconda);
				idGiocatoreCorrente = (idGiocatoreCorrente + 1) % numeroPartecipanti;
				console.log("Adesso tocca al Giocatore ID: " + idGiocatoreCorrente);
			}

			primaCarta = null;
			secondaCarta = null;
			bloccoClic = false;
		})
		.fail(function (error) {
			console.log(error);
			bloccoClic = false;
		});
}


function terminaPartita() {
	alert("PARTITA FINITA! Avete rimosso tutte le carte.");
	location.href = "http://localhost:7001/vittoria";
	console.log("Partita conclusa.");
	// Qui puoi inserire una chiamata Ajax per recuperare la classifica finale dal backend
}


// Inizializzazione al caricamento della pagina
$(document).ready(function () {
    crea_intestazione();

    $("#avvia").one("click", function () {
        inserimento_giocatori(numeroPartecipanti);
    });

	console.log("Adesso clicca su conferma giocatori per giocare!")

    $("#gioca").click(function () {
        aggiungiGiocatori(numeroPartecipanti)
            .then(risposta => {
                giocatori = risposta;
                console.log("GIOCHIAMOOOO!!!");
                alert("GIOCHIAMOOOOO!!!!");
                
                let mesg = preparaTavolo();
                console.log(mesg);
                
                // Verifica corretto aggancio dell'elemento (assumendo che esiste() sia una tua funzione)
                if (esiste('#tavolo')) {
                    // Esegui il turno finché ci sono carte
                    while (conteggioCarte > 0) {
                        console.log("Carte rimaste: " + conteggioCarte);
                        
                        // NOTA: gestisciTurno() deve modificare la variabile 'conteggioCarte' 
                        // riducendola, altrimenti il ciclo rimarrà infinito.
                        gestisciTurno(); 
                    }
                }
                
                // Invocazione corretta della funzione
                terminaPartita();
            })
            .catch(e => { // Corretto .error con .catch
                console.error("Errore durante il caricamento dei giocatori:", e);
            });
    });
});
