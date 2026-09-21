// Sostituisci "IL_TUO_IP_SERVER" con l'IP reale o il dominio del server (es. 192.168.1.50 o iltuosito.com)
const BASE = "/"; //`http://${window.location.hostname}:8080`;
const SERVER_CARTE = `${BASE}giococoppie/carte`;
const URL_IMMAGINE_CARTA = `${SERVER_CARTE}/resources/img`;

var bloccoClic = false;   // Evita che l'utente clicchi altre carte durante le animazioni/attese
export var primaCarta = null;    // Conterrà l'elemento jQuery della prima carta cliccata
export var secondaCarta = null;  // Conterrà l'elemento jQuery della seconda carta cliccata
export const carte = [];
export const coppia = {
    primaCarta: null,
    secondaCarta: null
};

const esiste = (selettore) => $(selettore).length > 0;


export async function preparaTavolo() {
	$("#nGiocatori").remove();

	// Crea il contenitore se non esiste già
	if (!esiste("#carte")) {
		$("#area-gioco").prepend("<div id='carte' class='container'></div>");
	} else {
		$("#carte").empty();
	}

	carte_coperte();

	const risultatoMescola = await mescola();
	console.log("risultatoMescola.status  =  ",risultatoMescola.status);

    if (risultatoMescola.status === "mescolate") {
        try {
            // Blocca l'esecuzione finché il mazzo non è arrivato
            const mazzo = await carteATerra();
            
            carte.push(...mazzo.carte);
            
            // CONTROLLO QUI: Ora sarà sicuramente pieno
            console.log("preparaTavolo => Carte caricate con successo:", carte);
            
        } catch (errore) {
            console.error("Si è verificato un errore:", errore);
        }
    }
		
	return "Tavolo preparato!";
}

// 1. Gestione visiva: Carte Uguali
export function le_due_carte_sono_uguali(id1, id2) {
	//bacheca_messaggio("le due carte sono uguali");
	$(`.carte#${id1}, .carte#${id2}`)
		.attr("alt", "rimossa")
		.attr("src", `${URL_IMMAGINE_CARTA}/retro-carta-rimossa.jpg`);
}

// 2. Gestione visiva: Carte Diverse
export function le_due_carte_sono_diverse(id1, id2) {
	//bacheca_messaggio("Le due carte sono diverse");
	$(`.carte#${id1}, .carte#${id2}`)
		.attr("alt", "coperta")
		.attr("src", `${URL_IMMAGINE_CARTA}/retro-carta.jpg`);
}

// 3. Mescola il mazzo
export async function mescola() {
    try {
        const risposta = await $.post(`${SERVER_CARTE}/mescolaCarte`);
        if (risposta.status === "mescolate") {
            return risposta; // Restituisce tutto l'oggetto del server (es. { Status: "...", carte: [...] })
        }
        throw new Error("Il server non ha confermato il mescolamento.");
    } catch (error) {
        return null; // Restituisce null o lancia l'errore per indicare il fallimento
    }
}

// 4. Ottieni le carte a terra
export async function carteATerra() {
	try {
		return await $.ajax({
			url: `${SERVER_CARTE}/carteATerra`,
			type: "GET",
			dataType: 'json'
		});
	} catch (errore) {
		console.error("Errore durante la ricerca delle carte a terra:", errore);
		throw errore;
	}
}

// 5. Gira la carta (Richiede una chiamata al backend per conoscere l'immagine)
export async function giraCarta(carta) {
	const idCarta = parseInt(carta.attr("id"));
	const payload = JSON.stringify({ id: idCarta });
	console.log("carte = ",carte);
	console.log(`CARTA  { ID = ${idCarta}   =>   PERCORSO = ${carte[idCarta].percorso} }`);
	console.log(`URL COMPLETO => ${URL_IMMAGINE_CARTA}/Carte_Napoletane/${carte[idCarta].percorso}`);
	carta.attr("alt", "girata");
	carta.attr("src", `${URL_IMMAGINE_CARTA}/Carte_Napoletane/${carte[idCarta].percorso}`);
	// IMPORTANTE: Questo true viene ora correttamente letto da "let girata = await giraCarta(...)"
	return true; 
}

