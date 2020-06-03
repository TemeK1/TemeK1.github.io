"use strict";

/*
* Web-käyttöliittymien ohjelmointi.
* Viikkotehtävä 6. React.
* Tason 5 palautus.
*/

class App extends React.Component {
    constructor(props) {
      super(props);
        // Käytetään samaa tietorakennetta kuin viikkotehtävässä 1, mutta vain jäärogainingin joukkueita
        // tehdään tämän komponentin tilaan kopio jäärogainingin tiedoista. Tee tehtävässä vaaditut lisäykset ja muutokset tämän komponentin tilaan
        // Tämä on tehtävä näin, että saadaan oikeasti aikaan kopio eikä vain viittausta samaan tietorakenteeseen. Objekteja ja taulukoita ei voida kopioida vain sijoitusoperaattorilla
        // päivitettäessä React-komponentin tilaa on aina vanha tila kopioitava uudeksi tällä tavalla
        // kts. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        let kilpailu = new Object();
        kilpailu.nimi = data[2].nimi;
        kilpailu.loppuaika = data[2].loppuaika;
        kilpailu.alkuaika = data[2].alkuaika;
        kilpailu.kesto = data[2].kesto;
        kilpailu.leimaustapa = Array.from( data[2].leimaustapa );
        kilpailu.rastit = Array.from( data[2].rastit );
        function kopioi_joukkue(j) {
                    let uusij = {};
                    uusij.nimi = j.nimi;
                    uusij.id = j.id;

                    uusij["jasenet"] = Array.from( j["jasenet"] );
                    uusij["rastit"] = Array.from( j["rastit"] );
                    uusij["leimaustapa"] = Array.from( j["leimaustapa"] );
                    return uusij;
        }
        function kopioi_sarja(s) {
                    let uusis = {};
                    uusis.nimi = s.nimi;
                    uusis.alkuaika = s.alkuaika;
                    uusis.loppuaika = s.loppuaika;
                    uusis.kesto = s.kesto;
                    uusis.joukkueet = Array.from( s.joukkueet, kopioi_joukkue);
                    return uusis;
        }

        kilpailu.sarjat = Array.from( data[2].sarjat, kopioi_sarja);

        let rastikirja = new Map();
        for (let rasti of kilpailu.rastit) {
            rastikirja.set(rasti['id'], (rasti['koodi'].toString()));
        }


        // tuhotaan vielä alkuperäisestä tietorakenteesta rastit ja joukkueet niin
        // varmistuuu, että kopiointi on onnistunut
        for(let i in data[2].rastit) {
            delete data[2].rastit[i];
        }
        for(let sarja of data[2].sarjat) {
            for(let i in sarja.joukkueet) {
                delete sarja.joukkueet[i];
            }
       }
//        console.log( kilpailu );
//        console.log(data);
   	  this.state = {
        "sarjat": kilpailu.sarjat,
        "leimaustapa": kilpailu.leimaustapa,
        "rastit": kilpailu.rastit,
        "rastikirja": rastikirja,
        "uusi": true,
        "soita": "",
        "tiimi": {nimi: "", id: "", jasenet: [], rastit: [], leimaustapa: []}
      };

      this.lisaaJoukkue = this.lisaaJoukkue.bind(this);
      this.generoiId = this.generoiId.bind(this);
      this.muokkaa = this.muokkaa.bind(this);
      this.soita = this.soita.bind(this);
      this.muutaRasteja = this.muutaRasteja.bind(this);
    }

    //tätä kutsutaan alemmalta tasolta JoukkueListaus-komponentista,
    //kun yksittäistä joukkuetta on klikattu.
    //ja kyseinen joukkue täytyisi saada talteen, ja hetkeä myöhemmin välitettyä
    //joukkuen lisäys/muokkauskomponentille (LisaaJoukkue)
    muokkaa(joukkue){
      this.setState({
        tiimi: joukkue,
        uusi: false //osoittaa, että ei tarvitse lisätä uutta joukkuetta, vaan muokataan vanhaa
      });

    }

