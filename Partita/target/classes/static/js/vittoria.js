// Server IP ricavato dinamicamente dall'URL della pagina corrente
const BASE = "/"; //`http://${window.location.hostname}:8080`;
const SERVER_PARTITA = `${BASE}giococoppie/partita`;
const SERVER_GIOCATORE = `${BASE}giococoppie/giocatore`;
const SERVER_CARTE=`${BASE}giococoppie/carte`;
const SERVER_INTESTAZIONE=`${BASE}giococoppie/intestazione`;

const bacheca = $("#messaggio");


let listaGiocatori;

async function caricaModuliGiocatore() {
    try {
        ({
            listaGiocatori
        } = await import(`${SERVER_GIOCATORE}/resources/js/giocatore.js`));
        console.log("Moduli giocatori remoti caricati con successo da:", SERVER_GIOCATORE);
    } catch (error) {
        console.error("Errore nel caricamento dei moduli GIOCATORE:", error);
    }
}

let crea_intestazione;

async function caricaModuliIntestazione() {
    try {
        ({ crea_intestazione } = await import(`${SERVER_INTESTAZIONE}/resources/js/intestazione.js`));
        console.log("Moduli intestazione remoti caricati con successo da:", SERVER_INTESTAZIONE);
    } catch (error) {
        console.error("Errore nel caricamento dei moduli INTESTAZIONE:", error);
    }
}

// --- UTILITY LOCALI ---
async function caricaModuliUtility() {
    try {
        ({ bacheca_messaggio } = await import(`${SERVER_PARTITA}/resources/js/utility.js`));
        console.log("Moduli intestazione remoti caricati con successo da:", SERVER_PARTITA);
    } catch (error) {
        console.error("Errore nel caricamento dei moduli INTESTAZIONE:", error);
    }
}

// --- INITIALIZATION ---
$(document).ready(async function () {
    // Carica tutti i micro-frontend in parallelo per velocizzare l'avvio
    await Promise.all([
        caricaModuliIntestazione(),
        caricaModuliGiocatore(),
        caricaModuliUtility
    ]);

    crea_intestazione();

    let giocatori = listaGiocatori();
    if (giocatori.length === 0) {
        console.log("Non ci sono cookies giocatori");
        return;
    }

    let parita=false;
    // 2. ORDINA L'ARRAY IN BASE AI PUNTI (Ordine decrescente: dal più alto al più basso)
    giocatori.sort((a, b) => {
        // 1. Se i punti sono diversi, ordina per punti (decrescente)
        if (b.punti !== a.punti) {
            return b.punti - a.punti;
        }
        
        parita=true;
        return a.nome.localeCompare(b.nome);
    });

    let html = "";
    giocatori.forEach(corrente => {
        html += `<tr>`;
        html += `<td style="width: 20%">${corrente.id}</td>`;
        html += `<td style="width: 50%">${corrente.nome}</td>`;
        html += `<td style="width: 20%">${corrente.punti}</td>`;
        html += `</tr>`;
    });
    $("#tabella-giocatori").prepend(html);


    const havinto=`<center><h3>COMPLIMENTI <span stryle="font-variant: small-caps;" class='id' id='vincitore'>${giocatori[0].nome}</span> HA VINTO </h3></center>`;
    const avetepareggiato="<center><h3>NON HA VINTO NESSUNO</h3></center>";
    const vincitore=(parita)?avetepareggiato:havinto;
    bacheca.append(vincitore);
});