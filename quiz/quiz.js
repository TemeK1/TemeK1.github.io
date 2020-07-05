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
          <Start />
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
      adsda
    </div>
    );
  }
}

const domContainer1 = document.querySelector('#teemuQuiz');
ReactDOM.render(React.createElement(Quiz), domContainer1);