    //tätä funktiota kutsutaan komponenttihierarkian pohjalta, yksittäisestä RastiInputista, kun rastin koodia
    //on muutettu, ja on tarvetta tallenntaa uusi koodi App-komponentin
    //rastit (kaikki rastit array-rakenteessa) ja rastikirja (map-tyyppinen) rakenteisiin.
    muutaRasteja(rasti, id) {
      let klooni = JSON.parse(JSON.stringify(this.state.rastit));
      for (let i = 0; i < klooni.length; i++) {
        if (klooni[i].id == id) {
          klooni[i].koodi = rasti;
        }
      }

      let rastikirja = new Map();
      for (let rasti of klooni) {
          rastikirja.set(rasti['id'], (rasti['koodi'].toString()));
      }

      this.setState({
        rastit: klooni,
        rastikirja: rastikirja
      }, function () {
          this.updateItem(this.state);
      }.bind(this));
    }
    //käytännössä varmistetaan, että tila varmasti on saatu tallennettua
    //eikä tule tilannetta, jossa päivitykset laahaavat yhden askeleen perässä.
    updateItem() {
      this.setState(this.state);
    }

    /*
    * Lisätään uusi tai muokataan vanhaa joukkuetta.
    * @param sarja sarjan nimi
    * @param joukkue lisättävä/muokattava joukkue
    * @param uusi true=lisätään uusi joukkue, false=muokataan vanhaa
    */
    lisaaJoukkue(sarja, joukkue, uusi) {

      //let klooni = this.state.sarjat.slice();
      //ns. deep-kloonin luomiseksi, ettei vahingossa mutatoida vanhaa this.state.sarjat
      let klooni = JSON.parse(JSON.stringify(this.state.sarjat));

      //veikataan valistuneesti sarjaa 0, tarkennetaan tarvittaessa.
      let sarjaId = 0;

      for (let i = 0; i < this.state.sarjat.length; i++) {
        if (this.state.sarjat[i].nimi == sarja) {
          sarjaId = i;
          break;
        }
      }

      //lisätään uusi joukkue
      if (uusi === true) {
        //generoidaan id
        let jId = this.generoiId();
        let tarkistus = true;
        //iteroidaan niin kauan, että selviää onko id varmasti uniikki, ja poistutaan.
        while (tarkistus) {
            for (let sarja of this.state.sarjat) {
              for (let joukkue of sarja.joukkueet) {
                  if (joukkue['id'] == jId) {
                    jId = this.generoiId();
                    tarkistus = true;
                    continue;
                  }
                }
              }
           tarkistus = false;
           break;
        }

        joukkue.id = jId;

        //lisätään uusi joukkue klooniin
        klooni[sarjaId].joukkueet.push(joukkue);
        //täydennetään tilaa kloonilla.
        this.setState({
          sarjat: klooni,
          uusi: true
        });
      } else { //muokataankin vanhaa joukkuetta
        //samalla selvitetään, että onko tarvetta siirtää se eri sarjaan.
        let tarkistus = false,
            siirra;
        for (let i = 0; i < klooni.length; i++) {
          for (let j = 0; j < klooni[i].joukkueet.length; j++) {
            if (klooni[i].joukkueet[j].id == joukkue.id) {
              if (klooni[i].nimi == sarja) {
                klooni[i].joukkueet[j].nimi = joukkue.nimi;
                klooni[i].joukkueet[j].jasenet = joukkue.jasenet;
                klooni[i].joukkueet[j].leimaustapa = joukkue.leimaustapa;
                sarjaId = i;
                //sarjaa ei vaihdettu, joten break siltä osin
                break;
              } else {
                sarjaId = i;
                for (let k = 0; k < klooni.length; k++) {
                  if (klooni[k].nimi == sarja)
                  sarjaId = k;
                }
                ///päivitetään muutetut tiedot muokattuun joukkueeseen
                siirra = klooni[i].joukkueet.splice(j, j+1);
                siirra["0"].nimi = joukkue.nimi;
                siirra["0"].jasenet = joukkue.jasenet;
                siirra["0"].leimaustapa = joukkue.leimaustapa;
                tarkistus = true;
              }
            }
          }
        }

        //siirretään muokattu joukkue eri sarjaan
        if (tarkistus === true) {
          klooni[sarjaId].joukkueet.push(siirra["0"]);
        }

        //päivitetään tila kloonilla, ja tiedotetaan myös
        //oletusarvoisesti että seuraavalla kerralla lisätään uusi joukkue
        this.setState({
          sarjat: klooni,
          uusi: true
        })
      }
    }

