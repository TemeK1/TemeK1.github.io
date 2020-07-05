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

  seuraava() {
    let seuraava = this.state.current + 1;
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
      "correctAnswers": oikeat
    })
  }

  render() {

    return (
    <div>
    <p><strong>{this.state.current + 1}.</strong> {this.props.quiz[this.state.current].question}</p>
    <Question onClick={this.seuraava} kysymys={this.props.quiz[this.state.current]}/>
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
    for (let i = 0; i < this.props.kysymys.options.length; i++) {
      for (let j = 0; i < this.props.kysymys.correctAnswer[j]; j++) {
         if (this.props.kysymys.options[i] == this.props.kysymys.correctAnswer[j]) {
           luokka = "correctAnswer";
         }
      }
    }

    let vaihtoehdot = [];
    for (let i = 0; i < this.props.kysymys.options.length; i++) {
      vaihtoehdot.push(<p classname={luokka}><strong>{abc[i]})</strong> {this.props.kysymys.options[i]}</p>);
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
