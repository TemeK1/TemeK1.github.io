"use strict";

function rollDice(size) {
  let luku = 1;
  luku += Math.floor(Math.random() * size);
  console.log(luku);
}

function diceListeners() {
  let divDice = document.getElementById('dices');

  let dices = divDice.getElementsByTagName('img');

  for (let i = 0; i < dices.length; i++) {
    dices[i].addEventListener("click", function(e) {
      e.preventDefault();
      let sides = parseInt(dices[i].getAttribute('alt'));
      rollDice(sides);
    });
  }

}

window.onload = function() {
  diceListeners();
}
