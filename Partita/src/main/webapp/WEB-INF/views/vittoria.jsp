<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html lang="it">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
		<link rel="icon" type="image/x-icon" href="/giococoppie/partita/resources/img/coppia.ico">
	</head>

	<body>
		<div class="container" id="area-intestazione" name="area-intestazione">
			<div class="row">
				<div class="col-sm-5">
					<img align="right" height="100" width="100" src="/giococoppie/partita/resources/img/coppia.jpg"
						alt="risorsa non trovata" />
				</div>
				<div class="col-sm-6">
					<h5><b><span id="info-titolo"></span></b></h5>
					<p>
						<strong>Descrizione:</strong><br>
						<span id="info-descrizione"></span></br>
						<b>versione</b> <span id="info-versione"></span><br>
						<b>Lingua</b> <span id="info-lingua"></span><br>
						<b>Data:</b> <span id="info-dataCorrente"></span>
					</p>

					<h5><strong>Programmatore:</strong></h5>
					<p>
						<strong>Nome</strong> <span id="info-nome"></span>
						<strong>Cognome</strong> <span id="info-cognome"></span>
					</p>
				</div>
			</div>
		</div>

		<hr class='linea' align='center' size='1' color='blue' noshade />

		<div class="d-flex justify-content-center container" id="area-errori"></div>

		<div id="bacheca" class="lead">
			<dl id="bacheca" class="row lead ${errore.tipo}" role="alert">
				<dt style="margin-left:5em" class="col-xxl-1">Bacheca messaggi :</dt>
				<dd class="col-md-3" id="messaggio"></dd>
			</dl>
		</div>

		<hr class='linea' align='center' size='1' color='blue' noshade />

		<div class="container">
			<center>
				<h4>Classifica dei giocatori</h4>
				<table style="width: 80%" class="table table-hover">
					<thead class="table-primary">
						<tr>
							<th style="width: 20%" scope="col">id</th>
							<th style="width: 50%" scope="col">Nome</th>
							<th style="width: 30%" scope="col">Punti</th>
						</tr>
					</thead>
					<tbody id="tabella-giocatori">
						<!-- qui vanno le righe dei giocatori da javascript -->

					</tbody>
				</table>

				<a href="/" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">NUOVA PARTITA</a>

			</center>
		</div>
		<link rel="stylesheet" href="/giococoppie/partita/resources/css/bootstrap.min.css">
		<script type="application/javascript" charset="UTF-8"
			src="/giococoppie/partita/resources/js/jquery-3.6.0.min.js"></script>
		<script type="application/javascript" charset="UTF-8"
			src="/giococoppie/partita/resources/js/bootstrap.min.js"></script>
		<script src="/giococoppie/partita/resources/js/vittoria.js"></script>
	</body>

	</html>