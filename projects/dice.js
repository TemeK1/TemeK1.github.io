"use strict";

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
      series: [0, 0, 0, 0, 0, 1],
      size: 0,
      status: "hidden",
      results: [0, 0, 0, 0, 0, 0],
      result: "1d6: 0"
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

   rollDice(e) {
     let size = 6;
     size = parseInt(e.target.value);
     let luku = 1;
     luku += Math.floor(Math.random() * size);
     let tulos = '1d' + e.target.value + ': ' + luku;

     this.setState({
       result: tulos
     }, function() {
       this.updateItem(this.state);
     }.bind(this));
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
          <button onClick={this.rollDice} value="4">4</button>
          <button onClick={this.rollDice} value="6">6</button>
          <button onClick={this.rollDice} value="8">8</button>
          <button onClick={this.rollDice} value="10">10</button>
          <button onClick={this.rollDice} value="12">12</button>
          <button onClick={this.rollDice} value="20">20</button>
          <div id="result">{this.state.result}</div>
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
    <Dice />
    </div>,
  document.getElementById('mainDice')
);
