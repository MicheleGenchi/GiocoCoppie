// Sostituisci "IL_TUO_IP_SERVER" con l'IP reale o il dominio del server (es. 192.168.1.50 o iltuosito.com)
const BASE = "/"; //`http://${window.location.hostname}:8080`;
const SERVER_GIOCATORE = `${BASE}giococoppie/giocatore`;

export var giocatori = [];
export var giocatore = null;

let aggiornaPunteggioCookie,
    getCookie,
    setCookie,
    azzeraCookie,
    allCookiesStartWith;


async function caricaModuliGestioneCookie() {
    console.log(`SERVER_BASE => ${BASE}`);
    console.log(`SERVER_GIOCATORE => ${SERVER_GIOCATORE}`);
    try {
        ({
            aggiornaPunteggioCookie,
            getCookie,
            setCookie,
            azzeraCookie,
            allCookiesStartWith
        } = await import(`${SERVER_GIOCATORE}/resources/js/gestioneCookies.js`));
        console.log("Moduli gestioneCookies remoti caricati con successo da:", `${SERVER_GIOCATORE}/resources/js/gestioneCookies.js`);
    } catch (error) {
        console.error("Errore nel caricamento dei moduli gestioneCookies:", error);
    }
}

await caricaModuliGestioneCookie();

const esiste = (selettore) => $(selettore).length > 0;

async function eliminaCookie(key) {
    // Se per qualche motivo il modulo non è ancora caricato, attendi il caricamento
    if (!azzeraCookie) {
        console.log("Moduli non ancora pronti, attendo il caricamento...");
        await caricaModuliGestioneCookie();
    }

    // Ora sei sicuro che azzeraCookie esista (se l'import non è fallito)
    if (typeof azzeraCookie === 'function') {
        azzeraCookie(key);
    } else {
        console.error("Impossibile utilizzare azzeraCookie: modulo non disponibile.");
    }
}

export function cercaGiocatore(id) {
    let response = getCookie(`giocatore_${id}`);
    // Se il cookie non esiste, restituisce null per evitare errori di parsing
    if (!response) {
        return null;
    }

    let jsonResponse = JSON.parse(response); // Corretto in JSON (tutto maiuscolo)
    return jsonResponse;
    // return $.ajax({
    //     url: `${URL_GIOCATORE}/giocatore/cerca`,
    //     type: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify({ "id": id }),
    //     success: function (response) {
    //         // I dati si trovano qui
    //         return response; 
    //     },
    //     error: function (xhr, status, errore) {
    //         console.error("Errore durante la ricerca:", errore);
    //     }
    // }); // <-- Mancava la virgola prima di "error"
}


export function aggiornaPunteggio(giocatore, aggiorna=false) {
    console.log("aggiorna punteggio per " + JSON.stringify(giocatore));
    if (typeof giocatore === 'string') {
        giocatore = JSON.parse(giocatore);
    }
    if (aggiorna)
        giocatore.punti++;
    $("#nomegiocatore").val(giocatore.nome);
    $("#puntigiocatore").prop("disabled", false).val(giocatore.punti).prop("disabled", true);
    aggiornaPunteggioCookie(giocatore);
}

export function layout_giocatoreCorrente(i) {

    //(`prima di fare il parse; cookie = ${i}`);
    const cookie = getCookie(`giocatore_${i}`);
    const giocatore = JSON.parse(cookie);

    var idNumerico = parseInt(giocatore.id, 10);
    //bacheca_messaggio(`Giocatore_${giocatore.id}  =>  NOME: ${giocatore.nome}  |  PUNTI: ${giocatore.punti}`);
    if (isNaN(idNumerico)) {
        console.log(`ERRORE: (${i})  ID non valido per la ricerca.`);
        return;
    }

    // crea l'elemento giocatore punti se non esiste
    if ((!$("#giocatore").length)) {
        const htmlGiocatore=`
            <div id='giocatore' class='container text-center my-3'>
                <label style='font-size: 22px; margin-left: 20px' for='nomegiocatore' class='col-md-3 badge badge-pill badge-secondary etichetta'>GIOCATORE : </label>
                <input type='text' style='font-size: 22px;' id='nomegiocatore' class='mx-2 col-md-3' disabled >
            </div>
            <div id='punti' class='container text-center my-3'>
                <label style='font-size: 22px; margin-left: 20px' for='puntigiocatore' class='col-md-3 badge badge-pill badge-secondary etichetta'>PUNTI : </label>
                <input type='text' style='font-size: 22px;' id='puntigiocatore' class='mx-2 col-md-3' disabled >
            </div>
        `;
        $("#area-gioco").prepend(htmlGiocatore);
    }

    //aggiorna i suoi campi
    aggiornaPunteggio(giocatore);
}

