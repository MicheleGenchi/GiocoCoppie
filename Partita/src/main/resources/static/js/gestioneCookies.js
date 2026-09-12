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
  setCookie("giocatore_" + giocatore.id, giocatore, scadenza);
}

export function azzeraCookies(key) {
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



export function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}