// 6. Confronta la coppia sul backend passando i due ID
export function confrontoCoppia(idCarta1, idCarta2) {
	const carta1=carte[idCarta1];
	const carta2=carte[idCarta2];
	//console.log("confronto coppia :");
	//console.log(`carta 1 => ${JSON.stringify(carta1.val)}`);
	//console.log(`carta 2 => ${JSON.stringify(carta2.val)}`);
	if ((isNaN(idCarta1)) || isNaN(idCarta2)) 
		return null;
	return (carta1.val===carta2.val);
	// try {
	// 	return await $.get(`${URL_MAZZO}/mazzo/confrontoCarte/${idPrima}/${idSeconda}`);
	// } catch (errore) {
	// 	console.error("Errore nel confronto della coppia:", errore);
	// 	throw errore;
	// }
}

export function attivaListenerCarte(onCoppiaScelta) {
	$(document).off("click", ".carte").on("click", ".carte", async function () {
		var cartaCliccata = $(this);
		
		// 1. Controllo di sicurezza iniziale
		if (bloccoClic || cartaCliccata.attr("alt") === "girata" || cartaCliccata.attr("alt") === "rimossa") {
			console.log("attivaListenerCarte => controllo di sicurezza iniziale");
			return;
		}

		// Evita il doppio click sulla stessa identica carta
		if (primaCarta && cartaCliccata.attr("id") === primaCarta.attr("id")) {
			console.log("attivaListenerCarte => Evita doppio click su stessa carta");
			return;
		}

		if (secondaCarta && cartaCliccata.attr("id") === secondaCarta.attr("id")) {
			console.log("attivaListenerCarte => Evita doppio click su stessa carta");
			return;
		}

		// 2. Blocchiamo subito il click prima di qualsiasi operazione asincrona (await)
		bloccoClic = true;
		console.log(`bloccoClic = ${bloccoClic}  =>  click carte bloccato`);
		
		try {
			if (!primaCarta) {
				// console.log("Prima carta");
				let girata = await giraCarta(cartaCliccata);
				if (girata) {
					primaCarta = cartaCliccata;
				} else {
					// Se la prima carta non si gira, non facciamo nulla. 
					// bloccoClic tornerà false nel finally e primaCarta resta null.
					console.log("Impossibile girare la prima carta");
				}
			} else {
				// console.log("Seconda carta");
				let girata = await giraCarta(cartaCliccata);
				if (girata) {
					secondaCarta = cartaCliccata;
					// console.log(`Girata con successo. Conta = ${conta}`);
					
					// Notifica il gestore del gioco che la coppia è pronta
					if (typeof onCoppiaScelta === "function") {
						// console.log("Coppia pronta!");
						await onCoppiaScelta(primaCarta, secondaCarta);
					}
					
					// Resettiamo i puntatori solo se la seconda carta è stata girata con successo
					primaCarta = null;
					secondaCarta = null;
				} else {
					// Se la seconda carta fallisce il "gira", NON resettiamo primaCarta.
					// L'utente deve poter riprovare a scegliere una seconda carta.
					console.log("Impossibile girare la seconda carta. Riprova.");
				}
			}
		} catch (error) {
			console.error("Errore durante la gestione del click della carta:", error);
		} finally {
			// Questo blocco viene eseguito SEMPRE, garantendo che il gioco non si pianti
			bloccoClic = false;
			console.log(`bloccoClic = ${bloccoClic}  =>  click carte sbloccato`);
		}
	});
}


export function carte_coperte() {
	// Prepara il tavolo con tutte le carte coperte
	for (let riga = 1; riga <= 4; riga++) {
		$("#carte").append("<div class='row justify-content-center mb-2' id='riga" + riga + "'></div>");
		for (let col = 1; col <= 10; col++) {
			let idCarta = ((riga - 1) * 10 + col) - 1;
			$("#riga" + riga).append(
				"<div class='col-auto px-1'>" +
				"<img class='carte' id='" + idCarta +"'" +
				"' src='" +  URL_IMMAGINE_CARTA + "/retro-carta.jpg'"+
				" alt='coperta' height='108' width='80' style='cursor:pointer;' />" +
				"</div>"
			);
		}
	}
}


