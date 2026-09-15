<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html lang="it">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
		<link rel="icon" type="image/x-icon" href="resources/img/coppia.ico">
		<link rel="stylesheet" href="resources/css/bootstrap.min.css">
	</head>

	<body>
		<div class="container" id="area-intestazione" name="area-intestazione">
			<div class="row">
				<div class="col-sm-5">
					<img align="right" height="100" width="100" src="resources/img/coppia.jpg"
						alt="risorsa non trovata" />
				</div>
				<div class="col-sm-6">
					<h5><b><span id="info-titolo"></span></b></h5>
					<p>
						<strong>Descrizione:</strong><br>
						<span id="info-descrizione"></span></br>
						<b>versione</b>   <span id="info-versione"></span><br>
						<b>Lingua</b>   <span id="info-lingua"></span><br>
						<b>Data:</b>   <span id="info-dataCorrente"></span>
					</p>

					<h5><strong>Programmatore:</strong></h5>
					<p>
						<strong>Nome</strong>  <span id="info-nome"></span>    
						<strong>Cognome</strong>  <span id="info-cognome"></span>
					</p>
				</div>
			</div>
		</div>

		<hr class='linea' align='center' size='1' color='blue' noshade />

		<div class="d-flex justify-content-center container" id="area-errori"></div>
		<div class="row">
			<div class="col ${errore.tipo}" role="alert">
				<pre><p>          Bacheca messaggi :      <span id="messaggio"></span></p></pre>
			</div>
		</div>

		<hr class='linea' align='center' size='1' color='blue' noshade />

		<div class="container" id="area-gioco">
			<div class="row" id="avvia">
				<div class="col text-center">
					<button id="avvia" type="button" class="btn btn-primary">AVVIA
						GIOCO</button>
				</div>
			</div>
			</br>
			<!-- <hr class='linea' align='center' size='1' color='blue' noshade> -->
		</div>
		
		<script type="application/javascript" charset="UTF-8" src="resources/js/jquery-3.6.0.min.js"></script>
		<script type="application/javascript" charset="UTF-8" src="resources/js/bootstrap.min.js"></script>
		<!-- <script type="application/javascript" charset="UTF-8" src="resources/js/partita.js"></script> -->
	 	<script type="module" src="resources/js/partita.js"></script>
	</body>

	</html>