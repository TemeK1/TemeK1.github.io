"use strict";

class App extends React.Component {
    constructor(props) {
      super(props);
    }

    this.state = {

    }

    render() {
      return (
        <div>joo11</div>
      );
    }
}

class Dice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.rollDice = this.rollDice.bind(this);
  }


    rollDice(size) {
      let luku = 1;
      let dResult = document.getElementById('result');
      if (dResult.firstChild) {
        dResult.removeChild(dResult.firstChild);
      }
      luku += Math.floor(Math.random() * size);

      let teksti = document.createTextNode("1d" + size + ": " + luku);
      let p = document.createElement('p');
      p.appendChild(teksti);
      dResult.appendChild(p);
    }

    diceListeners() {
      let divDice = document.getElementById('dices');
      let toggle = document.getElementById('toggleDice');

      let dices = divDice.getElementsByTagName('img');

      for (let i = 0; i < dices.length; i++) {
        dices[i].addEventListener("click", function(e) {
          e.preventDefault();
          let sides = parseInt(dices[i].alt);
          rollDice(sides);
        });
      }

      toggle.addEventListener("click", function(e) {
        e.preventDefault();
        if (document.getElementsByClassName('hidden').length > 0) {
          divDice.classList.remove('hidden');
          return;
        }
        divDice.setAttribute('class', 'hidden');
      });

    }

  render() {
    return (
      <div>joo</div>
    );
  }
}

class Pie extends React.Component {

  constructor(props) {
  super(props);

  this.state = {
    options: {
  labels: ["d4", "d6", "d8", "d10", "d12", "d20"],
    responsive: [{
      breakpoint: 480,
      options: {
      chart: {
        width: 300
      },
      legend: {
        position: 'bottom'
      }
      }
    }]
    },
    series: [1, 1, 1, 1, 1, 1]
  }

  }


  render() {
  return (
    <div>
      <div id="chart1">
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width="380" />
      </div>
      <div id="html-dist1"></div>
    </div>
  );
  }
}

ReactDOM.render(
    <div>
    <App />
    </div>,
  document.getElementById('result')
);

const domContainer1 = document.querySelector('#pieGraph');
ReactDOM.render(React.createElement(Pie), domContainer1);
