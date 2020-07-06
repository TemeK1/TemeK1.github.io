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
      "finished": false,
      "lastOneCorrect": false
    }

    this.seuraava = this.seuraava.bind(this);
  }

  seuraava(soita, lastOneCorrect) {
    let seuraava = this.state.current;
    let lopussa = false;
    if (this.props.quiz.length > this.state.current + 1) {
      seuraava = this.state.current + 1;
    } else {
      lopussa = true;
    }

    let oikein = false;
    let oikeat = 0;

    if (lastOneCorrect == true) {
      oikeat = this.state.correctAnswers + 1;
    }

    soita();

    this.setState({
      "current": seuraava,
      "correctAnswers": oikeat,
      "finished": lopussa,
      "lastOneCorrect": oikein
    })
  }

  render() {
    let tekstit = [];
    let meter = [];
    if (this.state.finished == true) {
      tekstit.push(<p><strong>The quiz is finished!</strong></p>);
      tekstit.push(<p><strong>You scored {this.state.correctAnswers}/{this.props.quiz.length}.</strong></p>);
    } else {
      tekstit.push(<p><strong>{this.state.current + 1}.</strong> {this.props.quiz[this.state.current].question}</p>);
      meter.push(<p><meter id="quiz_progress" value={percentage}>Quiz%</meter></p>);
    }

    let percentage = this.state.current / (this.props.quiz.length - 1);
    return (
    <div>
    {tekstit}
    <Question soita={this.seuraava} lopussa={this.state.finished} kysymys={this.props.quiz[this.state.current]}/>
    {meter}
    </div>
    );
  }
}

class Question extends React.Component {
   constructor(props) {
     super(props);

     this.state = {
       "tarkista": false
     }

     this.soita = this.soita.bind(this);
     this.tarkista = this.tarkista.bind(this);
     this.piilota = this.piilota.bind(this);
  }

  tarkista(e) {
    let obj = e.target;
    let teksti = obj.innerText.split(") ")[1];
    let oikein = false;
    for (let i = 0; i < this.props.kysymys.correctAnswer.length; i++) {
      if (teksti.localeCompare(this.props.kysymys.options[this.props.kysymys.correctAnswer[i]]) == 0) {
        oikein = true;
        break;
      }
    }

    this.setState({
      "tarkista": true,
      "lastOneCorrect": oikein
    })
  }

  soita() {
    this.props.soita(this.piilota, this.state.lastOneCorrect);
  }

  piilota() {
    this.setState({
      "tarkista": false
    })
  }

  render() {
    let abc = ["a","b","c","d","e","f"];
    let luokka = "";
    let vaihtoehdot = [];
    let nappula = [];
    let mappi = new Map();
    if (this.props.lopussa == true) {
    } else {
      for (let i = 0; i < this.props.kysymys.options.length; i++) {
        luokka = ""
        if (this.state.tarkista == true) {
          luokka = "wrongAnswer";
        }
        for (let j = 0; j < this.props.kysymys.correctAnswer.length; j++) {
           if (i == this.props.kysymys.correctAnswer[j]) {
             if (this.state.tarkista === true) {
               luokka = "correctAnswer";
             }
           }
           mappi.set(i, luokka);
        }
      }
      if (this.props.lopussa == true) {
      } else {
        if (this.state.tarkista == true) {
          if (this.state.lastOneCorrect == true) {
            nappula.push(<p>Correct!</p>);
          } else {
            nappula.push(<p>Incorrect!</p>);
          }
          nappula.push(<button className="quizButton" onClick={this.soita}>Next question</button>);
        }
        for (let i = 0; i < this.props.kysymys.options.length; i++) {
           vaihtoehdot.push(<p onClick={this.tarkista} className={mappi.get(i)}><strong>{abc[i]})</strong> {this.props.kysymys.options[i]}</p>);
        }
      }

    }

    return (
      <React.Fragment>
      {vaihtoehdot}
      {nappula}
      </React.Fragment>
    );
  }
}

const domContainer1 = document.querySelector('#teemuQuiz');
ReactDOM.render(React.createElement(Quiz), domContainer1);
