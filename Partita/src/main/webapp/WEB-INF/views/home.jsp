<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<!DOCTYPE html>
		<html lang="it">

		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>Partita</title>

			<!-- Definizione centralizzata corretta con Context Path -->
			<c:set var="root" value="${pageContext.request.contextPath}/giococoppie/partita" />
			<c:set var="urlFavicon" value="${root}/resources/img/coppia.ico" />
			<c:set var="urlImmagine" value="${root}/resources/img/coppia.jpg" />
			<c:set var="urlBootstrapCss" value="${root}/resources/css/bootstrap.min.css" />
			<c:set var="urlJquery" value="${root}/resources/js/jquery-3.6.0.min.js" />
			<c:set var="urlBootstrapJs" value="${root}/resources/js/bootstrap.min.js" />
			<c:set var="urlPartitaJs" value="${root}/resources/js/partita.js" />
			<c:set var="urlVittoriaJs" value="${root}/resources/js/vittoria.js" />
			<c:set var="urlTabellaCss" value="${root}/resources/css/tabella.css" />
			<c:set var="urlCustomCss" value="${root}/resources/css/custom.css" />
			<c:set var="urljquiCss" value="${root}/resources/css/jquery-ui.css" />
			<link rel="icon" type="image/x-icon" href="${urlFavicon}">
			<link rel="stylesheet" href="${urlBootstrapCss}">
			<link rel="stylesheet" href="${urlCustomCss}">
			<link rel="stylesheet" href="${urlTabellaCss}">
			<link rel="stylesheet" href="${jquiCss}">
		</head>

		<body>
			<!-- Area Intestazione -->
			<div class="container my-4" id="area-intestazione">
				<div class="row align-items-center">
					<div class="col-md-8">
						<!-- Contenitore Flex per affiancare logo e titolo sulla stessa riga -->
						<div class="d-flex align-items-center gap-3">
							<!-- Il logo appare ora per primo -->
							<img height="150" width="150" src="${urlImmagine}" alt="Immagine Coppia"
								class="img-fluid rounded d-block d-md-none" id="logo_mobile" />
							<h1 class="title display-5 m-0" id="info-titolo">Partita</h1>
						</div>
						<p class="mt-3">
							<strong>Descrizione:</strong><br>
							<span id="info-descrizione"></span><br>
							<strong>Versione:</strong> <span id="info-versione"></span><br>
							<strong>Lingua:</strong> <span id="info-lingua"></span><br>
							<strong>Data:</strong> <span id="info-dataCorrente"></span>
						</p>
					</div>
					<div class="col-md-3 text-end" id="logo_desk">
						<!-- Utilizzo della variabile centralizzata per il logo desktop -->
						<img height="150" width="400" src="${urlImmagine}" alt="Immagine Coppia"
							class="col-md-10 text-end d-none d-md-block" />
					</div>
				</div>
			</div>

			<!-- Area Programmatore -->
			<div class="container my-3" id="area-programmatore">
				<div class="row">
					<div class="col">
						<h5 class="fw-bold">Programmatore: <span id="info-nome"></span> <span id="info-cognome"></span>
						</h5>
					</div>
				</div>
			</div>

			<!-- Separatore moderno con utility Bootstrap -->
			<!-- <hr class="border border-primary border-1 opacity-50 my-4" /> -->

			<!-- Area Errori -->
			<div class="container d-flex justify-content-center" id="area-errori"></div>

			<!-- Bacheca Messaggi -->
			<div id="bacheca">
				<dl class="border-top border-bottom border-primary border-1 p-3 opacity-50 row lead alert alert-info" 
				role="alert">
					<dt class="col-sm-3 text-sm-end">Bacheca messaggi :</dt>
					<dd class="col-sm-9" id="messaggio"></dd>
				</dl>
			</div>

			<!-- Separatore moderno con utility Bootstrap -->
			<!-- <hr class="border border-primary border-1 opacity-50 my-4" /> -->

			<!-- Area Gioco -->
			<div class="container my-4" id="area-gioco">
				<div class="row my-3">
					<div class="col text-center">
						<button id="avvia" type="button" class="btn btn-primary btn-lg px-5">AVVIA
							GIOCO</button>
					</div>
				</div>
			</div>

			<!-- JavaScript Link gestiti con variabili centralizzate -->
			<script src="${urlJquery}"></script>
			<script src="${urlBootstrapJs}"></script>
			<script src="${urlPartitaJs}"></script>
		</body>

		</html>