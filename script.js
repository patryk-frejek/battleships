window.onload = init;
function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	//sprawdzenie czu pierwsza liczba zawiera sie w zakresie od 0 do 9
	var row = alphabet.indexOf(guess[0]);
	var column = Number(guess[1]);
	var guessOut = alphabet.indexOf(guess[0]) + guess[1];

	if (guess === null || guess.length !== 2) {
		alert("Podano zbyt krótkie współrzędne ");
	} else if (isNaN(column) || isNaN(row)) {
		alert("Podano nieprawidłowe współrzędne.Podaj literę oraz liczbę");
	} else if (
		row < 0 ||
		row >= model.boardSize ||
		column < 0 ||
		column >= model.boardSize ||
		isNaN(column) ||
		isNaN(row)
	) {
		alert("Ups.Pole poza mapą");
	} else if (document.getElementById(guessOut).className !== "") {
		view.displayMessage("Strzelałeś już w to miejsce");
	} else if (model.gameOver == true) {
		view.displayMessage("Gra skończona :)");
	} else {
		this.guesses = this.guesses + 1;
		return alphabet.indexOf(guess[0]) + guess[1];
	}
	return null;
}
function parseGuessIndicator(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	return alphabet[guess[0]] + guess[1];
}
//  ///////////////////////////////////////////////////////////////////////////////////////TUTAJ KONCZYC
function init() {
	let body = document.querySelector("body");
	body.onmousemove = ballPositioning;
	const fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	const rstButton = document.querySelector(".rstBtn");
	rstButton.onclick = resetButton;
	model.generateShipsLocations(model.shipLength);
	var guessCell = document.querySelectorAll("#board td");
	guessCell.forEach((element) => {
		element.onclick = handleClickCell;
		element.onmouseover = handleCurrentCell;
	});
	const playerNameInput = document.getElementById("player-name");
	playerNameInput.onchange = getPlayerName;
}

function handleClickCell(eventObj) {
	var cell = eventObj.target;
	var guessInput = document.getElementById("guessInput");
	guessInput.value = cell.id + "";
	var guessClass = document.getElementById(cell.id);
	guessClass = guessClass.className + "";
	var guess = guessInput.value;

	if (guess[0] > model.boardSize - 1 || guess[1] > model.boardSize - 1) {
		alert("Ups.Pole poza mapą");
	} else if (guessClass !== "") {
		alert("Strzelałeś już w to miejsce!");
	} else if (model.gameOver == true) {
		alert("gameover");
	} else {
		model.shipLength == 3
			? model.fire(guess)
			: model.shipLength == 5
			? model.fire5(guess)
			: false;
	}
	displayStats();
}

function displayStats() {
	var currentShots = document.querySelector(".score__currentShots");
	currentShots.innerHTML = controller.guesses;
	var shipsSunk = document.querySelector(".score__shipsSunk");
	shipsSunk.innerHTML = model.shipsSunk;
}
function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
}
function getPlayerName(name) {
	model.playerName = name.target.value;
}
function ballPositioning(event) {
	var ball = document.querySelector("#ball");
	var x = event.clientX + window.pageXOffset;
	var y = event.clientY + window.pageYOffset;
	setTimeout(() => {
		ball.style.left = x + -15 + "px";
		ball.style.top = y + -15 + "px";
	}, 15);
}

function handleCurrentCell(element) {
	var currentCell = document.getElementById("currentCell");
	currentCell.innerHTML = parseGuessIndicator(element.target.id);
}

function resetButton() {
	model.shipLength == 3
		? model.generateShipsLocations(3)
		: model.shipLength == 5
		? model.generateShipsLocations(5)
		: false;
	model.shipsSunk == model.numShips ? view.saveScoreTable() : false;
	view.clear();
	displayStats();
}
//Score array io objects construction
function Record(name, score) {
	this.name = name;
	this.score = score;
}
window.onload = init;

