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

    this.seuraava = this.seuraava.bind(this);
  }

  seuraava(vaihtoehto) {
    let seuraava = this.state.current + 1;
    let oikein = false;
    let oikeat = 0;
    for (let i = 0; i < this.props.quiz[this.state.current].options.length; i++) {
      if (vaihtoehto = this.props.quiz[this.state.current].options[i]) {
        oikein = true;
        break;
      }
    }

    if (oikein === true) {
      oikeat = this.state.correctAnswers + 1
      oikein = false;
    }

    this.setState({
      "current": seuraava,
      "correctAnswers": oikeat
    })
  }

  render() {
    let vaihtoehdot = [];
    let abc = ["a","b","c","d","e","f"];
    for (let i = 0; i < this.props.quiz[this.state.current].options.length; i++) {
      vaihtoehdot.push(<p onClick={this.seuraava(i)}><strong>{abc[i]})</strong> {this.props.quiz[this.state.current].options[i]}</p>);
    }
    return (
    <div>
    <p><strong>{this.state.current + 1}.</strong> {this.props.quiz[this.state.current].question}</p>
    {vaihtoehdot}

    <p>{this.state.correctAnswers}</p>
    </div>
    );
  }
}

const domContainer1 = document.querySelector('#teemuQuiz');
ReactDOM.render(React.createElement(Quiz), domContainer1);
