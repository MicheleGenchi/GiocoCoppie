const scadenza = 30;

export function setCookie(cname, cvalue) {
  const d = new Date();
  d.setTime(d.getTime() + (scadenza * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function aggiornaPunteggioCookie(giocatore) {
  setCookie(`giocatore_${giocatore.id}`, JSON.stringify(giocatore));
}

export function azzeraCookie(key) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    // 2. Pulisci gli spazi vuoti all'inizio del nome del cookie
    const cookie = cookies[i].trim();

    // 3. Controlla se il cookie inizia con "giocatore"
    if (cookie.startsWith(key)) {
      // 4. Estrai il nome esatto del cookie
      const nomeCookie = cookie.split('=')[0];

      // 5. Azzera il cookie impostando una data di scadenza passata (1 Jan 1970)
      document.cookie = nomeCookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }
}


export function checkCookie(key) {
  let esiste = getCookie(key) != null ? true : false;
  // console.log(`check cookie ${key} `+esiste?"esiste":"non esiste");
  return esiste;
}

export function allCookiesStartWith(prefisso) {
  const cookieGiocatori = document.cookie
    .split('; ')
    .reduce((acc, cookie) => {
      const [chiave, valore] = cookie.split('=');
      if (chiave && chiave.startsWith(prefisso)) {
        acc.push(decodeURIComponent(valore || '')); // Aggiunge solo il valore all'array
      }
      return acc;
    }, []); // Inizializzato come array

  console.log(`Tutti i cookie che iniziano con "${prefisso}":`, cookieGiocatori);
  return cookieGiocatori;
}



