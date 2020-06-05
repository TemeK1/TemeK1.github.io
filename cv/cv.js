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

const domContainer1 = document.querySelector('#app');
ReactDOM.render(React.createElement(DonutChart), domContainer1);
