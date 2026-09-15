// --- UTILITY LOCALI ---
import { bacheca_messaggio } from "./utility.js";

const SERVER_IP = window.location.hostname;
const bacheca = $("#messaggio");

let listaGiocatori;

async function caricaModuliGiocatore() {
    try {
        ({
            listaGiocatori
        } = await import(`http://${SERVER_IP}:7002/resources/js/giocatore.js`));
        console.log("Moduli giocatori remoti caricati con successo da:", SERVER_IP);
    } catch (error) {
        console.error("Errore nel caricamento dei moduli GIOCATORE:", error);
    }
}

let crea_intestazione;

async function caricaModuliIntestazione() {
    try {
        ({ crea_intestazione } = await import(`http://${SERVER_IP}:7004/resources/js/intestazione.js`));
        console.log("Moduli intestazione remoti caricati con successo da:", SERVER_IP);
    } catch (error) {
        console.error("Errore nel caricamento dei moduli INTESTAZIONE:", error);
    }
}

// --- INITIALIZATION ---
$(document).ready(async function () {
    // Carica tutti i micro-frontend in parallelo per velocizzare l'avvio
    await Promise.all([
        caricaModuliIntestazione(),
        caricaModuliGiocatore()
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


    const havinto=`<center><h3>COMPLIMENTI ${giocatori[0].nome} HA VINTO </h3></center>`;
    const avetepareggiato="<center><h3>NON HA VINTO NESSUNO</h3></center>";
    const vincitore=(parita)?havinto:avetepareggiato;
    bacheca.append(vincitore);
});