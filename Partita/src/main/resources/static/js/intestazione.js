const URL_INTESTAZIONE="http://localhost:7004";

export function crea_intestazione() {
	$.getJSON(URL_INTESTAZIONE+'/intestazione/get', function (data) {
		console.log("Intestazione:", JSON.stringify(data));
		// 1. Inserisci i dati nei rispettivi elementi HTML
		$('#info-nome').text(data.nome);
		$('#info-cognome').text(data.cognome);
		$('#info-dataCorrente').text(data.dataCorrente);
		$('#info-lingua').text(data.lingua);
		$('#info-titolo').text(data.appTitolo);
		$('#info-descrizione').text(data.appDescrizione);
		$('#info-versione').text(data.appVersione);

		// 2. Mostra il contenitore (se era nascosto)
		// $('#contenitore-intestazione').fadeIn();

	}).fail(function (xhr, status, error) {
		console.log("Dettagli errore:"+ error);
	});
}