////////CONTROLER/CONTROLER///CONTROLER///CONTROLER///CONTROLER//////////////////////////////////////////
var controller = {
	guesses: 0,
	processGuess: function (guess) {
		if (typeof guess) {
			var location = parseGuess(guess);
		}
		if (location) {
			this.guesses = this.guesses + 1;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				model.gameOver = true;
				view.displayMessage(
					"Brawo. Zatopiłeś " +
						model.numShips +
						" statki w " +
						this.guesses +
						"próbach"
				);
			}
		}
	},
};
////////////////////////MODEL///MODEL//MODEL//MODEL///////////////////////////////////////////////////////
var model = {
	boardSize: 4,
	numShips: 2,
	shipLength: 3,
	shipsSunk: 0,
	gameOver: false,
	playerName: "Player",
	ranking: [],
	// dodać to w formie  kilku konfiguracji odgórnych jakie statki. Następnie w zmiennej binarnej umieścić typy konfiguracji
	//za pomocą pętli na bieżąco generować shipsLocations
	ships: [
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
	],
	ships4: [
		{
			locations: ["", "", "", ""],
			hits: ["", "", "", ""],
		},
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
		{
			locations: ["", "", ""],
			hits: ["", "", ""],
		},
	],
	ships5: [
		{
			locations: ["", "", "", "", ""],
			hits: ["", "", "", "", ""],
		},
		{
			locations: ["", "", "", "", ""],
			hits: ["", "", "", "", ""],
		},
		{
			locations: ["", "", "", "", ""],
			hits: ["", "", "", "", ""],
		},
		{
			locations: ["", "", "", "", ""],
			hits: ["", "", "", "", ""],
		},
		{
			locations: ["", "", "", "", ""],
			hits: ["", "", "", "", ""],
		},
		{
			locations: ["", "", "", "", ""],
			hits: ["", "", "", "", ""],
		},
	],

	isSunk: function (ship) {
		let hits1 = 0;
		for (let i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] == "hit") {
				hits1++;
				if (hits1 == this.shipLength) {
					return true;
				}
			}
		}
	},

	fire: function (guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayMessage("Trafiony");
				view.hit(guess);
				controller.guesses = controller.guesses + 1;
				if (this.isSunk(ship)) {
					this.shipsSunk++;
					view.displayMessage("Trafiony, zatopiony");
					if (this.shipsSunk === this.numShips) {
						model.gameOver = true;
						view.displayMessage(
							"Brawo. Zatopiłeś " +
								model.numShips +
								" statki w " +
								controller.guesses +
								"próbach"
						);
					}
				}
				return true;
			} else {
				view.miss(guess);
				view.displayMessage("Pudło");
			}
		}
		controller.guesses = controller.guesses + 1;

		return false;
	},
	fire5: function (guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships5[i];
			var index = ship.locations.indexOf(guess);

			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayMessage("Trafiony");
				view.hit(guess);
				controller.guesses = controller.guesses + 1;
				if (this.isSunk(ship)) {
					this.shipsSunk++;
					view.displayMessage("Trafiony, zatopiony");
					if (this.shipsSunk === this.numShips) {
						model.gameOver = true;
						view.displayMessage(
							"Brawo. Zatopiłeś " +
								model.numShips +
								" statki w " +
								controller.guesses +
								"próbach"
						);
					}
				}
				return true;
			} else {
				view.miss(guess);
				view.displayMessage("Pudło");
			}
		}
		controller.guesses = controller.guesses + 1;

		return false;
	},
	generateShipsLocations: function (shipLength) {
		var locations; //tworzę zmienną lokalną locations
		for (var i = 0; i < this.numShips; i++) {
			// wyk. pętlę tyle razy ile statków ma być w grze.
			// ///////////////////////////////////////////////////////Pętla do generacji statków o długości 3
			if (shipLength == 3) {
				do {
					locations = this.generateShip(); //przypisuj nowowygenerowany statek z metody generateShip do zmiennej lokalnej.
				} while (this.collision(locations)); // rób to tak długo aż metoda collision odda FALSE  po sprawdzeniu lokacji.
				this.ships[i].locations = locations; // po zakończeniu pętli do,while zapisz do właściwości ships.locations  wygenerowany statek
			}

			// ///////////////////////////////////////////////////////Pętla do generacji statków o długości 5
			if (shipLength == 5) {
				do {
					locations = this.generateShip(5); //przypisuj nowowygenerowany statek z metody generateShip do zmiennej lokalnej.
				} while (this.collision5(locations)); // rób to tak długo aż metoda collision odda FALSE  po sprawdzeniu lokacji.
				this.ships5[i].locations = locations; // po zakończeniu pętli do,while zapisz do właściwości ships.locations  wygenerowany statek
			}

			// ///////////////////////////////////////////////////////Pętla do generacji statków o długości 2
		}
	},
	generateShip: function () {
		var direction = Math.floor(Math.random() * 2);
		var row, col;
		if (direction === 1) {
			//wygeneruj początkowe pole statku w poziomie
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		} else {
			//wygeneruj początkowe pole pionowego statku
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction == 1) {
				newShipLocations.push(row + "" + (col + i));
				//kolejne pola poziomego statku
			} else {
				newShipLocations.push(row + i + "" + col);
				//kolejne pola pionowego statku
			}
		}
		return newShipLocations;
	},
	generateShip5: function (shipLength) {
		var direction = Math.floor(Math.random() * 2);
		var row, col;
		if (direction === 1) {
			//wygeneruj początkowe pole statku w poziomie
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - shipLength));
		} else {
			//wygeneruj początkowe pole pionowego statku
			row = Math.floor(Math.random() * (this.boardSize - shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction == 1) {
				newShipLocations.push(row + "" + (col + i));
				//kolejne pola poziomego statku
			} else {
				newShipLocations.push(row + i + "" + col);
				//kolejne pola pionowego statku
			}
		}
		return newShipLocations;
	},
	collision: function (locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i]; //statek 0
			for (var j = 0; j < locations.length; j++) {
				//sprawdza kolejno 3 komórki tablicy locations
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
					//sprawdza na którym indeksie znajduje się współrzędna 1,2 lub 3 tablicy locations
					//w przypadku nie znalezienia żadnego indeksu oddaje wartość -1 i nie ma kolizji
				}
			}
		}
		return false;
	},
	collision5: function (locations) {
		for (var i = 0; i < 5; i++) {
			var ship = model.ships5[i]; //statek 0
			for (var j = 0; j < locations.length; j++) {
				//sprawdza kolejno 3 komórki tablicy locations
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
					//sprawdza na którym indeksie znajduje się współrzędna 1,2 lub 3 tablicy locations
					//w przypadku nie znalezienia żadnego indeksu oddaje wartość -1 i nie ma kolizji
				}
			}
		}
		return false;
	},
};
//////////////////////VIEW //////////////////VIEW//////////////VIEW///////////////////////////////////
var view = {
	displayMessage(msg) {
		var message = document.getElementById("message");
		message.innerHTML = msg;
		displayStats();
	},
	hit(location) {
		var shot = document.getElementById(location);
		shot.setAttribute("class", "hit");
	},
	miss(location) {
		var shot = document.getElementById(location);
		shot.setAttribute("class", "miss");
	},
	clear() {
		const allCells = document.querySelectorAll("#board td");
		allCells.forEach((element) => {
			element.classList.remove("hit");
			element.classList.remove("miss");
		});
		controller.guesses = 0;
		model.shipsSunk = 0;
		model.gameOver = false;

		for (let i = 0; i < model.numShips; i++) {
			for (let j = 0; j < model.ships[i].hits.length; j++) {
				model.ships[i].hits[j] = "";
			}
			for (let j = 0; j < model.ships5[i].hits.length; j++) {
				model.ships5[i].hits[j] = "";
			}
		}
	},
	saveScoreTable() {
		var playerResultRow = document.querySelectorAll(".playerResultRow");
		var rankingName = document.querySelectorAll(".ranking__name");
		var rankingScore = document.querySelectorAll(".ranking__score");
		model.ranking.push(new Record(model.playerName, controller.guesses));
		model.ranking.sort((a, b) => {
			return a.score - b.score;
		});
		for (let i = 0; i < model.ranking.length; i++) {
			rankingName[i].innerHTML = model.ranking[i].name;
			rankingScore[i].innerHTML = model.ranking[i].score;
			playerResultRow[i].removeAttribute("hidden");
		}
	},
};
