// Server IP ricavato dinamicamente dall'URL della pagina corrente
const SERVER_IP = window.location.hostname;
const bacheca = $("#messaggio");

// --- VARIABILI GLOBALI PER I MODULI REMOTI ---
let layout_giocatoreCorrente, gestisci_input_giocatori, aggiungiGiocatori, aggiornaPunteggio, cercaGiocatore, listaGiocatori;
let le_due_carte_sono_diverse, le_due_carte_sono_uguali, confrontoCoppia, attivaListenerCarte, preparaTavolo;
let crea_intestazione;

// --- CARICAMENTO MODULI DINAMICI (MICRO-FRONTEND) ---
async function caricaModuliGiocatore() {
    try {
        ({
            layout_giocatoreCorrente,
            gestisci_input_giocatori,
            aggiungiGiocatori,
            aggiornaPunteggio,
            cercaGiocatore,
            listaGiocatori
        } = await import(`http://${SERVER_IP}:7002/resources/js/giocatore.js`));
        console.log("Moduli giocatori remoti caricati con successo da:", SERVER_IP);
    } catch (error) {
        console.error("Errore nel caricamento dei moduli GIOCATORE:", error);
    }
}

async function caricaModuliCarte() {
    try {
        ({
            le_due_carte_sono_diverse,
            le_due_carte_sono_uguali,
            confrontoCoppia,
            attivaListenerCarte,
            preparaTavolo
        } = await import(`http://${SERVER_IP}:7003/resources/js/carte.js`));
        console.log("Moduli carte remoti caricati con successo da:", SERVER_IP);
    } catch (error) {
        console.error("Errore nel caricamento dei moduli CARTE:", error);
    }
}

async function caricaModuliIntestazione() {
    try {
        ({ crea_intestazione } = await import(`http://${SERVER_IP}:7004/resources/js/intestazione.js`));
        console.log("Moduli intestazione remoti caricati con successo da:", SERVER_IP);
    } catch (error) {
        console.error("Errore nel caricamento dei moduli INTESTAZIONE:", error);
    }
}

// --- UTILITY LOCALI ---
import { bacheca_messaggio } from "./utility.js";

var conteggioCarte = 40;
var numeroGiocatori = 0;
var idGiocatoreCorrente = 1;
var finita = false;
const maxGiocatori = 10;

const esiste = (selettore) => $(selettore).length > 0;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function lineaBefore(element) {
	$(element).before("<hr class='linea' align='center' size='1' color='blue' noshade />");
}

// --- LOGICA DI GIOCO ---
async function gestisciTurno(carta1, carta2) {
	if (finita) return;

	const giocatoreCorrente = cercaGiocatore(idGiocatoreCorrente);
	const confronto = await confrontoCoppia(carta1, carta2);
	console.log(`Confronto carte => ${confronto}`);

	if (confronto) {
		console.log("Complimenti hai trovato 2 carte uguali!");
		aggiornaPunteggio(giocatoreCorrente);

		await delay(1000); // Attesa animazione accoppiamento
		le_due_carte_sono_uguali(carta1, carta2);
		bacheca_messaggio(bacheca, `Complimenti ${giocatoreCorrente.nome} hai trovato 2 carte uguali!`);

		conteggioCarte -= 2;
		console.log(`Coppia trovata! Carte rimaste a terra: ${conteggioCarte}`);
	} else {
		console.log("Mi dispiace tenta al prossimo giro!");

		await delay(1000); // Mostra le carte prima di rigirarle coperte
		le_due_carte_sono_diverse(carta1, carta2);
		bacheca_messaggio(bacheca, `Mi spiace ${giocatoreCorrente.nome}, ritenta al prossimo giro!`);

		// Il giocatore cambia solo in caso di errore
		attivaProssimoTurno();
	}
}

function attivaProssimoTurno() {
	idGiocatoreCorrente = (idGiocatoreCorrente % numeroGiocatori) + 1;
	console.log(`Passaggio turno. Prossimo giocatore ID: ${idGiocatoreCorrente}`);
}

function terminaPartita() {
	bacheca_messaggio(bacheca, "PARTITA FINITA! Avete rimosso tutte le carte.", 5000);
		console.log("Partita conclusa. Reindirizzamento...");
	
	// Piccolo delay prima del redirect per permettere la lettura del messaggio in bacheca
	setTimeout(() => {
		location.href = "/vittoria";
	}, 2000);
}

function attendiClickGioca() {
	return new Promise((resolve) => {
		$(document).on("click", "#gioca", function () {
			numeroGiocatori = parseInt($("#inputNumeroGiocatori").val(), 10);
			aggiungiGiocatori(numeroGiocatori);
			bacheca_messaggio(bacheca, "Giocatori aggiunti, pronti alla sfida!", 5000);
			
			// Pulizia listener per evitare registrazioni multiple
			$("#inputNumeroGiocatori").off("change");
			$(document).off("click", "#gioca");
			resolve();
		});
	});
}

async function main() {
	gestisci_input_giocatori();
	await attendiClickGioca();

	const tavolo = preparaTavolo();
	bacheca_messaggio(bacheca, "Tavolo pronto!");

	layout_giocatoreCorrente(idGiocatoreCorrente);
	console.log("Adesso tocca al Giocatore ID: " + idGiocatoreCorrente);

	attivaListenerCarte(async (carta1, carta2) => {
		// Protezione contro click multipli a partita finita
		if (finita) return; 

		let idcarta1 = carta1.attr("id");
		let idcarta2 = carta2.attr("id");

		console.log(`Gestisci turno => coppia: [${idcarta1}, ${idcarta2}]`);

		// Esegue il turno (confronto, punteggio, eventuale cambio ID giocatore)
		await gestisciTurno(idcarta1, idcarta2);

		// Controllo fine partita immediato prima di aggiornare l'interfaccia del turno successivo
		if (conteggioCarte <= 0) {
			finita = true;
			await delay(1000); 
			terminaPartita();
			return; // Esce per evitare di aggiornare il layout del giocatore
		}

		// Aggiorna il layout visivo solo se la partita continua
		layout_giocatoreCorrente(idGiocatoreCorrente);
	});
}

// --- INITIALIZATION ---
$(document).ready(async function () {
	// Carica tutti i micro-frontend in parallelo per velocizzare l'avvio
	await Promise.all([
		caricaModuliIntestazione(),
		caricaModuliGiocatore(),
		caricaModuliCarte()
	]);

	crea_intestazione();
	
	$("button#avvia").one("click", function () {
		$("div#avvia").remove();
		main();
	});
});
