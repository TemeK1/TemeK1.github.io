// data-muuttuja on sama kuin viikkotehtävässä 1.
//

/*
* Viikkotehtävä 2, Web-käyttöliittymien ohjelmointi.
* Tason 5 palautus.
* Käytössä on viisi muuta globaalia muuttujaa (tiedän, varmasti olisi vähemmälläkin pärjännyt).
* Meinasi vaan aika loppua kesken miettiessä järkevämpiä ratkaisuja, joten mennään näillä nyt tämän kerran.
* Yksi kulloinkin käsittelyssä olevaa joukkuetta varten (mJoukkue),
* toinen jasenten nimikenttien lukumäärän hallintaa varten (jasenKenttia), ja kolmas
* Map-tyyppiselle assosiaatiorakenteelle, jossa avaimena toimii joukkueen id ja arvona joukkue-objektin viite.
* Neljäntenä säilytetään rasteja myös globaalissa Map-tyyppisessä rakenteessa.
* Viides (lisataanko) indikoi kulloinkin, että ollaanko nyt muokkaamassa (false)
* vai lisäämässä (true) uutta joukkuetta.
*/

"use strict";

var jasenKenttia = 2;
var mJoukkue;
var avaimet;
var dRastit;
var lisataanko = true;

window.onload = function() {
  dRastit = haeRastit(); //haetaan kaikki rastit globaaliin muuttujaan.
  avaimet = haeJoukkueId(); //haetaan Map-rakenne kaikista joukkueista globaaliin muuttujaan.
  haeTulokset(0); //parametri 0 tarkoittaa, että tulostaulukko järjestetään oletusmuotoisesti.
  luoLisaaRasti(); //rastilomakkeen luonti.
  luoLisaaJoukkue(); //joukkueen muokkaus/lisäyslomakkeen luonti.
  joukkueidenLisays(); //pääasiassa tarvittavien tapahtumankäsittelijöiden luontia.
}

/*
* Kasaa tulostaulukkoon tarvittavat tiedot yhteen.
* Eli kyselee ja koostaa taulukon formaatin ja riveissä tarvittava datan.
*/
function haeTulokset(jarjesta) {

  let taulut = document.getElementsByTagName('table');

  if (taulut.length > 0) {
    taulut[0].remove(); //poistetaan vanha tulostaulu, jos on tarpeen.
  }

  let tupa = document.getElementById('tupa');
  let table1 = luoTulostaulu(); //tulostaulun oletuspohjan luonti.
  tupa.appendChild(table1);
  let joukkueet = haeJoukkueet(jarjesta); //haetaan joukkueet sortattuna jarjesta-parametrin mukaisesti.

  for (let  i of joukkueet) { //lisätään sortatut joukkueet yksitellen tulostauluun.

    let br = document.createElement('br');
    let osoite = document.createElement('a');
    let tr1 = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let txt1 = document.createTextNode(i['sarja']);
    let txt2 = document.createTextNode(i['nimi']);
    let txt3 = document.createTextNode(i['jasenet'].join(', '));
    let txt4 = document.createTextNode(i['pistetta']);
    let txt5 = document.createTextNode(i['matka']);
    let txt6 = document.createTextNode(i['aika']);
    osoite.setAttribute('href', '#joukkue');
    table1.appendChild(tr1);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    tr1.appendChild(td4);
    tr1.appendChild(td5);
    td1.appendChild(txt1);
    td2.appendChild(osoite);
    osoite.addEventListener('click', function() { siirraJoukkue(i['jId']) }); //luodaan klikkauksenkuuntelija joukkueelle sen tarkastelua ja muokkaamista varten.
    td2.appendChild(br);
    osoite.appendChild(txt2);
    td2.appendChild(txt3);
    td3.appendChild(txt4);
    td4.appendChild(txt5);
    td5.appendChild(txt6);
  }

}

/*
* Funktio assosiatiivisen rakenteen tekoa varten, jossa avaimena toimii
* joukkueen id ja arvona joukkue-objektin viite.
*/
function haeJoukkueId() {

  let tunnisteet = new Map();

  for (let kilpailu of data) {
    for (let sarja of kilpailu['sarjat']) {
      for (let joukkue of sarja['joukkueet']) {
        tunnisteet.set(joukkue['id'], joukkue);
      }
    }
  }

  return tunnisteet;
}

