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
          <Start quiz={this.state.kysymykset} />
      </div>
    );
  }
}


class Start extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
    <div>
      {this.props.quiz[0]};
    </div>);
  }
}

const domContainer1 = document.querySelector('#teemuQuiz');
ReactDOM.render(React.createElement(Quiz), domContainer1);
