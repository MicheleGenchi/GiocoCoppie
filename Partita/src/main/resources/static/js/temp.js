    Promise.all(chiamateAjax)
        .then(function (risposta) {
            console.log("Tutti i giocatori sono stati aggiunti con successo.");
            console.log("risposta " + JSON.stringify(risposta));
            listaGiocatori();
            preparaTavolo();

            // Aggiorna la variabile globale per il futuro
            console.log("idGiocatoreCorrente = " + idGiocatoreCorrente);
            // Passa direttamente il valore corretto alla funzione
            giocatoreCorrente(idGiocatoreCorrente);
        })
        .catch(function (error) {
            console.error("Errore critico: Impossibile aggiungere uno o più giocatori.", error);
            // Qui potresti mostrare un avviso a schermo per l'utente (es. un alert o un modale)
        });