/*
* Palauttaa määrämuotoisen tulostaulun pohjan sitä kaipaavalle.
*/
function luoTulostaulu() {

  let table1 = document.createElement('table');
  let tr1 = document.createElement('tr');
  let th1 = document.createElement('th');
  let th2 = document.createElement('th');
  let th3 = document.createElement('th');
  let th4 = document.createElement('th');
  let th5 = document.createElement('th');
  let caption1 = document.createElement('caption');
  let txt1 = document.createTextNode('Tulokset');
  let txt2 = document.createTextNode('Sarja');
  let txt3 = document.createTextNode('Joukkue');
  let txt4 = document.createTextNode('Pisteet');
  let txt5 = document.createTextNode('Matka');
  let txt6 = document.createTextNode('Aika');
  th1.addEventListener("click", function() { haeTulokset(0) });
  th2.addEventListener("click", function() { haeTulokset(1) });
  th3.addEventListener("click", function() { haeTulokset(2) });
  th4.addEventListener("click", function() { haeTulokset(3) });
  th5.addEventListener("click", function() { haeTulokset(4) });
  table1.appendChild(caption1);
  table1.appendChild(tr1);
  tr1.appendChild(th1);
  tr1.appendChild(th2);
  tr1.appendChild(th3);
  tr1.appendChild(th4);
  tr1.appendChild(th5);
  th1.appendChild(txt2);
  th2.appendChild(txt3);
  th3.appendChild(txt4);
  th4.appendChild(txt5);
  th5.appendChild(txt6);
  caption1.appendChild(txt1);
  return table1;
}

/*
* Funktio joukkueen "siirtämistä" varten. Tätä kutsutaan tapahtumankäsittelijöistä,
* kun jotakin joukkuetta klikataan tuloslistassa.
* Tämän mukaan osataan mm. täyttää input-kentät ja tehdä niitä tarvittava määrä.
*/
function siirraJoukkue(jId) {
  lisataanko = false;
  let lomakkeet = document.getElementsByTagName('form');
  let labelit = lomakkeet[1].getElementsByTagName('label');
  let syotteet = lomakkeet[1].getElementsByTagName('input');
  let button1 = document.getElementById('lisaa');
  let button2 = document.getElementById('muokkaa');
  mJoukkue = avaimet.get(jId);
  syotteet[0].value = mJoukkue['nimi'].trim();
  button1.style.visibility = 'hidden';
  button2.style.visibility = 'visible';
  button2.disabled = true;
  button1.disabled = true;

  while (jasenKenttia > 2) { //ensin poistetaan mahdolliset ylimääräiset kentät..
    labelit[jasenKenttia].remove();
    jasenKenttia--;
  }

  jasenKenttia = 2;
  syotteet[2].value = '';

  for (let i = 0; i < mJoukkue['jasenet'].length; i++) { //ja sitten tehdään lisää ja sijoitetaan niihin jäsenten nimet.

    if (i > 1) { //jos jäseniä on vähintään kaksi niin luodaan lisäkenttä.
      lisaaKentta();
    }

    syotteet[i+1].value = mJoukkue['jasenet'][i];
  }

  //if (syotteet[2].value.length > 0) lisaaKentta(); //lisätään vielä lisäkenttä, jos kakkosnimi ei ole tyhjä
  //lisaaKentta(); //ja vielä yksi lisää helpottamaan nimien syöttämistä sarkain ja näpyttely -taktiikalla.
  naytaJoukkueenRastit(mJoukkue); //siirretään joukkueen rastit myös oikeaan paikkaan tätä kutsumalla jos niitä on.
}

/*
* Luo lomakepohjan uusien rastien lisäämistä varten sekä tarvittavan tapahtumankäsittelijän.
*/
function luoLisaaRasti() {

  let button1 = document.createElement('button');
  let fieldset1 = document.createElement('fieldset');
  let form = document.getElementsByTagName('form');
  let huomautus = document.createTextNode('');
  let input1 = document.createElement('input');
  let input2 = document.createElement('input');
  let input3 = document.createElement('input');
  let label1 = document.createElement('label');
  let label2 = document.createElement('label');
  let label3 = document.createElement('label');
  let legend1 = document.createElement('legend');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');
  let p3 = document.createElement('p');
  let p4 = document.createElement('p');
  let p5 = document.createElement('p');
  let txt1 = document.createTextNode('Rastin tiedot');
  let txt2 = document.createTextNode('Lat ');
  let txt3 = document.createTextNode('Lon ');
  let txt4 = document.createTextNode('Koodi ');
  let txt5 = document.createTextNode('Lisää rasti');
  button1.setAttribute('id','rasti');
  button1.setAttribute('name', 'rasti');
  input1.setAttribute('type','text');
  input2.setAttribute('type','text');
  input3.setAttribute('type','text');
  form[0].appendChild(fieldset1);
  fieldset1.appendChild(legend1);
  fieldset1.appendChild(p1);
  fieldset1.appendChild(p2);
  fieldset1.appendChild(p3);
  fieldset1.appendChild(p4);
  p1.appendChild(label1);
  p2.appendChild(label2);
  p3.appendChild(label3);
  p4.appendChild(button1);
  label1.appendChild(txt2);
  label2.appendChild(txt3);
  label3.appendChild(txt4);
  label1.appendChild(input1);
  label2.appendChild(input2);
  label3.appendChild(input3);
  legend1.appendChild(txt1);
  button1.appendChild(txt5);
  form[0].appendChild(p5);
  let syotteet = form[0].getElementsByTagName('input');
  p5.appendChild(huomautus);
  p5.setAttribute('id', 'huomautus');
  button1.addEventListener('click', preventReload);
  button1.addEventListener('click', function() { lisaaRasti(syotteet) });
}

