class Quiz extends React.Component {
  constructor(props) {
  super(props);
    let allQuestions = [];

    for (let i = 0; i < questions.length; i++) {
      allQuestions.push(JSON.parse(JSON.stringify(data[i])));
    }

    this.state = {
      "kysymykset": allQuestions
    };

 }

  render() {
    return (
      <div>
        <div id="chart1">
          <Start quiz={this.state.kysymykset}/>
        </div>
      </div>
    );
  }
}


class Start extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    (<div>
      {this.props.kysymykset[0]};
    </div>);
  }
}

const domContainer1 = document.querySelector('#teemuQuiz');
ReactDOM.render(React.createElement(Quiz), domContainer1);