    /*
    * Funktio generoi satunnaisen numerojonon.
    */
    generoiId() {
      let id = '';
      for (let i = 0; i < 16; i++) {
        id = id + (Math.floor(Math.random() * 10));
      }
      return parseInt(id);
    }

    //Hollywood-periaate. Alemman komponentin funktio "soittaa" tähän funktioon, jotta sen tilaan
    //saadaan tallennettua osoite, joka voidaan taasen välittää kolmannelle komponentille
    //Eli tämä App-komponentti toimii tässä suhteessa oikeastaan vain välittäjänä yhdistämässä
    //kahden alemman tason komponentin kommunikaatiota. käytännön tasolla
    //joukkueen muokkaamista varten.
    soita(osoite) {
      this.setState({
        soita: osoite
      })
    }

    //renderöitään kaikki alemman hierarkiatason komponentit ja välitetään niille tarvittavat parametrit
    render () {
      return <div className="container">
         <LisaaJoukkue onSubmit={this.lisaaJoukkue} soita={this.soita} leimaustapa={this.state.leimaustapa} sarjat={this.state.sarjat} />
         <ListaaJoukkueet onClick={this.muokkaa} soita={this.state.soita} sarjat={this.state.sarjat} rastit={this.state.rastit} rastikirja={this.state.rastikirja}/>
         <ListaaRastit rastit={this.state.rastit} muuta={this.muutaRasteja}/>
        </div>;
    }
}

