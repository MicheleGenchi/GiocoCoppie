export function bacheca_messaggio(selettore,messaggio,time=2000) {
	setTimeout(function () {
					selettore.text(messaggio);
				}, time);
}
