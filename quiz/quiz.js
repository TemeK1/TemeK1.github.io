class Quiz extends React.Component {
  constructor(props) {
  super(props);
    let allQuestions = [];

    for (let i = 0; i < questions.length; i++) {
      allQuestions.push(JSON.parse(JSON.stringify(questions[i])));
    }

    this.state = {
      "kysymykset": allQuestions
    };

 }

  render() {
    return (
      <div>
      <Execute quiz={this.state.kysymykset} />
      </div>
    );
  }
}


class Execute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "current": 0,
      "correctAnswers": 0
    }

  }

  render() {
    let vaihtoehdot = [];

    for (let i = 0; i < this.props.quiz[this.state.current].options.length; i++) {
      vaihtoehdot.push(<p>{this.props.quiz[this.state.current].options[i]})</p>);
    }
    return (
    <div>
    <p>{this.props.quiz[this.state.current].question}</p>
    {vaihtoehdot}
    </div>
    );
  }
}

const domContainer1 = document.querySelector('#teemuQuiz');
ReactDOM.render(React.createElement(Quiz), domContainer1);