export function nGiocatori($container) {
    return new Promise((resolve) => {
        // 1. Creazione e assemblaggio degli elementi in memoria
        const $divContainer = $("<div class='container'></div>");
        const $divInput = $("<div class='input-group mb-3'></div>");
        const $select = $("<select>", { class: "form-select", id: "inputNumeroGiocatori" })
            .append("<option selected disabled>Seleziona...</option>");

        for (let i = 1; i <= 10; i++) {
            $select.append(`<option value="${i}">${i}</option>`);
        }

        $divInput.append("<label for='inputNumeroGiocatori' class='input-group-text'>Giocatori</label>")
            .append($select);
        $divContainer.append($divInput);
        $container.append($divContainer);

        $("#area-gioco").append($container);

        // 3. ASCOLTO DELL'EVENTO: Quando l'utente sceglie, risolvi la Promise
        $select.on("change", function () {
            const valoreSelezionato = parseInt($(this).val(), 10);
            // Facoltativo: rimuovi la select se non serve più a schermo dopo la scelta
            // $container.remove(); 

            resolve(valoreSelezionato); // Risolve la promise passando il numero scelto
        });
    });
}

export async function gestisci_input_giocatori() {
    // Se l'elemento esiste già, gestiamo solo i successivi cambi di valore (change)
    if (esiste("#inputNumeroGiocatori")) {

        $("#inputNumeroGiocatori").off("change").on("change", function () {
            const valore = $(this).val();
            //bacheca_messaggio("Al momento ci sono " + valore + " che vogliono giocare...");
            const layout_giocatori_pronto = layout_inserimento_giocatori(valore);
        });

    } else {
        // PRIMA VOLTA: L'elemento non esiste, lo generiamo con nGiocatori
        const $container = $("<div>", { id: "nGiocatori", class: "input-group mb-3" });

        // nGiocatori genera la select con id "#inputNumeroGiocatori" dentro $container e restituisce il primo valore
        const numeroGiocatori = await nGiocatori($container);

        // Mostriamo il messaggio iniziale e generiamo il primo layout giocatori
        const layout_giocatori_pronto = layout_inserimento_giocatori(numeroGiocatori);

        // Rilanciamo la funzione: ora che l'elemento ESISTE, si attiverà il blocco IF 
        // che configurerà l'evento "change" per tutte le volte successive
        gestisci_input_giocatori();
    }
}

export function listaGiocatori() {
    // la lista di giocatori presa dei cookies
    const mapGiocatori = allCookiesStartWith("giocatore");

    if (!mapGiocatori || mapGiocatori.length === 0) {
        console.log("Non ci sono cookies giocatori");
        return;
    }

    // 1. Convertiamo l'array di stringhe in un array di oggetti veri
    let giocatori = mapGiocatori.map(stringa => {
        try {
            return JSON.parse(stringa);
        } catch (e) {
            console.error("Cookie non valido:", stringa);
            return null;
        }
    }).filter(g => g !== null); // Rimuove eventuali cookie corrotti

    return giocatori;
    // qui la lista arriva dal backend
    // return $.ajax({
    //     url: URL_GIOCATORE + '/giocatore/lista',
    //     type: 'GET',
    //     dataType: 'json',
    //     error: function (xhr, status, error) {
    //         console.error('Errore in listaGiocatori:', error);
    //     }
    // });
}