/*
* Funktio uuden rastin lisäämistä varten.
*/
function lisaaRasti(syotteet) {

  let lat, lon, koodi;
  let huomautus = document.getElementById('huomautus');

  if (syotteet[0].value == '' || syotteet[1].value == '' || syotteet[2].value == '' ) {
    huomautus.textContent = 'Täytä kaikki kentät';
    return;
  }
  else {
    huomautus.textContent = '';
  }

  lat = syotteet[0].value;
  lon = syotteet[1].value;
  koodi = syotteet[2].value;

  let rId = generoiId(); //generoidaan sattumanvarainen id lisätylle rastille.
  let tarkistus = true;

  while (tarkistus) {
      if (dRastit.has(rId)) { //generoidaan tarvittaessa uusi niin kauan, että uniikki id löytyy.
        rId = generoiId();
        tarkistus = true;
        continue;
      }
      tarkistus = false; //eli ei jatketa silmukkaa siinä vaiheessa kun uniikki id löytyy.
      break;
  }

  for (let kilpailu of data) { //lisätään uusi rasti ja sitten tyhjennetään arvot kentistä.
    if (kilpailu['nimi'] === 'Jäärogaining') {
      kilpailu['rastit'].push({lon: lon, koodi: koodi, lat: lat, id: rId})
      huomautus.textContent = 'Rasti lisätty';
      syotteet[0].value = '';
      syotteet[1].value = '';
      syotteet[2].value = '';
      break;
    }
  }

  for (let kilpailu of data) { //rastien tulostus konsoliin.
    for (let rasti of kilpailu['rastit']) {
      console.log('Koodi: ' + rasti['koodi'] + ', latitudi: ' + rasti['lat'] + ', longitudi: ' + rasti['lon']);
    }
  }

}

/*
* Generoi sattumanvaraisen Id:n uudelle rastille.
*/
function generoiId() {

  let id = '';

  for (let i = 0; i < 16; i++) {
    id = id + (Math.floor(Math.random() * 10));
  }

  return parseInt(id);
}

/*
* Estää uudelleenlataamisen napinpainalluksen yhteydessä.
*/
function preventReload(e) {
   e.preventDefault();
}

/*
* Joukkueiden lisäämistä tai muokkaamista hallinnoiva funktio tapahtumankäsittelijöineen.
* Luodaan tarvittavat elementit sopiviin paikkoihin ja alustetaan tarvittavat tapahtumankäsittelijät.
* Tapahtumankäsittelijät kutsuvat joko klikatessa, syöttäessä tai muuttaessa
* joukkueen lisäämistä/muokkaamista, nimikenttien lisääjää ja tyhjien kenttien tarkastajaa.
*/
function joukkueidenLisays() {

  let lomakkeet = document.getElementsByTagName('form');
  let labelit = lomakkeet[1].getElementsByTagName('label');
  let syotteet = lomakkeet[1].getElementsByTagName('input');
  let button1 = document.getElementById('lisaa');
  let button2 = document.getElementById('muokkaa');
  button1.addEventListener('click', preventReload); //estetään sivun lataus.
  button2.addEventListener('click', preventReload);
  button1.addEventListener('click', function() { lisaaTaiMuokkaaJoukkue(syotteet); }); //kutsutaan joukkueen lisäystä..
  button2.addEventListener('click', function() { lisaaTaiMuokkaaJoukkue(syotteet); lisataanko = true; }); //kutsutaan joukkueen muokkausta.

  //Näissä tarpeen mukaan vekslataan buttoneiden kanssa, kun kolmeen vakiosyöttökenttään tulee syöttö/muutos.
  syotteet[0].addEventListener('input', function() { button2.disabled = false; });
  syotteet[1].addEventListener('change', function() { button1.disabled = true; button2.disabled = false; });
  syotteet[2].addEventListener('input',  function() { lisaaKentta(); tarkistaTyhjatKentat(); button1.disabled = false; button2.disabled = false; });
}

/*
* Hakee yksittäisen joukkueen käymät rastit ja siirtää niiden tiedot
* Select-boksin optioiksi.
*/
function naytaJoukkueenRastit(mJoukkue) {

  let fieldset = document.getElementById('fieldsetRastit');
  fieldset.style.display = "block";
  let button  = fieldset.getElementsByTagName('button');
  button[0].disabled = false;
  button[1].disabled = false;
  button[2].disabled = false;
  let input = fieldset.getElementsByTagName('input');
  let select = fieldset.getElementsByTagName('select');
  let pituus = select[0].length;

  for (let i = pituus; i >= 0; i--) {
     select[0].remove(i);
  }

  for (let rasti1 in mJoukkue['rastit']) { //siirretään joukkueen (mJoukkue) rastit yksitellen select-boksin optioiksi.
      let option = document.createElement('option');
      let rId = parseInt(mJoukkue['rastit'][rasti1]['rasti']);
      let koodi = dRastit.get(parseInt(mJoukkue['rastit'][rasti1]['rasti']));
      option.text = mJoukkue['rastit'][rasti1]['aika'] + ', ' + koodi;
      if (rId === 0) {
        koodi = '0'
        option.text = mJoukkue['rastit'][rasti1]['aika'] + ', ' + koodi;
      }
      option.value = mJoukkue['rastit'][rasti1]['aika'];
      input[0].value = select[0].value;
      select[0].appendChild(option); //liitetään uusi optio select-boksiin.
  }

}