/*
* Komponentti joukkueen muokkausta ja lisäämistä varten.
*/
class LisaaJoukkue extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        id: "",
        nimi: "",
        leimaustapa: ["GPS"],
        jasen1: "",
        jasen2: "",
        jasen3: "",
        jasen4: "",
        jasen5: "",
        sarja: "4h",
        jaseniaKaytossa: 0,
        joukkue: {},
        uusi: true
      }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hae = this.hae.bind(this);

    //soitetaan App-komponentille, että tässä nyt olisi tällainen funktio, johon
    //kolmas osapuoli (joukkuelistauskomponentti) voi "soittaa", kun joukkuetta on klikattu
    //sen muokkaamista varten...
    this.props.soita(this.hae);

  }

  //...päivitetään joukkuelomakkeen tilaan muokattavan joukkueen
  //tietoja vastaavat arvot.
  hae(joukkue, sNimi) {
    let joukkueenJasenet = [];

    //tarkistetaan, että onko jasenkentta ylipäänsä merkkijono vai vaan undefined.
    //undefinedin tapauksessa korvataan se nollan merkin mittaisella merkkijonolla.
    for (let i = 0; i < 5; i++) {
      if (typeof joukkue.jasenet[i] == "undefined") {
        joukkueenJasenet[i] = "";
      } else {
        joukkueenJasenet[i] = joukkue.jasenet[i];
      }
    }

    this.setState({
        id: joukkue.id,
        nimi: joukkue.nimi,
        leimaustapa: joukkue.leimaustapa,
        jasen1: joukkueenJasenet[0],
        jasen2: joukkueenJasenet[1],
        jasen3: joukkueenJasenet[2],
        jasen4: joukkueenJasenet[3],
        jasen5: joukkueenJasenet[4],
        jaseniaKaytossa: joukkue.jasenet.length -1,
        uusi: false,
        sarja: sNimi,
        joukkue: joukkue
    }, function () {
        this.updateItem(this.state);
    }.bind(this));
  }
  //tämä varmuuden vuoksi, etteivät muutokset vahingossakaan laahaa
  //yhtä askelta perässä. Varmasti joku hienompikin kikka olisi tähän ollut. didComponentUpdate tjsp.
  updateItem() {
    this.setState(this.state);
  }

  /*
  * Otetaan talteen syötetyt tiedot, välitetään ne App-komponentille
  * tietorakenteeseen tallennusta varten, ja lopuksi nollataan tila
  * lomakkeen tyhjennystä varten.
  */
  handleSubmit(event) {
    event.preventDefault();
    let arvot = JSON.parse(JSON.stringify(this.state.joukkue));
    let sarja = this.state.sarja;
    let jasenKentat = [this.state.jasen1, this.state.jasen2, this.state.jasen3, this.state.jasen4, this.state.jasen5];
    arvot.jasenet = [];
    for (let kentta of jasenKentat) {
      if (typeof kentta == "undefined" || kentta == "" || kentta.trim() == "" ) {

      } else {
        arvot.jasenet.push(kentta);
      }
    }

    if (this.state.uusi) {
      arvot.nimi = this.state.nimi;
      arvot.id = 1;

      arvot.rastit = [];
      arvot.leimaustapa = this.state.leimaustapa;
      this.props.onSubmit(sarja, arvot, true);
    } else {
      arvot.nimi = this.state.nimi;
      arvot.leimaustapa = this.state.leimaustapa;
      this.props.onSubmit(sarja, arvot, false);
    }

    let newstate = {
        id: "",
        nimi: "",
        leimaustapa: ["GPS"],
        jasen1: "",
        jasen2: "",
        jasen3: "",
        jasen4: "",
        jasen5: "",
        sarja: "4h",
        jaseniaKaytossa: 0,
        uusi: true
    }

    this.setState(newstate);

  }

  /*
  * Tällä funktiolla tehdään lomakkeen validointi ja ilmoitetaan käyttäjälle
  * virheellisistä syötteistä.
  */
  handleChange(e) {
    let obj = e.target;
    let arvo = obj.value;
    let kentta = obj.name;
    let type = obj.type;
    let checked = obj.checked;
    let validity = obj.validity;
    let newstate = {};

    let jasenia = 0;
    let jasenArvot = [this.state.jasen1, this.state.jasen2, this.state.jasen3, this.state.jasen4, this.state.jasen5];

    //tarkistetaan, että onko joukkueen nimi tai jäsenkentät oikeellisia
    if (type == "text" && arvo.trim().length == 1) {
      obj.setCustomValidity("Virheellinen nimi");
      newstate[kentta] = arvo;
      this.setState(newstate);
      return;
    }

    //lasketaan oikeeellisten jäsenten määrät ja päivitetään
    for (let i = 0; i < 5; i++) {
      if (typeof jasenArvot[i]  !== "undefined" && jasenArvot[i].length) {
        jasenia = jasenia + 1;
      } else {
        break;
      }
    }
    //jäsenten arvoa kuvaavaa jaseniaKaytossa-tilamuuttujaa.
    this.setState({
        jaseniaKaytossa: jasenia
    });

    if ( validity.badInput || validity.patternMismatch || validity.rangeOverflow || validity.rangeUnderflow || validity.tooLong || validity.tooShort || validity.typeMismatch || validity.valueMissing  ) {
        obj.setCustomValidity("Kentän arvo on virheellinen");

         newstate[kentta] = arvo;
         this.setState(newstate);
        return;
    }
    else {
        obj.setCustomValidity("");

    }

    if ( type == "checkbox" ) {
        newstate[kentta] = this.state.leimaustapa.slice(0); // tehdään kopio, koska alkuperäistä ei voi suoraan käyttää. Huom. tämä slice-temppu ei riitä, jos taulukossa on objekteja. Ei siis tee "deep" kloonia
        if ( checked) {
            // lisätään
            newstate[kentta].push(arvo);
        }
        else {
            // poistetaan
            newstate[kentta].splice(newstate[kentta].indexOf(arvo),1);
        }
        // tarkistetaan vielä, että varmasti ainakin yksi checkbox oli valittuna. Jos ei niin asetetaan virhe
        if ( newstate[kentta].length <= 0 ) {
            obj.setCustomValidity("Valitse vähintään yksi");

        }
        else {
            obj.setCustomValidity("");
        }

    }
   // muiden kenttien arvojen asetus komponentin tilaan
   else {
     newstate[kentta] = arvo;
    }
   this.setState(newstate);

  }

  //joukkuelomakkeen renderöinti kaikessa komeudessaan
  render() {
    let leimaustavat = [];
    let lisattavatSarjat = [];

    let tavat = [this.state.leimaustapa[0], this.state.leimaustapa[1], this.state.leimaustapa[2], this.state.leimaustapa[3]];
    for (let i = 0; i < this.props.leimaustapa.length; i++) {
      leimaustavat.push(<label key={i + 'l'}>{this.props.leimaustapa[i]} <input type="checkbox" name="leimaustapa" value={this.props.leimaustapa[i]} checked={this.state.leimaustapa.includes(this.props.leimaustapa[i])} onChange={this.handleChange} /></label>);
    }

    for (let i = 0; i < this.props.sarjat.length; i++) {
        lisattavatSarjat.push(<label key={i + 's'}>{this.props.sarjat[i].nimi} <input type="radio" name="sarja" checked={this.state.sarja == this.props.sarjat[i].nimi} onChange={this.handleChange} value={this.props.sarjat[i].nimi}/></label>);
    }

    let jasenKentat = [];
    let jasenKenttienNimet = [, this.state.jasen1, this.state.jasen2, this.state.jasen3, this.state.jasen4, this.state.jasen5];

    //tämä palauttaa yhden numeroidun jäsenkentän.
    const jasenInput = (i) => {
      let jasen = "jasen" + i;
      if (i <= 2) {
        return <p key={'jasen' + i}><label>Jäsen {i} <input type="text" minLength="2" name={jasen} value = {jasenKenttienNimet[i]} onChange={this.handleChange} required="required"/></label></p>;
      } else {
        return <p key={'jasen' + i}><label>Jäsen {i} <input type="text" minLength="2" name={jasen} value = {jasenKenttienNimet[i]} onChange={this.handleChange} /></label></p>;
      }
    }

    //lisätään oletusarvoiset kaksi jäsenkenttää ilman kummempia selvityksiä
    jasenKentat.push(jasenInput(1));
    jasenKentat.push(jasenInput(2));
    for (let i = 2; i <= this.state.jaseniaKaytossa; i++) {
      if (i == 5) {
        break;
      }
      jasenKentat.push(jasenInput(i+1));
    }

    return <div className="left"><h2>Lisää joukkue</h2>
    <form className="joukkueForm" onSubmit={this.handleSubmit}>
      <fieldset id="tiedot">
        <legend>Joukkueen tiedot</legend>
        <div className="jNimi"><label className="nimi"> Nimi <input type="text" className="nimi" minLength="2" onChange={this.handleChange} name="nimi" value={this.state.nimi} required="required" /></label></div>
        <div className="lTapa">
          <p>Leimaustapa</p>
          <div className="flex">{leimaustavat}</div>
        </div>
        <div className="sDiv">
          <p>Sarja</p>
          <div className="flex">{lisattavatSarjat}</div>
       </div>
      </fieldset>
      <fieldset className="jasenet">
        <legend>Jäsenet</legend>
          {jasenKentat}
        </fieldset>
      <button className="tallennus">Tallenna</button>
    </form>
    </div>;
  }
}

