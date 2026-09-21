// Sostituisci "IL_TUO_IP_SERVER" con l'IP reale o il dominio del server (es. 192.168.1.50 o iltuosito.com)
const BASE = "/"; //`http://${window.location.hostname}:8080`;
const SERVER_INTESTAZIONE=`${BASE}giococoppie/intestazione`;

// Ideale: configurare una variabile d'ambiente, altrimenti mantieni la costante
export async function crea_intestazione() {
    try {
        const response = await fetch(`${SERVER_INTESTAZIONE}/get`);
        
        // Gestione esplicita dell'errore HTTP
        if (!response.ok) {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }
        
        const data = await response.json();

        // Mappatura pulita ID DOM -> Proprietà oggetto
        const elementi = {
            'info-nome': data.nome,
            'info-cognome': data.cognome,
            'info-dataCorrente': data.dataCorrente,
            'info-lingua': data.lingua,
            'info-titolo': data.appTitolo,
            'info-descrizione': data.appDescrizione,
            'info-versione': data.appVersione
        };

        // Aggiornamento sicuro del DOM
        Object.entries(elementi).forEach(([id, valore]) => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.textContent = valore ?? ''; 
            }
        });

        // Aggiorna il tag <title> della scheda del browser
        if (data.appTitolo) {
            document.title = data.appTitolo;
        }

        // Restituisce i dati per usi futuri in altri componenti
        return data;

    } catch (error) {
        console.error("Impossibile caricare l'intestazione:", error.message);
        
        // Opzionale: Mostra un avviso visivo all'utente nel DOM se qualcosa va storto
        const descrizioneEl = document.getElementById('info-descrizione');
        if (descrizioneEl) {
            descrizioneEl.textContent = "Errore durante il caricamento dei dati.";
        }
        
        return null;
    }
}