/*
* Funktio tarkastelee yhtä input-kenttää, jonka arvon perusteella
* oikea rastileimaus osataan poistaa kun käyttäjä valitsee leimauksen
* ja klikkaa "Poista"
*/
function poistaLeimaus() {

  let fieldset = document.getElementById('fieldsetRastit');
  let input = fieldset.getElementsByTagName('input');

  for (let i in mJoukkue['rastit']) {
    //jos löytyy etsinnän kohteena oleva ajallisesti täsmäävä rastileimaus niin hankkiudutaan siitä eroon.
    if ((input[0].value.localeCompare(mJoukkue['rastit'][i]['aika'])) == 0) {
       mJoukkue['rastit'].splice(i, 1);
       break;
    }
  }

  input[0].value = '';
  haeTulokset(0); //haetaan tulokset uudelleen.
  naytaJoukkueenRastit(mJoukkue); //haetaan päivittyneet rastit
}

/*
* Funktio tarkastelee yhtä input-kenttää, jonka arvon perusteella
* oikea rastileimaus osataan vaihtaa kun käyttäjä valitsee leimauksen
* ja klikkaa "Vaihda"
*/
function muutaLeimaus() {

  let fieldset = document.getElementById('fieldsetRastit');
  let input = fieldset.getElementsByTagName('input');
  let select = fieldset.getElementsByTagName('select');
  let koodi;
  let rId = "0";

  for (let i in mJoukkue['rastit']) {
    //jos löytyy etsinnän kohteena oleva ajallisesti täsmäävä rastileimaus niin muokataan sitä.
    //tarvitaan pientä pyörittelyä rasti-id:n ja koodin välillä.
    if ((select[0].value.localeCompare(mJoukkue['rastit'][i]['aika'])) == 0) {
      rId = mJoukkue['rastit'][i]['rasti'];
      if (input[1].value.length > 0) {
        koodi = input[1].value;
        for (const [key, value] of dRastit.entries()) {
          if (value === koodi) {
            rId = key;
            mJoukkue['rastit'][i] = { aika: input[0].value, rasti: rId };
            break;
          }
        }
      }
      break;
    }
  }

  input[0].value = '';
  input[1].value = '';
  haeTulokset(0); //haetaan tulokset uudelleen.
  naytaJoukkueenRastit(mJoukkue); //haetaan päivittyneet rastit
}

/*
* Funktio tarkastelee yhtä input-kenttää, jonka arvon perusteella
* uusi rastileimaus osataan lisätä kun käyttäjä täyttää uuden leimauksen
* tiedot ja klikkaa "Lisää"
*/
function lisaaLeimaus() {

  let fieldset = document.getElementById('fieldsetRastit');
  let input = fieldset.getElementsByTagName('input');
  let koodi;
  let rId = "0";

  if (input[1].value.length > 0) {
    koodi = input[1].value;
    //etsitään vastine (rasti-id), joka täsmää lisättävän rastin koodin kanssa.
    for (const [key, value] of dRastit.entries()) {
      if (value === koodi) {
        rId = key;
        break;
      }
    }
  }

  //ja lopulta lisätään (push) rastileimaus muiden leimausten jatkoksi.
  mJoukkue['rastit'].push({ aika: input[0].value, rasti: rId });
  input[0].value = '';
  input[1].value = '';
  haeTulokset(0); //haetaan tulokset uudelleen.
  naytaJoukkueenRastit(mJoukkue); //haetaan päivittyneet rastit
}

/*
* Tuottaa lisää jäsen-kenttiä.
*/
function lisaaKentta() {

  let lomakkeet = document.getElementsByTagName('form');
  let fieldsets = lomakkeet[1].getElementsByTagName('fieldset');
  let p = fieldsets[1].appendChild(document.createElement("p"));
  let syotteet = lomakkeet[1].getElementsByTagName('input');
  let input = document.createElement("input");
  input.setAttribute('type','text');
  let label = document.createElement('label');
  jasenKenttia++;
  label.textContent = 'Jäsen ' + jasenKenttia + ' ';
  label.appendChild(input);
  p.appendChild(label);
  let button1 = document.getElementById('lisaa');
  let button2 = document.getElementById('muokkaa');
  input.addEventListener("input", function() { lisaaKentta(); tarkistaTyhjatKentat(); button1.disabled = false; button2.disabled = false; });
}

