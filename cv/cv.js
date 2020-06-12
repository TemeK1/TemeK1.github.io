class DonutChart extends React.Component {

  constructor(props) {
  super(props);

  this.state = {
    options: {
  labels: ["React/JS", "Java", "C#", "SQL", "HTML5", "CSS"],
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
    series: [40, 20, 15, 10, 10, 5]
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
    categories: ['Eclipse', 'Drupal', 'Visual Studio', 'Atom', 'Robot Framework', 'Kali Linux', 'Debian Linux', 'VirtualBox', 'Microsoft Office'
    ],
    }
  },
  series: [{
    data: [5, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 2.5, 4.0]
  }],
  }
}

render() {
  return (
  <div>
    <div id="chart2">
    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
    </div>
    <div id="html-dist2">
    </div>
  </div>
  );
}
}

class BarChartSecond extends React.Component {

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
    categories: ['Finnish', 'English', 'Swedish'],
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
    <div id="chart3">
    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
    </div>
    <div id="html-dist3">
    </div>
  </div>
  );
}
}

class DonutChartSecond extends React.Component {

  constructor(props) {
  super(props);

  this.state = {
    options: {
  labels: ['Acc. Credits', 'MSc thesis', 'Other courses'],
    responsive: [{
      breakpoint: 480,
      options: {
      chart: {
        width: 500
      },
      legend: {
        position: 'bottom'
      }
      }
    }]
    },
    series: [91, 33, 26]
  }
  }

  render() {
  return (
    <div>
      <div id="chart4">
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width="380" />
      </div>
      <div id="html-dist4"></div>
    </div>
  );
  }
}

const domContainer1 = document.querySelector('#app');
ReactDOM.render(React.createElement(DonutChart), domContainer1);
const domContainer2 = document.querySelector('#app2');
ReactDOM.render(React.createElement(BarChart), domContainer2);
const domContainer3 = document.querySelector('#app3');
ReactDOM.render(React.createElement(BarChartSecond), domContainer3);
const domContainer4 = document.querySelector('#app4');
ReactDOM.render(React.createElement(DonutChartSecond), domContainer4);
