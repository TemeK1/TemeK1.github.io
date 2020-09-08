class DonutChart extends React.Component {

  constructor(props) {
  super(props);

  this.state = {
    options: {
  labels: ["ReactJS/Node.js/Express", "React Native", "Java", "MySQL/MongoDB", "Bootstrap/CSS3"],
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
    series: [30, 25, 15, 10, 20]
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

class BarChart extends React.Component {

  constructor(props) {
  super(props);

  this.state = {
    options: {
    plotOptions: {
    bar: {
      horizontal: true,
    }
    },
    colors: ['#15d199'],
    dataLabels: {
    enabled: false
    },
    xaxis: {
    categories: ['suomi', 'englanti', 'ruotsi'],
    }
  },
  series: [{
    data: [5, 4.0, 1.0]
  }],
  }
}

render() {
  return (
  <div>
    <div id="chart2">
    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
    </div>
    <div id="html-dist3">
    </div>
  </div>
  );
}
}

const domContainer1 = document.querySelector('#app');
ReactDOM.render(React.createElement(DonutChart), domContainer1);
const domContainer2 = document.querySelector('#app2');
ReactDOM.render(React.createElement(BarChart), domContainer2);
