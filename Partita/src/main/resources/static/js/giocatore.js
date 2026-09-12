const URL_GIOCATORE = "http://localhost:7002";

import { aggiornaPunteggioCookie, getCookie } from "./gestioneCookies.js";
import { setCookie } from "./gestioneCookies.js";
import { azzeraCookies } from "./gestioneCookies.js";

export function cerca(id) {
    return $.ajax({
        url: `${URL_GIOCATORE}/giocatore/cerca`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ "id": id }),
        error: function (xhr, status, errore) {
            console.error("Errore durante la ricerca:", errore);
        }
    });
}

export function aggiornaPunteggio(giocatore) {
    // Rimosso il riferimento a 'punti' non definito. 
    // Ora usa direttamente l'oggetto giocatore passato come parametro.
    $("#nomeGiocatore").val(giocatore.nome);
    $("#puntiGiocatore").prop("disabled", false).val(giocatore.punti).prop("disabled", true);
    // aggiorna backend perchè quando cambio giocatore perdo il suo punteggio
    // abbiamo due possibiltà o agisco sul backend o memorizzo in locale (coockies) il giocatore con il suo punteggio
    
    // nei cookie
    aggiornaPunteggioCookie(giocatore);

    // sul backend
    // $.ajax({
    //     url: `${URL_GIOCATORE}/giocatore/aggiornaPunteggio`,
    //     type: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify({ "id": id }),
    //     error: function (xhr, status, errore) {
    //         console.error("Errore durante la ricerca:", errore);
    //     }
    // });
}

export function giocatoreCorrente(i) {
    console.log("Inizio recupero giocatore. ID utilizzato:", giocatore.id);
    giocatore=getCookie(i);
    var idNumerico = parseInt(igiocatore.id, 10);
    if (isNaN(idNumerico)) {
        console.error("ERRORE: ID non valido per la ricerca.");
        return;
    }

    $("#giocatore").remove();
    var htmlGiocatore = `
        <div id='giocatore' class='container text-center my-3'>
            <label style='font-size: 16px; margin-left: 20px' for='nomeGiocatore' class='col-md-4 badge badge-pill badge-secondary'>GIOCATORE : </label>
            <input type='text' id='nomeGiocatore' class='mx-2' disabled value='${giocatore.nome}'>
            
            <label style='font-size: 16px; margin-left: 20px' for='puntiGiocatore' class='col-md-4 badge badge-pill badge-secondary'>PUNTI : </label>
            <input type='text' id='puntiGiocatore' class='mx-2' disabled value='${giocatore.punti}'>
        </div>
    `;
    $("#carte").before(htmlGiocatore);
}

export function nGiocatori() {
    $("#tavolo").append("<div id='nGiocatori' class='input-group mb-3'></div>");
    $("#tavolo #nGiocatori").append("<label for='inputNumeroGiocatori' class='input-group-text'>Giocatori</label>");
    $("#nGiocatori").append("<select class='custom-select' id='inputNumeroGiocatori'></select>");
    $("#inputNumeroGiocatori").append("<option selected disabled>Choose...</option>");
    for (let i = 1; i <= 10; i++) {
        $("#inputNumeroGiocatori").append("<option value='" + i + "'>" + i + "</option>");
    }
}