/*
 * Funktio uuden joukkueen lisäämistä tai vanhan joukkueen muokkaamista varten.
*/
function lisaaTaiMuokkaaJoukkue(syotteet) {

  //haetaan lisäys- ja muokkausbuttonit.
  let button1 = document.getElementById('lisaa');
  let button2 = document.getElementById('muokkaa');

  //jos globaalilla lisataanko-muuttujalla on arvona true niin
  //silloin globaali mJoukkue alustetaan ja sitä kautta lisätään uusi joukkue.
  //muussa tapauksessa lisataanko asetetaan arvoon true tulevaa käyttöä varten.
  if (lisataanko === true) {
     mJoukkue = { nimi: syotteet[0], jasenet: [], id: 1, rastit: [], leimaustapa: ['GPS']};
     button1.disabled = false;
     button2.disabled = true;
  } else {
    button1.disabled = true;
    button2.disabled = false;
    lisataanko = true;
  }

  let jasenet = [];
  let lomakkeet = document.getElementsByTagName('form');
  let leimaus = ['GPS'];
  //trimmaillaan nimestä tarpeettomia välejä pois.
  let jNimi = syotteet[0].value.trim();

  //katsotaan kaikki aiheelliset input-kentät,
  //poistutaan ennen rastileimaus-inputteja!
  for (let i = 1; i < syotteet.length; i++) {
    if (syotteet[i].getAttribute('id') === 'aika') break;
    if (syotteet[i].value.length >= 1) {
      //pukataan input-kentistä jäsenten nimet jasenet-tietorakenteeseen.
      jasenet.push(syotteet[i].value);
    }
  }

  //jos jäseniä on liihan vähän niin eipä jatketakaan suoritusta.
  if (jasenet.length < 2)  {
    button1.disabled = true;
    button2.disabled = true;
    return;
  }

  //generoidaan id uudelle joukkueelle.
  let jId = generoiId();
  let tarkistus = true;
  //iteroidaan niin kauan, että selviää onko id varmasti uniikki, ja poistutaan.
  while (tarkistus) {
      for (let kilpailu of data) {
        for (let sarja of kilpailu['sarjat']) {
          for (let joukkue of sarja['joukkueet']) {
            if (joukkue['id'] == jId) {
              jId = generoiId();
              tarkistus = true;
              continue;
            }
          }
        }
     }
     tarkistus = false;
     break;
  }


  let tarkistin = true;
  for (let kilpailu of data) {
    if (kilpailu['nimi'] == 'Jäärogaining') {
      for (let sarja of kilpailu['sarjat']) {
        for (let joukkue of sarja['joukkueet']) {
          //katsotaan löytyykö mJoukkue jo valmiiksi.
          if (joukkue === mJoukkue) {
            //vanhan joukkueen päivittelyä.
            mJoukkue.nimi = jNimi;
            mJoukkue.jasenet = jasenet;
            //jos tarkistin joudutaan vaihtamaan falseksi niin se tarkoittaa sitä, että
            //ollaan muokkaamassa vanhaa joukkuetta.
            tarkistin = false;
            break;
          }
        }
       }
       //kun tarkistin on true niin se meinaa, että nyt onkin tarve lisätä uusi joukkue.
       //muussa tapauksessa ohitetaan tämä.
       if (tarkistin === true) {
         for (let sarja of kilpailu['sarjat']) {
           if (sarja['nimi'] == '2h') {
             mJoukkue = {nimi: jNimi, jasenet: jasenet, id: jId, rastit: [], leimaustapa: leimaus};
             sarja['joukkueet'].push(mJoukkue);
             //lisätään globaaliin Map-rakenteeseen uusi joukkue.
             avaimet.set(jId, mJoukkue);
             break;
           }
         }
       }
    }
  }

  let fieldset = lomakkeet[1].getElementsByTagName('fieldset');
  let p = fieldset[1].getElementsByTagName('p');
  jasenKenttia = p.length;

  while (jasenKenttia > 2) {
    //poistetaan ylimääräiset nimikentät (tai oikeastaan niiden vanhemmat)
    p[jasenKenttia-1].remove();
    jasenKenttia--;
  }

  //ja pyyhitään sisältö lopuista.
  for (let i = 0; i < syotteet.length; i++) {
    syotteet[i].value = '';
  }

  let fieldsetR = document.getElementById('fieldsetRastit');
  fieldsetR.style.display = "none";

  //buttonit täytyy taas disabloida. Jätetään vain oletusnappula näkyville harmaaksi.
  button1.disabled = true;
  button2.disabled = true;
  button1.style.visibility = "visible";
  button2.style.visibility = "hidden";
  haeTulokset(0); //päivitetään taas tulostaulu muokkauksen tai lisäyksen jälkeen.
}

