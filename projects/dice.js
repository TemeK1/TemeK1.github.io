"use strict";

class App extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Dice />
      );
    }
}

class Dice extends React.Component {
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
      series: [0, 0, 0, 0, 0, 0],
      size: 0,
      status: "hidden"
    }

    this.rollDice = this.rollDice.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus() {
    if (this.state.status == 'hidden') {
      this.setState({
        "status": ''
      }, function () {
        this.updateItem(this.state);
      }.bind(this));
    } else {
      this.setState({
          status: "hidden"
      }, function () {
        this.updateItem(this.state);
      }.bind(this));
    }
  }

   //varmuuden vuoksi tämä, halutaan varmistua siitä, etteivät
   //tilamuutokset laahaa yhtä askelta perässä.
   updateItem() {
    this.setState(this.state);
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

  render() {
    let luokka = '';
    if (this.state.status == 'hidden') {
      luokka = 'hidden';
    }

    return (
      <div>
        <p className="centerDice" onClick={this.changeStatus}><i class="fas fa-dice-d6 fa-2x" id="toggleDice"></i></p>
        <div id="dices" className={luokka}>
          <p>4</p>
          <p>6</p>
          <p>8</p>
          <p>10</p>
          <p>12</p>
          <p>20</p>
          <div id="chart1">
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width="380" />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
    <div>
    <App />
    </div>,
  document.getElementById('mainDice')
);
