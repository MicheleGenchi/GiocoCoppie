<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<!DOCTYPE html>
		<html lang="it">

		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>Partita</title>
			<!-- Corretti i tag c:url -->
			<link rel="icon" type="image/x-icon"
				href="/giococoppie/partita/resources/img/coppia.ico">
		</head>

		<body> <!-- Corretto da <dy> -->
			<div class="container" id="area-intestazione" name="area-intestazione">
				<div class="row">
					<div class="col-sm-5">
						<img align="right" height="100" width="100"
							src="/giococoppie/partita/resources/img/coppia.jpg" alt="coppia.jpg" />
					</div>
					<div class="col-sm-6">
						<h5><b><span id="info-titolo"></span></b></h5>
						<p>
							<strong>Descrizione:</strong><br>
							<span id="info-descrizione"></span><br> <!-- Corretto </br> -->
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
				<dl class="row lead ${errore.tipo}" role="alert">
					<dt style="margin-left:5em" class="col-xxl-1">Bacheca messaggi :</dt>
					<dd class="col-md-3" id="messaggio"></dd>
				</dl>
			</div>

			<hr class='linea' align='center' size='1' color='blue' noshade />

			<div class="container" id="area-gioco">
				<!-- Rimosso ID duplicato dal div per lasciarlo solo sul bottone -->
				<div class="row">
					<div class="col text-center">
						<button id="avvia" type="button" class="btn btn-primary">AVVIA GIOCO</button>
					</div>
				</div>
				<br> <!-- Corretto </br> -->
			</div>

			<!-- JS di Bootstrap e script personalizzato -->
			<link rel="stylesheet" href="/giococoppie/partita/resources/css/bootstrap.min.css">
			<script src="/giococoppie/partita/resources/js/jquery-3.6.0.min.js"></script>
			<script src="/giococoppie/partita/resources/js/bootstrap.min.js"></script>
			<script src="/giococoppie/partita/resources/js/partita.js"></script>
		</body>

		</html>