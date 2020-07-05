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
      "correctAnswers": 0,
      "finished": false
    }

    this.seuraava = this.seuraava.bind(this);
  }

  seuraava() {
    let seuraava = this.state.current;
    let lopussa = false;
    if (this.props.quiz.length > this.state.current + 1) {
      seuraava = this.state.current + 1;
    } else {
      lopussa = true;
    }

    let oikein = false;
    let oikeat = 0;
    for (let i = 0; i < this.props.quiz[this.state.current].options.length; i++) {
      if (1 == this.props.quiz[this.state.current].options[i]) {
        oikein = true;
        break;
      }
    }

    if (oikein === true) {
      oikeat = this.state.correctAnswers + 1;
      oikein = false;
    }

    this.setState({
      "current": seuraava,
      "correctAnswers": oikeat,
      "finished": lopussa
    })
  }

  render() {
    let tekstit = [];
    if (this.state.finished === true) {
      tekstit.push(<h2>The quiz is finished!</h2>);
    } else {
      tekstit.push(<p onClick={this.seuraava}><strong>{this.state.current + 1}.</strong> {this.props.quiz[this.state.current].question}</p>);
    }
    return (
    <div>
    {tekstit}
    <Question lopussa={this.state.finished} kysymys={this.props.quiz[this.state.current]}/>
    <p>{this.state.correctAnswers}</p>
    </div>
    );
  }
}

class Question extends React.Component {
   constructor(props) {
     super(props);

  }

  render() {
    let abc = ["a","b","c","d","e","f"];
    let luokka = "wrongAnswer";
    let vaihtoehdot = [];

    if (this.props.lopussa === true) {
      vaihtoehdot.push(<p>Congratulations!</p>);
    } else {
      let mappi = new Map();
      for (let i = 0; i < this.props.kysymys.options.length; i++) {
        luokka = "wrongAnswer";
        for (let j = 0; j < this.props.kysymys.correctAnswer.length; j++) {
           if (i == this.props.kysymys.correctAnswer[j]) {
             luokka = "correctAnswer";
           }
           mappi.set(i, luokka);
        }
      }

      for (let i = 0; i < this.props.kysymys.options.length; i++) {
         vaihtoehdot.push(<p className={mappi.get(i)}><strong>{abc[i]})</strong> {this.props.kysymys.options[i]}</p>);
      }
    }

    return (
      <React.Fragment>
      {vaihtoehdot}
      </React.Fragment>
    );
  }
}

const domContainer1 = document.querySelector('#teemuQuiz');
ReactDOM.render(React.createElement(Quiz), domContainer1);