/*
* Tarkistelee tyhjien jäsenkenttien määrää ja tarvittaessa poistelee niitä.
*/
function tarkistaTyhjatKentat() {
  let lomakkeet = document.getElementsByTagName('form');
  let labelit = lomakkeet[1].getElementsByTagName('label');
  let syotteet = lomakkeet[1].getElementsByTagName('input');
  let tyhjiaKenttia = 0;

  //alustaa i:n periaatteessa kolmanteen inputtiin eli Jäsen 2.
  for (let i = 2; i < jasenKenttia; i++) {
    //jos sitä seuraava on tyhjä niin tyhjiaKenttia kasvaa yhdellä.
    if (syotteet[i+1].value == '') {
      tyhjiaKenttia++;
    }
  }
  //kompensoidaan ja vähennetään yksi ihan lopuksi.
  tyhjiaKenttia--;

  //niin kauan kuin tyhjiä kenttiä riittää niin viimeisin jäsenkenttä poistetaan.
  while (tyhjiaKenttia > 0) {
    labelit[jasenKenttia].parentNode.remove();
    tyhjiaKenttia--;
    jasenKenttia--;
  }

}

/*
* Luo lomakkeen joukkueiden lisäämistä tai muokkaamista varten.
* Palauttaa luodun lomakkeen.
*/
function luoLisaaJoukkue() {

  let button1 = document.createElement('button');
  let button2 = document.createElement('button');
  let bPoistaLeimaus = document.createElement('button');
  let bVaihdaLeimaus = document.createElement('button');
  let bLisaaLeimaus = document.createElement('button');
  let form1 = document.getElementsByTagName('form');
  let fieldset1 = document.createElement('fieldset');
  let fieldset2 = document.createElement('fieldset');
  let fieldset3 = document.createElement('fieldset');
  let input1 = document.createElement('input');
  let input2 = document.createElement('input');
  let input3 = document.createElement('input');
  let input4 = document.createElement('input');
  let input5 = document.createElement('input');
  let label1 = document.createElement('label');
  let label2 = document.createElement('label');
  let label3 = document.createElement('label');
  let label4 = document.createElement('label');
  let label5 = document.createElement('label');
  let label6 = document.createElement('label');
  let legend1 = document.createElement('legend');
  let legend2 = document.createElement('legend');
  let legend3 = document.createElement('legend');
  let select1 = document.createElement('select');
  let txt1 = document.createTextNode('Uusi joukkue');
  let txt2 = document.createTextNode('Nimi ');
  let txt3 = document.createTextNode('Jäsenet');
  let txt4 = document.createTextNode('Jäsen 1 ');
  let txt5 = document.createTextNode('Jäsen 2 ');
  let txt6 = document.createTextNode('Lisää joukkue');
  let txt7 = document.createTextNode('Tallenna muutokset');
  let txt8 = document.createTextNode('Rastit');
  let txt9 = document.createTextNode('Aika ');
  let txt10 = document.createTextNode('Uusi koodi ');
  let txt11 = document.createTextNode('Poista');
  let txt12 = document.createTextNode('Vaihda');
  let txt13 = document.createTextNode('Lisää');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');
  let p3 = document.createElement('p');
  let p4 = document.createElement('p');
  let p5 = document.createElement('p');
  let p6 = document.createElement('p');
  let p7 = document.createElement('p');
  let p8 = document.createElement('p');
  let p9 = document.createElement('p');
  button1.setAttribute('name', 'joukkue');
  button1.setAttribute('id','lisaa');
  button2.setAttribute('name','muokkaa');
  button2.setAttribute('id', 'muokkaa');
  bPoistaLeimaus.setAttribute('name', 'Poista');
  bVaihdaLeimaus.setAttribute('name', 'Vaihda');
  bLisaaLeimaus.setAttribute('name', 'Lisaa');
  bPoistaLeimaus.setAttribute('id','poistaLeimaus');
  bVaihdaLeimaus.setAttribute('id','vaihdaLeimaus');
  bLisaaLeimaus.setAttribute('id','lisaaLeimaus');
  input1.setAttribute('type', 'text');
  input2.setAttribute('type', 'text');
  input3.setAttribute('type', 'text');
  input4.setAttribute('type', 'text');
  input5.setAttribute('type', 'text')
  input4.setAttribute('id', 'aika');
  fieldset3.setAttribute('id', 'fieldsetRastit');
  fieldset3.style.display = "none";
  form1[1].appendChild(fieldset1);
  fieldset1.appendChild(legend1);
  fieldset1.appendChild(p1);
  fieldset1.appendChild(fieldset2);
  fieldset2.appendChild(legend2);
  fieldset2.appendChild(p2);
  fieldset2.appendChild(p3);
  fieldset1.appendChild(p4);
  fieldset1.appendChild(p5);
  fieldset1.appendChild(fieldset3);
  legend1.appendChild(txt1);
  p1.appendChild(label1);
  p2.appendChild(label2);
  p3.appendChild(label3);
  p4.appendChild(button1);
  p5.appendChild(button2);
  label1.appendChild(txt2);
  label1.appendChild(input1);
  legend2.appendChild(txt3);
  label2.appendChild(txt4);
  label2.appendChild(input2);
  label3.appendChild(txt5);
  label3.appendChild(input3);
  button1.appendChild(txt6);
  button2.appendChild(txt7);
  legend3.append(txt8);
  fieldset3.append(legend3);
  fieldset3.appendChild(p6);
  fieldset3.appendChild(p7);
  fieldset3.appendChild(p8);
  p6.appendChild(select1);
  p7.appendChild(label4);
  p8.appendChild(label5);
  label4.appendChild(txt9);
  label4.appendChild(input4)
  label5.appendChild(txt10);
  label5.appendChild(input5);
  fieldset3.appendChild(p9);
  p9.appendChild(label6);
  label6.appendChild(bPoistaLeimaus);
  label6.appendChild(bVaihdaLeimaus);
  label6.appendChild(bLisaaLeimaus);
  bPoistaLeimaus.appendChild(txt11);
  bVaihdaLeimaus.appendChild(txt12);
  bLisaaLeimaus.appendChild(txt13);
  button1.disabled = true;
  button2.disabled = true;
  button2.style.visibility = "hidden";
  bPoistaLeimaus.addEventListener('click', preventReload);
  bVaihdaLeimaus.addEventListener('click', preventReload);
  bLisaaLeimaus.addEventListener('click', preventReload);
  bPoistaLeimaus.disabled = true;
  bVaihdaLeimaus.disabled = true;
  bLisaaLeimaus.disabled = true;
  select1.addEventListener('change', function() {
    let vaihtoehdot = select1.options;
    input4.value = vaihtoehdot[select1.selectedIndex].value;
  });
  bPoistaLeimaus.addEventListener('click', poistaLeimaus);
  bVaihdaLeimaus.addEventListener('click', muutaLeimaus);
  bLisaaLeimaus.addEventListener('click',  lisaaLeimaus);
}