export function inserimento_NomiGiocatori(numeroPartecipanti) {
    var deferred = $.Deferred();

    const esiste = (selettore) => $(selettore).length > 0;

    // 1. Se il contenitore NON esiste, crealo dentro il body o un elemento sicuro
    if (!esiste("#listaGiocatori")) {
        // Se non hai #tavolo, usa un altro contenitore esistente o direttamente il body
        let contenitorePadre = esiste("#tavolo") ? $("#tavolo") : $("body");
        contenitorePadre.append("<div class='container mt-3' id='listaGiocatori'></div>");
    } else {
        // 2. Se esiste già, svuotalo per i nuovi giocatori
        $("#listaGiocatori").empty();
    }

    // 3. Genera i nuovi input box
    for (let i = 1; i <= numeroPartecipanti; i++) {
        $('#listaGiocatori').append("<div class='row mb-2'><div class='input-group col-md-6' id='divGiocatore" + i + "'></div></div>");
        $("#divGiocatore" + i).append("<div class='input-group-prepend'><label for='Giocatore" + i + "' class='input-group-text'>Giocatore n." + i + "</label></div>");
        $("#divGiocatore" + i).append("<input type='text' id='Giocatore" + i + "' class='form-control' placeholder='Nome Giocatore " + i + "'></input>");
    }

    // 4. Gestisci il bottone di conferma
    $("#divGioca").remove(); // Rimuove il vecchio bottone se presente
    $("#listaGiocatori").after("<div class='col text-center mt-3' id='divGioca'><button id='gioca' class='btn btn-primary'>CONFERMA GIOCATORI</button></div>");

    // 5. Risolve e ritorna la promise
    return deferred.resolve("input box per giocatori creati!").promise();
}


export function listaGiocatori() {
    return $.ajax({
        url: URL_GIOCATORE + '/giocatore/lista',
        type: 'GET',
        dataType: 'json',
        error: function (xhr, status, error) {
            console.error('Errore in listaGiocatori:', error);
        }
    });
}

export async function azzeraListaGiocatori() {
    // Sostituisci l'URL con l'indirizzo reale del tuo server e controller
    const url = URL_GIOCATORE+'/giocatore/azzeraLista'; 

    try {
        const response = await fetch(url, {
            method: 'DELETE', // Specifica il metodo DELETE
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Legge il testo inviato dal server (es. "La lista dei giocatori è stata svuotata con successo.")
        const messaggio = await response.text(); 

        if (response.ok) {
            console.log('Successo:', messaggio);
            // Qui puoi aggiornare l'interfaccia grafica (es. svuotare una tabella HTML)
        } else {
            console.log(`Errore del server (${response.status}):`+messaggio);
        }
    } catch (error) {
        console.log('Errore di rete o di connessione:'+error);
    }
}

export function inserimento_giocatori() {
    nGiocatori(); // Layout HTML di inserimento
    let numeroPartecipanti = 0;

    // Usiamo 'input' invece di 'change' per intercettare le modifiche in tempo reale
    $("#inputNumeroGiocatori").on("input", function () {
        // Rimuove gli elementi generati in precedenza per evitare duplicati
        $("#listaGiocatori").remove();
        $("#divGioca").remove();

        // Converte l'input in numero intero (base 10)
        numeroPartecipanti = parseInt($(this).val(), 10);
        console.log("Numero partecipanti: " + numeroPartecipanti);

        // Controllo di validità: procedi solo se il numero è maggiore di 0 e valido
        if (!isNaN(numeroPartecipanti) && numeroPartecipanti > 0) {
            inserimento_NomiGiocatori(numeroPartecipanti)
                .done(function (msgInputBoxCreati) {
                    console.log(msgInputBoxCreati);
                })
                .fail(function (errore) {
                    console.error("Errore durante la creazione dei box: ", errore);
                });
        }
    });
}


export function aggiungiGiocatori(numeroPartecipanti) {
    let chiamateAjax = [];
    let giocatori=[];
    azzeraListaGiocatori();
    console.log("lista giocatori azzerata!");
    
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

        setCookie("giocatore_" + i,JSON.stringify(datiGiocatore));

        console.log("Giocatore " + i + " : " + JSON.stringify(datiGiocatore));
        
        let richiesta = $.ajax({
            url: URL_GIOCATORE + "/giocatore/aggiungi",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(datiGiocatore)
        });
        chiamateAjax.push(richiesta);
    }

    // Corretto l'errore di sintassi su promise.all() usando jQuery $.when
    return $.when(...chiamateAjax);
}
