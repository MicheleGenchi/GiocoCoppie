<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vittoria al gioco delle coppie</title>
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
	<div class="container">
		<center>
			<h4>Classifica dei giocatori</h4>
			<table style="width: 40%" class="table table-hover">
				<thead class="table-primary">
					<tr>
						<th style="width: 30%" scope="col">Nome</th>
						<th style="width: 10%" scope="col">Punti</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${giocatori.lista}" var="giocatore">
						<tr>
							<giocatore>
							<td><c:out value="${giocatore.nome}" /></td>
							<td><c:out value="${giocatore.punti}" /></td>
						</tr>
						</giocatore>
					</c:forEach>
				</tbody>
			</table>
		</center>
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
</body>
</html>