/*
* Funktio hakee kaikki rastit data-rakenteesta ja lisää tiedot Map-objektiin.
* Ja palauttaa sitä kaipaavalle.
*/
function haeRastit() {

  let rastikirja = new Map();

  for (let kilpailu of data) {
    for (let rasti of kilpailu['rastit']) {
      rastikirja.set(rasti['id'], (rasti['koodi'].toString()));
    }
  }

  return rastikirja;
}

/*
* Funktio koostaa operaation, jossa kaikille joukkueille lasketaan pisteet joukkue kerrallaan (laskeJoukkueenPisteet)
* ja lopulta palauttaa joukkue- ja pistetiedot niitä kaipaavalle.
*/
function haeJoukkueet(jarjesta) {
  let joukkueet = [];
  let rastiKirja = [];

  for (let kilpailu of data) {
    for (let rasti of kilpailu["rastit"]) {
      rastiKirja.push({rasti: rasti["id"], id: rasti["koodi"].toString(), lon: rasti["lon"], lat: rasti["lat"]});
    }
  }

  for (let kilpailu of data) {
    for (let sarja of kilpailu['sarjat']) {
      for (let joukkue of sarja['joukkueet']) {
        let matkaJaAika = joukkueenMatkaJaAika(rastiKirja, joukkue);
        joukkueet.push({nimi: joukkue['nimi'], pistetta: laskeJoukkueenPisteet(joukkue, dRastit), sarja: sarja['nimi'], jasenet: joukkue['jasenet'], aika: matkaJaAika['aika'], matka: matkaJaAika['km'], jId: joukkue['id']});
      }
    }
  }

  if (jarjesta == 0) {
    joukkueet.sort(function(a, b) {
      if (a.sarja < b.sarja) return -1;
      if (a.sarja > b.sarja) return 1;
      if (b.pistetta == a.pistetta) {
        if (a.nimi < b.nimi) return -1;
        if (a.nimi > b.nimi) return 1;
        return 0;
      }
      return b.pistetta - a.pistetta;
    });
  } else if (jarjesta == 1) {
      joukkueet.sort(function(a, b) {
        if (a.nimi < b.nimi) return -1;
        if (a.nimi > b.nimi) return 1;
        return 0;
      });
  } else if (jarjesta == 2) {
      joukkueet.sort(function(a, b) {
        return b.pistetta - a.pistetta;
      });
  } else if (jarjesta == 3) {
      joukkueet.sort(function(a, b) {
        return a.matka - b.matka;
      });
  } else if (jarjesta == 4) {
      joukkueet.sort(function(a, b) {
       return (a.aika).localeCompare(b.aika);
      });
  }

  return joukkueet;
}

/*
* Funktio laskee pisteet yksittäiselle, parametrina tuodulle joukkueelle.
*/
function laskeJoukkueenPisteet(joukkue, rastiKirja) {

  let uniikitRastit = new Map();
  let joukkueenPisteet = 0;

  for (let rrasti in joukkue['rastit']) {
    uniikitRastit.set(joukkue['rastit'][rrasti]['rasti'].toString(), new Date(joukkue['rastit'][rrasti]['aika']));
  }

  for (const [key, value] of uniikitRastit.entries()) {
    let koodi = parseInt((String(rastiKirja.get(Number(key)))).charAt(0));
    if (isNaN(koodi) === false && typeof koodi === 'number') {
      joukkueenPisteet =  joukkueenPisteet + koodi;
    }
  }

  return joukkueenPisteet;
}