/*
* Tämä tilaton komponentti järjestää ja listaa parametrina saamanansa
* joukkueet ja hallinnoi yhtä alemman
* hierarkiatason komponenttia (Joukkue)
*/
class ListaaJoukkueet extends React.Component {
  //listauksen renderöinti kaikessa komeudessaan.
  render() {
    let lista = [];
    let haeJaSorttaa = [];

    for (let i = 0; i < this.props.sarjat.length; i++) {
      for (let j = 0; j < this.props.sarjat[i].joukkueet.length; j++) {
        haeJaSorttaa.push({joukkue: this.props.sarjat[i].joukkueet[j], sNimi: this.props.sarjat[i].nimi});
      }
    }

    //joukkueiden järjestys
    haeJaSorttaa.sort(function(a, b) {
      if (a.joukkue['nimi'].toLowerCase() < b.joukkue['nimi'].toLowerCase()) {
        return -1;
      }
      if (a.joukkue['nimi'].toLowerCase() > b.joukkue['nimi'].toLowerCase()) {
        return 1;
      }
      return 0;
    });

    //lisätään järjestetyt joukkueet listaan ja välitetään Joukkue-komponenteille tarvittavat
    //attribuutit parametreina.
    for (let i = 0; i < haeJaSorttaa.length; i++) {
      lista.push(<Joukkue linkki={this.props.onClick} soita={this.props.soita} key={haeJaSorttaa[i].joukkue.nimi} tiimi={haeJaSorttaa[i].joukkue} rastit={this.props.rastit} rastikirja={this.props.rastikirja} sNimi = {haeJaSorttaa[i].sNimi}/>);
    }

    return (
      <div className="right">
        <h2>Joukkueet</h2>
        <ul className="joukkueLista">
          {lista}
        </ul>
      </div>
    )
  }
}

