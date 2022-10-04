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
	model.generateShipsLocations();
	var guessCell = document.querySelectorAll("#board td");
	guessCell.forEach((element) => {
		element.onclick = handleClickCell;
		element.onmouseover = handleCurrentCell;
	});
}

function handleClickCell(eventObj) {
	var cell = eventObj.target;
	var guessInput = document.getElementById("guessInput");
	guessInput.value = cell.id + "";
	var guessClass = document.getElementById(cell.id);
	guessClass = guessClass.className + "";
	var guess = guessInput.value;
	console.log(guess);
	if (guess[0] > model.boardSize - 1 || guess[1] > model.boardSize - 1) {
		alert("Ups.Pole poza mapą");
	} else if (guessClass !== "") {
		alert("Strzelałeś już w to miejsce!");
	} else if (model.gameOver == true) {
		alert("gameover");
	} else {
		model.fire(guess);
	}
}

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	console.log("guess = " + guess);
	controller.processGuess(guess);
	guessInput.value = "";
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
				console.log("gameover");
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
	boardSize: 10,
	numShips: 5,
	shipLength: 3,
	shipsSunk: 0,
	gameOver: false,
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

	isSunk: function (ship) {
		var hits1 = 0;
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] == "hit") {
				hits1++;
				console.log("hits1 = " + hits1);
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
				console.log(controller.guesses);
				if (this.isSunk(ship)) {
					this.shipsSunk++;
					view.displayMessage("Trafiony i zatopiony");
					if (this.shipsSunk === this.numShips) {
						console.log("gameover");
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
				console.log(controller.guesses);
				view.miss(guess);
				view.displayMessage("Pudło");
			}
		}
		controller.guesses = controller.guesses + 1;

		return false;
	},
	generateShipsLocations: function () {
		var locations; //tworzę zmienną lokalną locations
		for (var i = 0; i < this.numShips; i++) {
			// wyk. pętlę tyle razy ile statków ma być w grze.
			do {
				locations = this.generateShip(); //przypisuj nowowygenerowany statek z metody generateShip do zmiennej lokalnej.
			} while (this.collision(locations)); // rób to tak długo aż metoda collision odda FALSE  po sprawdzeniu lokacji.
			this.ships[i].locations = locations; // po zakończeniu pętli do,while zapisz do właściwości ships.locations  wygenerowany statek
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
};
//////////////////////VIEW //////////////////VIEW//////////////VIEW///////////////////////////////////
var view = {
	displayMessage: function (msg) {
		var message = document.getElementById("message");
		message.innerHTML = msg;
	},
	hit: function (location) {
		var locationLocal = location;
		var shot = document.getElementById(location);
		shot.setAttribute("class", "hit");
	},
	miss: function (location) {
		var shot = document.getElementById(location);
		shot.setAttribute("class", "miss");
	},
	clear: function () {
		const allCells = document.querySelectorAll("#board td");
		allCells.forEach((element) => {
			element.classList.remove("hit");
			element.classList.remove("miss");
		});
		console.log("zatopione statki" + model.shipsSunk);
		controller.guesses = 0;
		model.shipsSunk = 0;
		model.gameOver = false;
	},
};

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
	view.clear();
	model.generateShipsLocations();
	console.log("zatopione statki" + model.shipsSunk);
}