/*
* Funktio selvittää matkan pituuden ja ajan parametrina tuodulle yksittäiselle joukkueelle.
* Palauttaa objektin, jossa tieto sekä pituudesta (km) ja ajasta (hh:mm:ss).
*/
function joukkueenMatkaJaAika(rastikirja, joukkue) {

  let lat1, lon1, lat2, lon2, mLat, mLon, alku, loppu, alkuAika, loppuAika;
  let matka = 0;
  let jRastit = joukkue.rastit;
  let loydetyt = [];

  for (let rasti1 of rastikirja) { //verrataan joukkueen oikeellisia rastisuorituksia kaikkiin rasteihin ja päätellään siitä,
    for (let rasti2 in jRastit) { //että missä lokaatioissa joukkue on käynyt. Tallennetaan 'loydettyihin' aika, sijainti, id ja koodi.
      if (rasti1["rasti"] == jRastit[rasti2]["rasti"]) { //tarkistetaan, että onko joukkue käynyt kyseisellä rastilla.
        loydetyt.push({aika: jRastit[rasti2]["aika"], rasti: rasti1["rasti"], id: rasti1["id"], lon: rasti1["lon"], lat: rasti1["lat"]});
      }
    }
  }

  //Järjestetään  joukkueen oikeelliset rastitiedot aikajärjestykseen.
  loydetyt.sort(function(a, b) {
   return (a.aika).localeCompare(b.aika);
  });

  for (let i = loydetyt.length - 1; i > -1; i--) { //etsitään viimeisin "LAHTO" leimaus...
    if (loydetyt[i]['id'] == "LAHTO") {
        lat2 = loydetyt[i]["lat"];
        lon2 = loydetyt[i]["lon"];
        alku = loydetyt[i]["id"];
        alkuAika = loydetyt[i]["aika"];
        for (let j = i + 1; j < loydetyt.length; j++) { //..ja ensimmäinen "MAALI" leimaus.
          if (loydetyt[j]["id"] == 'MAALI') {
              mLat = loydetyt[j]["lat"];
              mLon = loydetyt[j]["lon"];
              loppu = loydetyt[j]["id"];
              loppuAika = loydetyt[j]["aika"];
              break;
          }
        }
        break;
    }
  }

  //Selvitellään hh:mm:ss.
  let dAlku = Date.parse(alkuAika);
  let dLoppu = Date.parse(loppuAika);
  let erotus = (dLoppu - dAlku) / 1000;
  let tunnit = Math.floor(erotus / 60 / 60); //tunnit tulee timestamppien erotuksesta.
  let minuutit = Math.floor(erotus / 60) - (tunnit * 60); //lasketaan kaikki minuutit ja vähennetään lopuksi tuntien verran minuutteja.
  let sekunnit = erotus % 60; //modulolla ylijäävät sekunnit.

  //Selvitellään etäisyydet kahden rastin välillä ja lisätään kokonaismatkan mittaan.
  for (let i = 0; i < loydetyt.length; i++) {
    if (loydetyt[i]["id"] == alku) { //etsitään eka se oikea LAHTO-leimaus.
      for (let j = i + 1; j < loydetyt.length; j++) { //sitten rasti kerrallaan kohti MAALIa.
         if (loydetyt[j]["id"] == loppu) {
         lat1 = lat2;
         lon1 = lon2;
         lat2 = mLat;
         lon2 = mLon;
         matka = matka + getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2);
         break; //kun maali löytyy niin sijoitetaan tarvittavat tiedot muuttujaan ja poistutaan loopista.
        }
         lat1 = lat2; //maalin löytymistä odotellessa selvitellään etäisyyksiä "pisterasti" kerrallaan.
         lon1 = lon2;
         lat2 = loydetyt[j]["lat"];
         lon2 = loydetyt[j]["lon"];
         matka = matka + getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2); //päivitetään matka
      }
     break;
    }
  }

  //tehdään objektityyppinen palautus, josta löytyy tieto sekä joukkueen matkan pituudesta ja ajasta hh:mm:ss.
  let matkaJaAika = {km: Math.round(matka), aika: nollat(tunnit) + ":" + nollat(minuutit) + ":" + nollat(sekunnit)};
  return matkaJaAika;
}

/*
* Lisätään tarvittaessa nollia tunteihin, minuutteihin ja sekunteihin.
*/
function nollat(n) {

  if (isNaN(n) === true) {
    return "00";
  }

  return (n < 10 ? '0' : '') + n;
}

/*
* Lasketaan kahden koordinaattipisteen välinen etäisyys.
* Copyright @Opettaja.
*/
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {

  return deg * (Math.PI/180)
}
