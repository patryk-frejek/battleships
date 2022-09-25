//Zabezpieczyć przed podaniem nieprawidłowego pola
//zapewnić działanie małych oraz dużych liter

var loc1 ;
var hits = 0;
var shots = 0;
var ships = [{locations: ["06","16","26"], hits: ["","",""]},
{locations: ["24","34","44"], hits: ["","",""]},
{locations: ["10","11","12"], hits: ["","",""]}];

function init () {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
}
function handleFireButton() {
var guessInput = document.getElementById("guessInput");
var guess = guessInput.value;

}
window.onload = init;

var model = {
    boardSize: 10,
    numShips: 3,
    shipLength:3,
    shipsSunk: 0, 
    ships: [{locations: ["01","02","03"],
    hits: ["","",""]},
    {locations: ["21","22","23"], 
    hits: ["","",""]},
    {locations: ["41","42","43"], 
    hits: ["","",""]}],
    
  


   fire: function(guess){
        for(var i = 0; i< this.numShips;i++){
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);

            if(index >= 0 ){
                ship.hits[index] = "hit";
                view.displayMessage("Trafiony");
                view.hit(guess);

                if(this.isSunk(ship)){
                   this.shipsSunk++;
                   view.displayMessage("Trafiony i zatopiony");
                }
                return true;                
            }else
           
             {
                 view.miss(guess);
                     view.displayMessage("Pudło");
            }
         }
        return false;
    },
    isSunk: function(ship) {
        for(var i =0 ;i < this.shipLength; i++){
           if(ship.hits[i] !== "hit"){
               return false;
           }
           return true;
        }
    }
    
};
var view = {
    displayMessage: function (msg) {
       var message = document.getElementById("message");
        message.innerHTML = msg;
    },

   
    hit: function (location){
        var locationLocal = location;
        if(location[0] == "A" || location[0] == "a" || location[0] == "0" ){loc1 = "0" + location[1];}
        if(location[0] == "B" || location[0] == "b" || location[0] == "1" ){loc1 = "1" + location[1];}
        if(location[0] == "C" || location[0] == "c" || location[0] == "2" ){loc1 = "2" + location[1];}
        if(location[0] == "D" || location[0] == "d" || location[0] == "3" ){loc1 = "3" + location[1];}
        if(location[0] == "E" || location[0] == "e" || location[0] == "4" ){loc1 = "4" + location[1];}
        if(location[0] == "F" || location[0] == "f" || location[0] == "5" ){loc1 = "5" + location[1];}
        if(location[0] == "G" || location[0] == "g" || location[0] == "6" ){loc1 = "6" + location[1];}
        if(location[0] == "H" || location[0] == "h" || location[0] == "7" ){loc1 = "7" + location[1];}
        if(location[0] == "I" || location[0] == "i" || location[0] == "8" ){loc1 = "8" + location[1];}
        if(location[0] == "J" || location[0] == "j" || location[0] == "9" ){loc1 = "9" + location[1];}


        var shot = document.getElementById(loc1);
            shot.setAttribute("class","hit");
            return loc1;

        //ustawia klasę na trafionym polu
        //dodaje do statystyk ilość trafionych strzałów 
        //dodaje do statystyk ogólną ilość strzałów
        //ustawia trafione pole jako pudło dla kolejnych strzałów
        //wyświetla komunikat w displayMessage o trafieniu i współrzędnych pola
    },

    miss: function(location){
        var locationLocal = location;
        if(location[0] == "A" || location[0] == "a" || location[0] == "0" ){loc1 = "0" + location[1];}
        if(location[0] == "B" || location[0] == "b" || location[0] == "1" ){loc1 = "1" + location[1];}
        if(location[0] == "C" || location[0] == "c" || location[0] == "2" ){loc1 = "2" + location[1];}
        if(location[0] == "D" || location[0] == "d" || location[0] == "3" ){loc1 = "3" + location[1];}
        if(location[0] == "E" || location[0] == "e" || location[0] == "4" ){loc1 = "4" + location[1];}
        if(location[0] == "F" || location[0] == "f" || location[0] == "5" ){loc1 = "5" + location[1];}
        if(location[0] == "G" || location[0] == "g" || location[0] == "6" ){loc1 = "6" + location[1];}
        if(location[0] == "H" || location[0] == "h" || location[0] == "7" ){loc1 = "7" + location[1];}
        if(location[0] == "I" || location[0] == "i" || location[0] == "8" ){loc1 = "8" + location[1];}
        if(location[0] == "J" || location[0] == "j" || location[0] == "9" ){loc1 = "9" + location[1];}


        var shot = document.getElementById(loc1);
            shot.setAttribute("class","miss");
            return loc1;
        //ustawia klasę na nietrafionym polu
        //dodaje do statystyk ilość  strzałów 
        //ustawia trafione pole jako pudło dla kolejnych strzałów
        //wyświetla komunikat w displayMessage o pudle i współrzędnych pola
    }
};