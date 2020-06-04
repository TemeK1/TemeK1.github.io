"use strict";

function rollDice(size) {
  let luku = 1;
  let dResult = document.getElementById('result');
  dResult.removeChild(dResult.firstChild);
  luku += Math.floor(Math.random() * size);

  let teksti = document.createTextNode("1d" + size + ": " + luku);
  let p = document.createElement('p');
  p.appendChild(teksti);
  dResult.appendChild(p);
}

function diceListeners() {
  let divDice = document.getElementById('dices');

  let dices = divDice.getElementsByTagName('img');

  for (let i = 0; i < dices.length; i++) {
    dices[i].addEventListener("click", function(e) {
      e.preventDefault();
      let sides = parseInt(dices[i].alt);
      rollDice(sides);
    });
  }

}

window.onload = function() {
  diceListeners();
}
