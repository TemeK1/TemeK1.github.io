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

const domContainer2 = document.querySelector('#app2');
ReactDOM.render(React.createElement(BarChart), domContainer2);


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
    categories: ['Finnish', 'English', 'Swedish'
    ],
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

const domContainer3 = document.querySelector('#app3');
ReactDOM.render(React.createElement(BarChart), domContainer3);