/*
* Joukkue-komponentti vastaa yksittäisen joukkueen
* tietojen hallinnasta ja kokoamisesta
* työkaluinaan saamiensa propsiensa mukaisesti.
*/
class Joukkue extends React.Component {
  constructor(props) {
    super(props);

    this.kutsuMuokkaajaa = this.kutsuMuokkaajaa.bind(this);
    this.laskePisteet = this.laskePisteet.bind(this);
    this.joukkueenMatkaJaAika = this.joukkueenMatkaJaAika.bind(this);
    this.getDistanceFromLatLonInKm = this.getDistanceFromLatLonInKm.bind(this);
    this.deg2rad = this.deg2rad.bind(this);
  }

  //tämä soittaa klikattaessa saman hierarkiatason joukkueen lisäys/muokkauskomponentille
  //jotta tiedetään mitä joukkuetta tarvitsee lähteä käpistelemään.
  kutsuMuokkaajaa() {
    this.props.soita(this.props.tiimi, this.props.sNimi);
  }

  /*
  * Funktio laskee pisteet tälle joukkueelle.
  */
  laskePisteet() {

    let uniikitRastit = new Map();
    let joukkueenPisteet = 0;

    for (let rrasti in this.props.tiimi['rastit']) {
      uniikitRastit.set(this.props.tiimi['rastit'][rrasti]['rasti'].toString(), new Date(this.props.tiimi['rastit'][rrasti]['aika']));
    }

    for (const [key, value] of uniikitRastit.entries()) {
      let koodi = parseInt((String(this.props.rastikirja.get(Number(key)))).charAt(0));
      if (isNaN(koodi) === false && typeof koodi === 'number') {
        joukkueenPisteet =  joukkueenPisteet + koodi;
      }
    }

    return joukkueenPisteet;
  }