export async function azzeraListaGiocatori() {
    const url = `http://${SERVER_GIOCATORE}/azzeraLista`;

    try {
        const response = await fetch(url, {
            method: 'DELETE' // Rimosso Content-Type perché non c'è un body
        });

        const messaggio = await response.text();

        if (response.ok) {
            return { success: true, message: messaggio };
        } else {
            return { success: false, message: messaggio };
        }
    } catch (error) {
        return { success: false, message: 'Impossibile connettersi al server.' };
    }
}


export async function inserimento_giocatori() {
    await nGiocatori(); // Attende il caricamento

    $("#inputNumeroGiocatori").on("change", async function () {
        //$("#listaGiocatori, #conferma").remove();
        numeroPartecipanti = $(this).val();

        const msgInputBoxCreati = await layout_inserimento_giocatori();
        // console.log(msgInputBoxCreati);

        const msgListaVuota = await azzeraListaGiocatori();
        // console.log(msgListaVuota);
    });
}

export async function aggiungiGiocatori(numeroPartecipanti) {
    let chiamateAjax = [];
    let giocatori = [];
    // azzeraListaGiocatori();
    // console.log("lista giocatori azzerata! \naggiunta di "+numeroPartecipanti+" partecipanti");

    // azzera i cookies dei giocatori di precedente partita
    // pruma di aggiungere i nuovi giocatori
    eliminaCookie("giocatore");

    for (let i = 1; i <= numeroPartecipanti; i++) {
        let nomeGiocatore = $("#Giocatore" + i).val();
        if (nomeGiocatore === "") {
            nomeGiocatore = $("#Giocatore" + i).attr("placeholder");
        }

        // Creiamo l'oggetto giocatore
        let datiGiocatore = {
            "id": i,
            "nome": nomeGiocatore,
            "punti": 0
        };

        // Correggiamo l'inserimento nell'array usando push()
        giocatori.push(datiGiocatore);

        // Se per qualche motivo il modulo non è ancora caricato, attendi il caricamento
        if (!setCookie) {
            console.log("Moduli non ancora pronti, attendo il caricamento...");
            await caricaModuliGestioneCookie();
        }

        // Ora sei sicuro che azzeraCookie esista (se l'import non è fallito)
        if (typeof setCookie === 'function') {
            setCookie("giocatore_" + i, JSON.stringify(datiGiocatore));
        } else {
            console.error("Impossibile utilizzare azzeraCookie: modulo non disponibile.");
        }

        // console.log("Giocatore " + i + " : " + JSON.stringify(datiGiocatore));

        let richiesta = $.ajax({
            url: `${SERVER_GIOCATORE}/aggiungi`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(datiGiocatore)
        });
        chiamateAjax.push(richiesta);
    }

    // Corretto l'errore di sintassi su promise.all() usando jQuery $.when
    return $.when(...chiamateAjax);
}

export function layout_inserimento_giocatori(numeroPartecipanti) {
    // 1. Controllo immediato: se non c'è il tavolo, ci fermiamo subito restituendo false
    if (!esiste("#area-gioco")) {
        console.log("Errore: Elemento #area-gioco non trovato nella pagina.");
        return false;
    }

    // 2. Pulizia del DOM (eseguita solo se il tavolo esiste)
    $("#listaGiocatori, #conferma").remove();

    // 3. Creazione layout
    $("#nGiocatori").append("<div class='container' id='listaGiocatori'></div>");

    for (let i = 1; i <= numeroPartecipanti; i++) {
        let rigaGiocatore = `
                <div class='input-group mb-3'>
                    <div class='input-group-prepend'>
                        <label for='Giocatore${i}' class='input-group-text'>Giocatore n.${i}</label>
                    </div>
                    <input type='text' id='Giocatore${i}' class='<div class='input-group-prepend' placeholder='Giocatore ${i}'>
                </div>`;
        $('#listaGiocatori').append(rigaGiocatore);
    }

    $("#listaGiocatori").after("<div class='col text-center' id='conferma'><button id='gioca' class='btn btn-primary mt-3'>CONFERMA GIOCATORI</button></div>");
    return true; // Layout creato con successo
}