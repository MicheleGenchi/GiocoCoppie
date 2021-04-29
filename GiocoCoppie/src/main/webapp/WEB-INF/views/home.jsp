<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gioco coppie</title>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
	integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
	crossorigin="anonymous">

</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-sm-5">
				<img align="right" height="100" width="100"
					src="resources/img/coppia.jpg" alt="risorsa non trovata" />
			</div>
			<div class="col-sm-6">
				<h7>Gioco coppie</h7>
				<p>
					data : ${dataCorrente}</br> programmatore : ${mioNome}</br> Lingua :
					${lingua}
				</p>
			</div>
		</div>
	</div>

	<hr class='linea' align='center' size='1' color='blue' noshade />
	<div class="container" id="divAvvia">
		<div class="row" id="rowAvvia">
			<div class="col text-center">
				<button id="avvia" type="button" class="btn btn-primary">AVVIA
					GIOCO</button>
			</div>
		</div>
		</br>
		<!-- <hr class='linea' align='center' size='1' color='blue' noshade> -->
		<div class="d-flex justify-content-center container" id="tavolo"></div>
	</div>
	<div class="row">
		<div class="col ${errore.tipo}" role="alert">${errore.messaggio}</div>
	</div>


	<script src="https://code.jquery.com/jquery-3.6.0.min.js"
		integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
		crossorigin="anonymous"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
		integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
		crossorigin="anonymous"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
		integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
		crossorigin="anonymous"></script>
	<script type="application/javascript" charset="UTF-8" src="resources/js/myScript.js"></script>
</body>
</html>