  /*
  * Komponentti laskee kuljetun matkan kilometreinä tälle joukkueelle.
  */
  joukkueenMatkaJaAika() {

    let lat1, lon1, lat2, lon2, mLat, mLon, alku, loppu;
    let matka = 0,
        jRastit = [],
        vRastit,
        tKilpailu,
        mLoydetyt = new Map(),
        muutetutLeimaukset = [],
        tiimi,
        loydetyt = [];


    for (let rasti2 of this.props.tiimi.rastit) { //verrataan joukkueen oikeellisia rastisuorituksia kaikkiin rasteihin ja päätellään siitä,
       for (let rasti1 of this.props.rastit) { //että missä lokaatioissa joukkue on käynyt. Tallennetaan 'loydettyihin' aika, sijainti, id ja koodi.
          if (parseInt(rasti1.id) == parseInt(rasti2.rasti)) { //tarkistetaan, että onko joukkue käynyt kyseisellä rastilla.
            mLoydetyt.set(rasti1.id, {aika: rasti2.aika, rasti: rasti1.id, id: rasti1.koodi, lon: rasti1.lon, lat: rasti1.lat});
          }
       }
    }

    loydetyt = Array.from(mLoydetyt.values());
    //Järjestetään  joukkueen oikeelliset rastitiedot aikajärjestykseen.
    loydetyt.sort(function(a, b) {
      return (a.aika).localeCompare(b.aika);
    });


    for (let i = loydetyt.length - 1; i > -1; i--) { //etsitään viimeisin "LAHTO" leimaus...
      if (loydetyt[i]['id'] == 'LAHTO') {
          lat2 = loydetyt[i]["lat"];
          lon2 = loydetyt[i]["lon"];
          alku = loydetyt[i]["id"];
          for (let j = i + 1; j < loydetyt.length; j++) { //..ja ensimmäinen "MAALI" leimaus.
            if (loydetyt[j]["id"] == 'MAALI') {
                mLat = loydetyt[j]["lat"];
                mLon = loydetyt[j]["lon"];
                loppu = loydetyt[j]["id"];
                break;
            }
          }
          break;
      }
    }

    for (let leimaus of loydetyt) {
       muutetutLeimaukset.push({aika: leimaus.aika, rasti: leimaus.rasti});
    }

    //joukkue.rastit = muutetutLeimaukset;


    //Selvitellään etäisyydet kahden rastin välillä ja lisätään kokonaismatkan mittaan.
    for (let i = 0; i < loydetyt.length; i++) {
      if (loydetyt[i]["id"] == alku) { //etsitään eka se oikea LAHTO-leimaus.
        for (let j = i + 1; j < loydetyt.length; j++) { //sitten rasti kerrallaan kohti MAALIa.
           if (loydetyt[j]["id"] == loppu) {
           lat1 = lat2;
           lon1 = lon2;
           lat2 = mLat;
           lon2 = mLon;
           matka = matka + this.getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2);
           break; //kun maali löytyy niin sijoitetaan tarvittavat tiedot muuttujaan ja poistutaan loopista.
          }
           lat1 = lat2; //maalin löytymistä odotellessa selvitellään etäisyyksiä "pisterasti" kerrallaan.
           lon1 = lon2;
           lat2 = loydetyt[j]["lat"];
           lon2 = loydetyt[j]["lon"];
           matka = matka + this.getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2); //päivitetään matka
        }
       break;
      }
    }

    //palautetaan tieto kokonaismatkan pituudesta kilometreinä
    let matkaKm = Math.round(matka * 10) / 10;
    return matkaKm;
  }

  /*
  * Lasketaan kahden koordinaattipisteen välinen etäisyys.
  * Copyright @Opettaja.
  */
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {

    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {

    return deg * (Math.PI/180);
  }

  //yksittäisen joukkueen renderöinti kaikessa komeudessaan
  render() {
    let joukkue = {};
    joukkue.nimi = this.props.tiimi.nimi;
    joukkue.jasenet = <JoukkueenJasenet jasenet={this.props.tiimi.jasenet}/>
    joukkue.leimaukset = [];
    joukkue.matka = this.joukkueenMatkaJaAika();
    joukkue.pisteet = this.laskePisteet();

    for (let i = 0; i < this.props.tiimi.leimaustapa.length; i++) {
      joukkue.leimaukset.push(this.props.tiimi.leimaustapa[i]);
    }

    joukkue.leimaukset = joukkue.leimaukset.join(', ');

    //käytetään fragmentteja, jotta saadaan aina vaan palautettua lisää sisältöä
    //ylemmän samaan listaan.
    return (
      <React.Fragment>
      <li><a href="#tiedot" onClick={this.kutsuMuokkaajaa}>{joukkue.nimi} ({joukkue.pisteet} p, {joukkue.matka} km)</a><br />
        {this.props.sNimi} ({joukkue.leimaukset})
        <ul>{joukkue.jasenet}</ul>
        </li>
      </React.Fragment>
    )

  }
}

/*
* Tilaton komponentti vastaa yksittäisen joukkueen jäsenistä.
*/
class JoukkueenJasenet extends React.Component {
  //renderöi yksittäisen joukkueen jäsenet kaikessa komeudessaan
  //myöskin fragmenttina, jotta samaan listaan saadaan palautettua aina vaan
  //lisää sisältöä.
  render() {
    let jasenet = [];
    try {
      for (let i = 0; i < this.props.jasenet.length; i++) {
        jasenet.push(<li key={this.props.jasenet[i] + i}>{this.props.jasenet[i]}</li>);
      }
    } catch(e) {
      //
    }

    return (
      <React.Fragment>
        {jasenet}
      </React.Fragment>
    )
    }
}


/*
* Tilaton komponentti vastaa  kaikkien rastien
* listaamisesta. Vastaa myös alemman tason Rasti-komponentin toiminnasta.
*/
class ListaaRastit extends React.Component {
  constructor(props) {
    super(props);

  }


