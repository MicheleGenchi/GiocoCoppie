const URL_MAZZO = "http://localhost:7003";

// 1. Gestione visiva: Carte Uguali
export function le_due_carte_sono_uguali(id1, id2) {
	console.log("Le due carte sono uguali");
	$(`.carte#${id1}, .carte#${id2}`)
		.attr("alt", "rimossa")
		.attr("src", `${URL_MAZZO}/resources/img/retro-carta-rimossa.jpg`);
}

// 2. Gestione visiva: Carte Diverse
export function le_due_carte_sono_diverse(id1, id2) {
	console.log("Le due carte sono diverse");
	$(`.carte#${id1}, .carte#${id2}`)
		.attr("alt", "coperta")
		.attr("src", `${URL_MAZZO}/resources/img/retro-carta.jpg`);
}

// 3. Mescola il mazzo
export async function mescola() {
	try {
		const mescolate = await $.post(`${URL_MAZZO}/mazzo/mescolaCarte`);
		return "Carte mescolate: " + mescolate;
	} catch (error) {
		return "Carte non mescolate! " + error.statusText;
	}
}

// 4. Ottieni le carte a terra
export async function carteATerra() {
	try {
		return await $.ajax({
			url: `${URL_MAZZO}/carteATerra`,
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
	
	try {
		// Supponendo che esista un endpoint per recuperare i dettagli della singola carta tramite ID
		const infoCarta = await $.get(`${URL_MAZZO}/mazzo/carta/${idCarta}`);
		
		carta.attr("alt", "girata");
		carta.attr("src", URL_MAZZO + infoCarta.percorso);
		return infoCarta;
	} catch (errore) {
		console.error("Errore durante la rotazione della carta:", errore);
	}
}

// 6. Confronta la coppia sul backend passando i due ID
export async function confrontoCoppia(idPrima, idSeconda) {
	try {
		return await $.get(`${URL_MAZZO}/mazzo/confrontoCarte/${idPrima}/${idSeconda}`);
	} catch (errore) {
		console.error("Errore nel confronto della coppia:", errore);
		throw errore;
	}
}
