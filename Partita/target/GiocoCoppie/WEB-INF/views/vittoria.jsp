<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vittoria al gioco delle coppie</title>
<link rel="stylesheet" 	href="resources/css/bootstrap.min.css">
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
			
			<a href="/" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">NUOVA PARTITA</a>
			
		</center>
	</div>


	<script type="application/javascript" charset="UTF-8" src="resources/js/jquery-3.6.0.min.js"></script>
	<script type="application/javascript" charset="UTF-8" src="resources/js/bootstrap.min.js"></script>
	<script type="application/javascript" charset="UTF-8" src="resources/js/myScript.js"></script>
</body>
</html>