  //renderöidään rastilista kaikessa komeudessaan
  render() {
    let rastit = [];
    for (let i = 0; i < this.props.rastit.length; i++) {
      //lisätään listaan yksittäisen Rasti-komponentin installaatioita.
      rastit.push(<Rasti id={this.props.rastit[i].id} muuta={this.props.muuta} key={i + 'r'} indeksi={i} koodi={this.props.rastit[i].koodi} soita={this.props.soita} lat={this.props.rastit[i].lat} lon={this.props.rastit[i].lon}/>)
    }

    return <div className="right2"><h2>Rastit</h2>
    <ul>{rastit}</ul>
    </div>;
  }
}

/*
* Komponentti vastaa yksittäisestä rastista.
* Hallitsee myös alemman tason RastiInput-komponenttia.
*/
class Rasti extends React.Component {
  constructor(props) {
    super(props);

    //tilassa hallitaan kahta muuttujaa
    //joita käytetään hyväkis RastiInput-kentän
    //näkyvyyden määrittämisessä.
    this.state = {
      visibility: false,
      koodi: this.props.koodi
    }

    this.nakyvyys = this.nakyvyys.bind(this);
    this.soita = this.soita.bind(this);
  }

  //klikataan kerran niin alemman tason
  //RastiInput renderöidään näkyväksi
  //ja rastin koodi-tilamuuttuja tyhjennetään väliaikaisesti.
  nakyvyys() {
      this.setState({
        visibility : true,
        koodi: "",
      })
  }

  //rastiInput "soittaa" takaisin tähän funktioon kun muutos (onBlur) on tehty
  //ja näkyvyystilanne voidaan palauttaa takaisin alkuperäiseen
  soita(koodi) {
    this.setState({
      visibility: false,
      koodi: koodi
    })
  }

  //renderöidään yksittäinen rasti kaikessa komeudessaan
  render() {
    let nakyy;
    //kun rastin näkyvyys on tosi niin tallennetaan tieto muuuttujaan,
    //joka välitetään propsina alemman tason RastiInput-komponentille.
    if (this.state.visibility === true) {
      nakyy = "text";
    } else {
      nakyy = "hidden";
    }

    return <li className="clickList" onClick={this.nakyvyys}><label>{this.state.koodi} <RastiInput id={this.props.id} muuta={this.props.muuta} nakyvyys={nakyy} soita={this.soita} koodi={this.props.koodi}/></label><br />{this.props.lat}, {this.props.lon}</li>;
  }
}

/*
* Komponentti hallitsee yksittäistä RastiInput-kenttää.
*/
class RastiInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      koodi: this.props.koodi
    }

    this.muuta = this.muuta.bind(this);
  }

  //ajetaan tämä läpi, kun
  //rastiInputin sisältöä muutetaan.
  muuta(e) {
    let obj = e.target;
    let koodi = obj.value;
    let numero = parseInt(koodi[0]);
    //tarkistetaan, että eka merkki on oikeellinen numero.
    if (isNaN(numero) === false && typeof numero === 'number') {
      obj.setCustomValidity("");
      //jos on niin homma kunnossa!
      //ja jos kokonaispituus on kaksi merkkiä niin homma bueno
      if (koodi.length == 2) {
        //voidaan välittää ylöspäin tieto muutetusta rastista
        //aina App-komponenttiin asti tietorakenteen muokkaamista varten.
        this.props.soita(koodi);
        this.props.muuta(koodi, this.props.id);
      }
    } else {
      //jätetään homma vielä hautumaan
      obj.setCustomValidity("Virheellinen koodi");
      obj.reportValidity();
    }

    this.setState({
        koodi: koodi
    }, function () {
      this.updateItem(this.state);
    }.bind(this));
  }

  //varmuuden vuoksi tämä, halutaan varmistua siitä, etteivät
  //tilamuutokset laahaa yhtä askelta perässä.
  updateItem() {
    this.setState(this.state);
  }

  render() {

    return <input type="text" type={this.props.nakyvyys} maxLength="2" value={this.state.koodi} onChange={this.muuta} />;
  }
}

ReactDOM.render(
    <div>
    <h1>Tulospalvelu</h1>
    <App />
    </div>,
  document.getElementById('root')
);
