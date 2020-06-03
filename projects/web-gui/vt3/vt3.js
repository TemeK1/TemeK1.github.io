"use strict";  // pidä tämä ensimmäisenä rivinä

var mJoukkue;
var joukkueet;
var leimaustavat;
var sarjat;
var rastit;
var rastit2;
var leimat = new Set();
var jasenKentat = 5;
var lisataanko = true;

/*
* Web-käyttöliittymien ohjelmointi.
* Viikkotehtävä 3. Lomakkeet ja validointi.
* Tason 5 palautus.
* Samoja globaaleja muuttujia kuin VT2:sessa, mutta muutamilla tarpeellisilla lisäyksillä.
* rastit/rastit2 koin tarpeelliseksi, että sain helpon keinon käyttää Mapin avaimena
* tarpeen mukaan sekä rastiId:tä, että koodia.
*/


/*
* Tätä kutsutaan tapahtumankäsittelijästä, kun halutaan
* tarkastella syötettyjen jäsenten määriä.
*/
var tarkistaJasenet = function() {
      let jasenet = document.getElementById('jasenet');
      let jasenInputit = jasenet.getElementsByTagName('input');
      let jasenia = 0;

      for (let j = 0; j < jasenInputit.length; j++) {
        if (jasenInputit[j].value.length > 1) {
          jasenia++;
        }
      }
      if (jasenia < 2) {
          raportoiVirhe(jasenInputit[0], 'Jäseniä tulee olla vähintäänkin kaksi.');
      } else {
          raportoiVirhe(jasenInputit[0], '');
      }
};

/*
* Tätä kutsutaan tapahtumankäsittelijästä, kun halutaan
* tarkastella, että ainakin yksi leimaustapa on valittu.
*/
var tarkistaLeimaukset = function() {
  let checkbox = document.querySelectorAll('input[type="checkbox"]');
  for (let cBox of checkbox) {
      if (cBox.checked) {
          leimat.add(cBox.value);
      } else {
          leimat.delete(cBox.value);
      }

      if (leimat.size) {
          raportoiVirhe(checkbox[0], '');
      } else {
          raportoiVirhe(checkbox[0], 'Valitse ainakin yksi leimaustapa.');
      }
  }
};

/*
* Estää uudelleenlataamisen napinpainalluksen yhteydessä.
* No jääköön nyt tämäkin erikseen tähän..
*/
function preventReload(e) {
   e.preventDefault();
}

/*
* Generoi sattumanvaraisen Id:n joukkueelle.
*/
function generoiId() {

  let id = '';

  for (let i = 0; i < 16; i++) {
    id = id + (Math.floor(Math.random() * 10));
  }

  return parseInt(id);
}

/*
* Funktio hakee kaikki rastit data-rakenteesta.
* Ja palauttaa sitä kaipaavalle.
* Parametri 0 kertoo, että Map halutaan käyttäen
* avaimena Id:tä. Muussa tapauksessa käytetään koodia.
* En ainakaan itse tietämykselläni keksinyt järkevämpää keinoa tähän vaikka
* takuulla niitäkin olisi.
*/
function haeRastit(avain) {

  let rastikirja = new Map();

  if (avain == 0) {
    for (let kilpailu of data) {
       for (let rasti of kilpailu['rastit']) {
          rastikirja.set(rasti['id'], (rasti['koodi'].toString()));
       }
    }
  } else {
      for (let kilpailu of data) {
         for (let rasti of kilpailu['rastit']) {
          rastikirja.set(rasti['koodi'], (rasti['id'].toString()));
         }
      }
   }

  return rastikirja;
}

/*
* Tässä funktiossa alustetaan muutamia tärkeitä tapahtumankäsittelijöitä.
* Sarjan keston käsittelijä siihen liittyvälle input-kentälle.
* Ja myös click sekä submit tapahtumat sekä joukkue, että sarjaFormeille.
* Jos validaatiot menevät läpi submit-tapahtumankäsittelijöissä niin sitten
* siirrytään joko varsinaiseen joukkueen lisäämiseen/muokkaamiseen
* tai sarjan lisäämiseen.
*/
function tarkistaLomake() {


  document.querySelector('form').addEventListener("click", function() {
    let input = document.getElementById('nimi').getElementsByTagName('input')[0];
    if (input.checkValidity()) {
        raportoiVirhe(input, '');
    } else {
        raportoiVirhe(input, 'Syötä joukkueelle nimi');
    }
  });

  document.querySelector('form').addEventListener("submit", function (e) {
    e.preventDefault();
    poistaLeimoja();
    tarkistaJasenet();
    tarkistaLeimaukset();

    if (e.target.checkValidity()) {
      lisaaTaiMuokkaaJoukkue();
    }
  });

  tarkistaSarjaNimet();
  tarkistaAika();

  document.getElementById('sarjanTallennus').addEventListener("click", function() {
    let sarjaKentat = document.getElementById('sarja').getElementsByTagName('input');
    let sarjaNimi = sarjaKentat[0];

    if (sarjaNimi.checkValidity()) {
        raportoiVirhe(sarjaNimi, '');
    } else {
        raportoiVirhe(sarjaNimi, 'Syötä sarjalle nimi.');
    }

    let sarjaKesto = document.getElementById('sarja').getElementsByTagName('input')[1];
    sarjaKesto.setCustomValidity('');

    if (sarjaKesto.checkValidity()) {
        raportoiVirhe(sarjaKesto, '');
    } else {
        raportoiVirhe(sarjaKesto, 'Keston tulee olla positiivinen kokonaisluku.');
  }

  });

  document.getElementById('sarjaForm').addEventListener("submit", function (e) {
    e.preventDefault();
    if (e.target.checkValidity()) {
      lisaaSarja();
    }
  });

}

/*
* Kutsuttaessa asettaa virheen ja asettaa virheilmoituksen näkyviin.
*/
function raportoiVirhe(kentta, virhe) {
    kentta.setCustomValidity(virhe);
    kentta.reportValidity();
}

/*
* Tarkistetaan, ettei löydy saman nimistä joukkuetta jo ennestään
* ja että nimi on myös riittävän pitkä.
*/
function tarkistaNimi() {

  let aJoukkueet = Array.from(joukkueet.values());
  document.getElementById('nimi').addEventListener("change", function (e) {
     let input = document.getElementById('nimi').getElementsByTagName('input')[0];
     let virhe = false;
     raportoiVirhe(e.target, '');
     for (let i = 0; i < aJoukkueet.length; i++) {
        if (aJoukkueet[i]["nimi"].trim() == e.target.value.trim()) {
            virhe = true;
            break;
        }
      }

      if (virhe === true) {
         raportoiVirhe(e.target, 'Joukkue löytyy jo ennestään.');
      } else {
         if (input.checkValidity()) {
           raportoiVirhe(e.target, '');
         } else {
           raportoiVirhe(e.target, 'Nimi on liian lyhyt');
         }
      }
  });
}

/*
* Alustetaan change-tapahtumankäsittelijän jäsenet fieldsetille,
* jotta muutosten tapahtuessa jäsenkentissä osataan tarkastaa, että
* jäseniä on vähintään kaksi.
*/
function jasenTarkastelija() {
  let jasenet = document.getElementById('jasenet');
  jasenet.addEventListener("change", tarkistaJasenet);
}

/*
* Alustetaan change-tapahtumankäsittelijän kaikille leimausCheckbokseille,
* jotta muutosten tapahtuessa osataan tarkastaa, että
* vähintäänkin yksi on valittu.
*/
function leimausTarkastelija() {

  let checkbox = document.querySelectorAll('input[type="checkbox"]');

  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("change", tarkistaLeimaukset);
  }
}

/*
* Tällä rakennetaan tapahtumankäsittelijä jäsenet fieldsetille.
* Tarkastelun kohteena on kaikkien nimi-syötekenttien vertailu toisiinsa.
* Jos yhdenkään kohdalla vertailu täsmää niin virheettomyys on epätosi
* ja silloin työstetään virheilmoitus.
* Virheettömyyden ollessa tosi asetetaan virheilmoitus tyhjäksi.
*/
function duplikaattiTarkastelija() {

  let jasenet = document.getElementById('jasenet');
  jasenet.addEventListener("change", function (e) {
      raportoiVirhe(e.target, '');
      let virheeton = true;
      let jasenInputit = jasenet.getElementsByTagName('input');
      for (let i = 0; i < jasenInputit.length; i++) {
        if (jasenInputit[i].value.length > 1) {
          for (let j = 0; j < jasenInputit.length; j++) {
               if (((jasenInputit[i].value.trim().toLowerCase()) == (jasenInputit[j].value.trim().toLowerCase())) && jasenInputit[i] !== jasenInputit[j]) {
                  raportoiVirhe(e.target, 'Nimissä on duplikaatti.');
                  virheeton = false;
                  break;
               }
          }
        }
      }
      if (virheeton === true) {
        raportoiVirhe(e.target, '');
      }
   });
}

/*
* Tällä rakennetaan tapahtumankäsittelijä sarjan nimelle (tai labelille)
* jota muokattaessa (change) tarkastellaan että löytyykö saman nimistä sarjaa jo
* ennestään.
*/
function tarkistaSarjaNimet() {

  document.getElementById('sarjaNimi').addEventListener("change", function (e) {
     let sarjat = haeSarjat();
     let input = document.getElementById('nimi').getElementsByTagName('input')[0];
     let virhe = false;

     for (let i = 0; i < sarjat.length; i++) {
        if ((sarjat[i]["nimi"].trim().toLowerCase()) == (e.target.value.trim().toLowerCase())) {
            virhe = true;
            break;
        }
      }

      if (virhe === true) {
         raportoiVirhe(e.target, 'Sarja löytyy jo ennestään.');
      } else {
         raportoiVirhe(e.target, '');
      }
  });
}

/*
* Tässä rakennetaan tapahtumankäsittelijä sarjan loppuaikakentälle.
* Tarkastelun kohteena on syötetyn alku- ja loppuajan vertailu
* keskenään, mutta niiden vertailu myös kilpailun (Jäärogaining) alku- ja loppuaikaan.
*/
function tarkistaAika() {

  document.getElementById('sarjaLoppuaika').addEventListener("change", function (e) {
     let alkuAika = document.getElementById('sarjaAlkuaika').getElementsByTagName('input')[0].value;
     let loppuAika = document.getElementById('sarjaLoppuaika').getElementsByTagName('input')[0].value;
     let kesto = document.getElementById('sarjaKesto').querySelector('input').value;
     let mAlkuaika = muutaAika(alkuAika);
     let mLoppuaika = muutaAika(loppuAika);
     let hKilpailu;

     for (let kilpailu of data) {
       if (kilpailu['nimi'] == 'Jäärogaining') {
         hKilpailu = kilpailu;
         break;
       }
     }

     let kestoJaSarjanAlku = new Date(alkuAika);
     let kilpailunAlku = hKilpailu['alkuaika'];
     let kilpailunLoppu = hKilpailu['loppuaika'];
     kestoJaSarjanAlku = muutaAika(kestoJaSarjanAlku.setHours(kestoJaSarjanAlku.getHours() + parseInt(kesto)));

     raportoiVirhe(e.target, '');
     if (mAlkuaika > mLoppuaika) {
           raportoiVirhe(e.target, 'Loppuajan tulee olla alkuajan jälkeen.');
     } else if (mAlkuaika < kilpailunAlku) {
           raportoiVirhe(e.target, 'Sarja ei voi alkaa ennen kilpailua: ' + kilpailunAlku);
     } else if (mLoppuaika > kilpailunLoppu){
           raportoiVirhe(e.target, 'Sarja ei voi päättyä kilpailun päättymisen ' + kilpailunLoppu +  ' jälkeen.');
     } else if (mLoppuaika < kestoJaSarjanAlku) {
           raportoiVirhe(e.target, 'Sarjan loppuaika ei voi alittaa sarjan alkuajan ja keston summaa.');
     } else {
           raportoiVirhe(e.target, '');
     }
  });
}

/*
* Tätä kutsutaan isäntä-fieldsetistä (change), kun halutaan selvittää
* moniko rastinleimauskentistä on oikeasti käytössä. Ja ylimääräiset samalla poistetaan.
* Lopuksi vielä luodaan yksi lisää kutsumalla rastileimauskentän
* tekijäfunktiota ettei käyttäjä jää tyhjän päälle.
*/
function tarkistaJoukkueenLeimaukset() {
  let joukkueenLeimaukset = document.getElementById('tLeimaukset');
  let lRivit = joukkueenLeimaukset.getElementsByTagName('tr');
  let montako = 0;

  for (let i = 1; i < lRivit.length; i++) {
    if (lRivit.length > 0) {
      if ((lRivit[i].getElementsByTagName('input')[0].value.length) > 0) {
        montako++;
      }
    }
  }

  //tässä silmukassa ylimääräiset viimein poistetaan.
  let j = lRivit.length -1;
  while (j > montako) {
    lRivit[j].remove();
    j--;
  }

  luoRastiLeimauskentta({aika: null, rasti: 'uusi'});
}

/*
* Tätä kutsutaan joukkuelomakkeen submit-tapahtumassa.
* Tällä funktiolla tarkistetaan, että haluaako käyttäjä varmasti
* jatkaa rastileimausten poistamisen kanssa. Kyseiset leimauskentät
* poistetaan niin ettei niiden sisältöä päästä tallentamaan joukkueelle.
*/
function poistaLeimoja() {

  let mRastit = haeRastit(1);

  let joukkueenLeimaukset = document.getElementById('tLeimaukset');
  let rastiKoodit = joukkueenLeimaukset.querySelectorAll('input[type="text"]');
  let rastiAjat = joukkueenLeimaukset.querySelectorAll('input[type="datetime-local"]');
  let lCheckboxit = joukkueenLeimaukset.querySelectorAll('input[type="checkbox"]');
  let poistettavat = [];

  if (rastiKoodit.length <= 1 || rastiAjat.length <= 1) {
    return;
  }

  for (let i = 0; i < lCheckboxit.length; i++) {
    if (lCheckboxit[i].checked) {
      poistettavat.push(i);
    }
  }

  if (poistettavat.length > 0) {
    if (window.confirm("Haluatko varmasti poistaa rastileimauksia?")) {
    } else {
      return;
    }
  }


  //poistetaan checkboksin parentNode parentNode. eli se taulukon rivi (tr), jossa
  //kaikki rastileimauksen inputit sijaitsevat.
  for (let i = 0; i < poistettavat.length; i++) {
    for (let j = 0; j < lCheckboxit.length; j++) {
      if (poistettavat[i] == j) {
        lCheckboxit[j].parentNode.parentNode.remove();
      }
    }
  }

  let uusiAika = null;
  let uusiId = null;
  let pituus = mJoukkue['rastit'].length;

  if (pituus == null || pituus == 0) {
    pituus = 1;
  }

  for (let i = pituus; i <= rastiKoodit.length;i++) {
    uusiAika = muutaAika(rastiAjat[i-1].value);
    uusiId = mRastit.get(rastiKoodit[i-1].value);
    mJoukkue['rastit'].push({aika: uusiAika, rasti: uusiId});
  }
}

/*
* Funktio assosiatiivisen rakenteen tekoa varten, jossa avaimena toimii
* joukkueen id ja arvona joukkue-objektin viite.
* Tämä tallennetaan globaaliin muuttujaan (joukkueet), kun halutaan
* selvittää joukkueen id:n perusteella, että mihin joukkueeseen
* mJoukkue pitäisi seuraavaksi pistää osoittamaan.
*/
function haeJoukkueId() {

  let joukkueet = new Map();

  for (let kilpailu of data) {
    for (let sarja of kilpailu['sarjat']) {
      for (let joukkue of sarja['joukkueet']) {
        joukkueet.set(joukkue['id'], joukkue);
      }
    }
  }

  return joukkueet;
}

/*
* Tällä funktiolla luodaan pakolliset viisi jäsenkenttää,
* ja viimeiseen niistä asennetaan tapahtumankäsittelijä
* jonka perusteella kutsutaan muokkaaKenttiä-funktiota,
* joka taasen luo lisää jäsenkenttiä ja myös poistaa vanhoja tarpeettomia.
*/
function luoJasenKentat() {
  let jLisatty = document.getElementById('joukkueLisatty');
  let textJLisatty = document.createTextNode('');
  let fieldset = document.getElementById('jasenet');
  for (let i = 1; i <= 5; i++) {
    //joukkueen nimi
    let p = document.createElement('p');
    let label = document.createElement('label');
    let input = document.createElement('input');
    let nimi = document.createTextNode('Jäsen' + ' ' + i + ' ');
    input.setAttribute('type', 'text');
    input.setAttribute('minlength', 2);
    p.appendChild(label);
    label.appendChild(nimi);
    label.appendChild(input);
    fieldset.appendChild(p);

    if (i == 5) {
      input.addEventListener('blur', muokkaaKenttia);
    }
    jasenTarkastelija();
  }

  //luodaan myös yksi rastileimauskenttä tässä vaiheessa
  let lFieldset = document.getElementById('leimaukset');
  let rastileimaukset = document.getElementById('tLeimaukset');
  let datalist = document.createElement('datalist');

  //datalist ehdotuksille niistä leimoista, joita joukkueen voisi ajatella
  //haluavan leimaavan.
  datalist.setAttribute('id', 'ehdotukset');
  let aRastit = Array.from(rastit);
  luoRastiLeimauskentta({aika: null, rasti: null});

  //oletuksena syötetään kaikki rastit optioksi datalistiin,
  //sillä tässä vaiheessa mitään oikeaa joukkuetta (mJoukkue) ei ole valittuna.
  for (let i = 0; i < aRastit.length; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', aRastit[i]['1']);
    datalist.appendChild(option);
  }

  jLisatty.appendChild(textJLisatty);
  lFieldset.appendChild(datalist);
  lFieldset.addEventListener('change', tarkistaJoukkueenLeimaukset);

  //kutsutaan tarkistelijoiden rakentajia
  tarkistaNimi();
  duplikaattiTarkastelija();
}

/*
* Tuottaa lisää jäsen-kenttiä, ja myös poistaa ylimääräisiä.
*/
function muokkaaKenttia() {

  let fieldset = document.getElementById('jasenet');
  let p = document.createElement('p');
  let label = document.createElement('label');
  let input = document.createElement('input');
  let jasenInputit = fieldset.getElementsByTagName('input');
  let tyhjiaKenttia = 0;
  jasenKentat++;
  let nimi = document.createTextNode('Jäsen' + ' ' + (jasenKentat)  + ' ');
  input.setAttribute('type', 'text');
  input.setAttribute('type', 'text');
  input.setAttribute('minlength', 2);
  p.appendChild(label);
  label.appendChild(nimi);
  label.appendChild(input);
  fieldset.appendChild(p);

  for (let i = 4; i < jasenKentat; i++) {
     if (jasenInputit[i].value == '') {
        tyhjiaKenttia++;
    }
  }

  //kompensoidaan ja vähennetään yksi lopuksi.
  tyhjiaKenttia--;

  while (tyhjiaKenttia > 0) {
     jasenInputit[jasenKentat -1].parentNode.parentNode.remove();
     tyhjiaKenttia--;
     jasenKentat--;
  }

  input.addEventListener('blur', function() { muokkaaKenttia(); });
}

/*
* Tämän voimin luodaan joukkueiden ja niiden jäsenten
* oikeaoppinen listaus sivun laitaan. Kutsutaan aina
* muutosten koittaessa ja pyyhitään edeltävä listaus pois alta
* ensitöiksi.
*/
function luoJoukkueListaus() {

  //joukkue div-elementti
  let dJoukkue = document.getElementById('joukkueet');

  //poistetaan mahdolliset aiemmat
  if (document.getElementById('joukkueLista')) {
    document.getElementById('joukkueLista').remove();
  }
  let ul1 = document.createElement('ul');
  ul1.setAttribute('id', 'joukkueLista');
  let aJoukkueet = Array.from(joukkueet.values());
  dJoukkue.appendChild(ul1);
  aJoukkueet = jarjesta(aJoukkueet);
  for (let joukkue of aJoukkueet) {
    //joukkueen nimi
    let liYli1 = document.createElement('li');
    let ulAli1 = document.createElement('ul');
    let osoite = document.createElement('a');
    osoite.setAttribute('href', '#tiedot');
    osoite.addEventListener('click', function() { siirraJoukkue(joukkue['id']); });
    let nimi = document.createTextNode(joukkue['nimi']);
    osoite.appendChild(nimi);
    liYli1.appendChild(osoite);
    ul1.appendChild(liYli1);
    liYli1.appendChild(ulAli1);

    for (let jasen of joukkue['jasenet']) {
      //jasenen nimi
      let nimi = document.createTextNode(jasen);
      let liJasen = document.createElement('li');
      liJasen.appendChild(nimi);
      ulAli1.appendChild(liJasen);
    }

  }

}

/*
* Tämä funktio luo kutsuttaessa yksittäisen rastileimausrivin kaikkine
* kenttineen: rasti, aika ja poisto ja liittää koko höskän oikeaan paikkaan.
*/
function luoRastiLeimauskentta(rasti) {

  if (parseInt(rasti['rasti']) == 0) {
    return;
  }
  //haetaan table.
  let rastileimaukset = document.getElementById('tLeimaukset');
  let tr1 = document.createElement('tr');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');

  let iRasti = document.createElement('input');
  let iAika = document.createElement('input');
  let iCheckbox = document.createElement('input');

  //iAika.setAttribute('pattern','[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}');
  iRasti.setAttribute('type', 'text');
  iRasti.setAttribute('list', 'ehdotukset');
  iAika.setAttribute('type', 'datetime-local');
  iAika.setAttribute('step', '1');
  iCheckbox.setAttribute('type', 'checkbox');
  iCheckbox.setAttribute('value', rasti['rasti']);

  if (rasti['rasti'] == null) {
    iRasti.setAttribute('value', '');
  } else if (rasti['rasti'] == 'uusi') {
     iRasti.setAttribute('value', '');
  } else  {
     iRasti.setAttribute('value', rastit.get(parseInt(rasti['rasti'])));
  }

  let paivaysJaAika = new Date(rasti['aika']);
  if (rasti['aika'] !== '') {
    iAika.setAttribute('value', paivaysJaAika.toISOString().split('.')[0]);
  } else {
    iAika.setAttribute('value', null);
  }

  tr1.appendChild(td1);
  tr1.appendChild(td2);
  tr1.appendChild(td3);
  td1.appendChild(iRasti);
  td2.appendChild(iAika);
  td3.appendChild(iCheckbox);
  rastileimaukset.appendChild(tr1);
  iRasti.addEventListener('change', function(e) { rastinOikeellisuus(e); });
  iAika.addEventListener('blur', function(e) { rastinAjanOikeellisuus(e); });
}

/*
* Katsotaan onko leimattava rasti duplikaatti
* tai oikeellinen koodi alunperinkään.
*/
function rastinOikeellisuus(e) {
  //tällä mitataan, että onko leimaus duplikaatti.
  let duplikaatti = false;
  //tällä mitataan, että onko rastin koodi oikea alunperinkään
  let oikeellisuus = false;
  if (rastit2.get(e.target.value)) {
    oikeellisuus = true;
  }

  for (let i = 0; i < mJoukkue['rastit'].length; i++) {
    if ((rastit.get(parseInt(mJoukkue['rastit'][i]['rasti']))) == (e.target.value)) {
      duplikaatti = true;
      break;
    }
  }

  if (duplikaatti === true) {
    raportoiVirhe(e.target, 'Duplikaattileimaukset eivät ole sallittuja.');
  } else {
      if (oikeellisuus === false) {
        raportoiVirhe(e.target, 'Koodi ei ole oikeellinen!');
      } else {
        raportoiVirhe(e.target, '');
      }
    }
  }

/*
* Tässä funktiossa tarkistellaan, että onko rastileimauksen aika
* oikeellinen ja että sijoittuuko se sarjan alkamis- ja loppumisajan väliin.
* Jos sarjalle ei ole kumpaakin aikaa määritelty niin sitten
* vertaillaan rastileimauksen aikaa kilpailun alkuun ja loppuun.
*/
function rastinAjanOikeellisuus(e) {

  let sarjaAlku;
  let sarjaLoppu;
  let alkuKilpailu;
  let loppuKilpailu;
  let varaKilpailu;
  let loytykoJoukkue = false;

  for (let kilpailu of data) {
    for (let sarja of kilpailu['sarjat']) {
      for (let joukkue of sarja['joukkueet']) {
        if (kilpailu['nimi'] =='Jäärogaining') {
          varaKilpailu = kilpailu;
        }
        if (joukkue == mJoukkue) {
          sarjaAlku = sarja['alkuaika'];
          sarjaLoppu = sarja['loppuaika'];
          alkuKilpailu = kilpailu['alkuaika'];
          loppuKilpailu = kilpailu['loppuaika'];
          loytykoJoukkue = true;
          break;
        }
      }
    }
  }

  if (loytykoJoukkue === false) {
    alkuKilpailu = varaKilpailu['alkuaika'];
    loppuKilpailu = varaKilpailu['loppuaika'];
  }

  let verrokkiAika = muutaAika(e.target.value);

  if (sarjaAlku == null || sarjaLoppu == null) {
    if (verrokkiAika > alkuKilpailu && verrokkiAika < loppuKilpailu) {
      raportoiVirhe(e.target, '');
    } else {
      raportoiVirhe(e.target, 'Leimauksen täytyy olla aikavälillä ' + alkuKilpailu + ' - ' + loppuKilpailu);
    }
  } else if (verrokkiAika > sarjaAlku && verrokkiAika < sarjaLoppu) {
      raportoiVirhe(e.target, '');
  } else {
    raportoiVirhe(e.target, 'Leimauksen täytyy olla aikavälillä ' + sarjaAlku + ' - ' + sarjaLoppu);
  }
}

/*
* Simppeli funktio, joka palauttaa tietyn elementin alaisuudessa olevan
* ensimmäisen input-kentän.
*/
function haeEkaInput(elementti) {
   return elementti.getElementsByTagName('input')[0];
}

/*
* Muuttaa aikatyyppisen tietueen viikkotehtässä vaadittuun muotoon
* ja palauttaa sen merkkijonona.
*/
function muutaAika(aika) {

  let paivays = new Date(aika);
  let vuosi = nollat(paivays.getFullYear());
  let kuukausi = nollat(paivays.getMonth() + 1);
  let paiva = nollat(paivays.getDate());
  let tunnit = nollat(paivays.getHours());
  let minuutit = nollat(paivays.getMinutes());
  let sekunnit = nollat(paivays.getSeconds());

  return vuosi + '-' + kuukausi + '-' + paiva + ' ' + tunnit + ':' + minuutit + ':' + sekunnit;

}

/*
* Lisätään tarvittaessa nollia tunteihin, minuutteihin ja sekunteihin.
*/
function nollat(n) {
  return (n < 10 ? '0' : '') + n;
}

/*
* Tätä kutsutaan sarjaFormin submit-tapahtumassa, kun ensin on varmistettu,
* että yhtään rajoitetta ei ole rikotu.
* Uusi sarja tuotetaan, pusketaan Jäärogainin kilpailun sarjat-tietorakenteeseen
* ja lopuksi vielä luodaan  dynaamisesti (eli kutsutaan luoSarjaListaus)
* uusi sarjalistaus käyttäjän näkyville.
*/
function lisaaSarja() {

  let sNimi = haeEkaInput(document.getElementById('sarjaNimi'));
  let sKesto = haeEkaInput(document.getElementById('sarjaKesto'));
  let alkuaika = haeEkaInput(document.getElementById('sarjaAlkuaika'));
  let loppuaika = haeEkaInput(document.getElementById('sarjaLoppuaika'));
  let sAlkuaika = alkuaika.value;
  let sLoppuaika = loppuaika.value;
  let sLisatty = document.getElementById('sarjaLisatty');

  if (sAlkuaika == '') {
    sAlkuaika = null;
  } else {
    sAlkuaika = muutaAika(sAlkuaika);
  }

  if (sLoppuaika == '') {
    sLoppuaika = null;
  } else {
    sLoppuaika = muutaAika(sLoppuaika);
  }

  let sarja = {nimi: sNimi.value, kesto: parseInt(sKesto.value), alkuaika: sAlkuaika, loppuaika: sLoppuaika, joukkueet: []};

  for (let kilpailu of data) {
    if (kilpailu['nimi'] == 'Jäärogaining') {
      kilpailu['sarjat'].push(sarja);
    }
  }

  sLisatty.textContent = 'Sarja ' + sNimi.value + ' lisätty onnistuneesti.';
  sNimi.value = '';
  sKesto.value = '';
  alkuaika.value = '';
  loppuaika.value = '';

  luoSarjaListaus();
}

/*
* Tässä luodaan leimaustapa checkboxit, ja
* lopuksi vielä kutsutaan funktiota leimausTarkastelija,
* jossa luodaan tapahtumankäsittelijät näille checkboxeille.
*/
function luoLeimaustapaListaus() {

  let dLeimaus = document.getElementById('lTapa');
  let leimausDiv = dLeimaus.getElementsByTagName('div')[0];

  for (let i = 0; i < leimaustavat.length; i++) {
    let label = document.createElement('label');
    let input = document.createElement('input');
    let nimi = document.createTextNode(leimaustavat[i]);
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'leimat');
    input.setAttribute('value', leimaustavat[i]);
    leimausDiv.appendChild(label);
    label.appendChild(nimi);
    label.appendChild(input);
  }

  leimausTarkastelija();

}

/*
* Tällä funktiolla luodaan dynaaminen sarjalistaus käyttäjän näkyville,
* ensin poistetaan mahdolliset vanhat. Sillä uutta sarjaa lisätessä
* tätä joudutaan kutsumaan uudelleen.
*/
function luoSarjaListaus() {

  let dSarjat = document.getElementById('sDiv');
  let sarjaDiv2 = dSarjat.getElementsByTagName('div')[0];
  sarjat = haeSarjat();

  while (dSarjat.querySelector('div').querySelector('label')) {
     dSarjat.querySelector('div').querySelector('label').remove();
  }

  sarjat.sort(function(a, b) {
      if (a['nimi'] < b['nimi']) {
        return -1;
      }
      if (a['nimi'] > b['nimi']) {
        return 1;
      }
      return 0;
  });

  for (let i = 0; i < sarjat.length; i++) {

    let label = document.createElement('label');
    let input = document.createElement('input');
    let nimi = document.createTextNode(sarjat[i]['nimi']);
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'kSarja');
    input.setAttribute('value', sarjat[i]['nimi']);
    sarjaDiv2.appendChild(label);
    label.appendChild(nimi);
    label.appendChild(input);
  }

  let valitse = dSarjat.getElementsByTagName('input')[0];
  //asetetaan lopuksi vielä yksi valituksi vakiona.
  valitse.checked = true;

}

/*
* Funktio hakee kaikki leimaustavat ja lisää ne palautettavaan tietorakenteeseen.
*/
function haeLeimaustavat() {

  let aLeimaustavat = [];

  for (let kilpailu of data) {
    if (kilpailu['nimi'] == 'Jäärogaining') {
      for (let leimaus of kilpailu['leimaustapa']) {
        aLeimaustavat.push(leimaus);
      }
    }
  }

  return aLeimaustavat;
}

/*
* Funktio hakee kaikki sarjat ja lisää ne palautettavaan tietorakenteeseen.
*/
function haeSarjat() {

  let aSarjat = [];

  for (let kilpailu of data) {
    if (kilpailu['nimi'] == 'Jäärogaining') {
      for (let sarja of kilpailu['sarjat']) {
        aSarjat.push(sarja);
      }
    }
  }

  return aSarjat;
}

/*
* Tämä funktio järjestää ensin joukkueet oikeaoppiseen nimijärjestykseen.
* Ja sen jälkeen järjestetään kaikkien joukkueiden jäsenet joukkue kerrallaan.
* Ja palautetan tietoa tarvitsevalle (joukkuelistauksen tekijälle).
*/
function jarjesta(aJoukkueet) {

  aJoukkueet.sort(function(a, b) {
      let eka = a['nimi'].toLowerCase();
      let toka = b['nimi'].toLowerCase();
      if (eka < toka) {
        return -1;
      }
      if (eka > toka) {
        return 1;
      }
      return 0;
  });

  for (let joukkue of aJoukkueet) {
    joukkue['jasenet'].sort(function(a, b) {
        let eka = a.toLowerCase();
        let toka = b.toLowerCase();
        if (eka < toka) {
          return -1;
        }
        if (eka > toka) {
          return 1;
        }
        return 0;
    });
  }

  return aJoukkueet;
}

/*
* Funktio joukkueen "siirtämistä" varten. Tätä kutsutaan tapahtumankäsittelijöistä,
* kun jotakin joukkuetta klikataan tuloslistassa.
* Tämän mukaan osataan mm. täyttää input-kentät ja tehdä niitä tarvittava määrä.
*/
function siirraJoukkue(jId) {

  lisataanko = false;
  let lomake = document.getElementsByTagName('form')[0];
  let jasenet = document.getElementById('jasenet');
  let jasenInputit = jasenet.getElementsByTagName('input');
  let nimiLabel = document.getElementById('nimi');
  let nimiInput = nimiLabel.getElementsByTagName('input')[0];
  let dSarjat = document.getElementById('sDiv').getElementsByTagName('div')[0];
  let sarjaRadioInput = document.querySelectorAll('input[type=radio]');
  let dLeimaus = document.getElementById('lTapa').getElementsByTagName('div')[0];
  let leimausCheckboxes = dLeimaus.querySelectorAll('input[type=checkbox]');

  while (jasenKentat > 5) { //ensin poistetaan mahdolliset ylimääräiset kentät..
    jasenInputit[jasenKentat -1].parentNode.parentNode.remove();
    jasenKentat--;
  }

  mJoukkue = joukkueet.get(jId);
  nimiInput.value = mJoukkue['nimi'];
  jasenKentat = 5;

  //poistetaan vanhat ehdotukset
  while (document.getElementById('ehdotukset')) {
    document.getElementById('ehdotukset').remove();
  }

  //poistetaan vanhat leimauskentat
  poistaLeimauskentat();

  let datalist = document.createElement('datalist');
  datalist.setAttribute('id', 'ehdotukset');

  let aRastit = Array.from(rastit);
  //katsotaan, mitä rasteja täytyy ehdottaa käyttäjälle, eli
  //missä joukkue ei ole käynyt ja lisätään ne datalistiin.
  for (let rasti of aRastit) {
    let lisataanko = true;
    //jos joukkueella on rasteja
    if (mJoukkue['rastit'].length > 0) {
      for (let leimaus of mJoukkue['rastit']) {
        if (leimaus['rasti'] == rasti['0']) {
           lisataanko = false;
        }
      }

      if (lisataanko === true) {
        let option = document.createElement('option');
        option.setAttribute('value', rasti['1']);
        datalist.appendChild(option);
      }
      //joukkueella ei ole valmiiksi rasteja, esim. uusi joukkue.
      //silloin lisätään kaikki rastit optioksi enemmittä puheitta.
      //ei tarvi mitään vertailla
    } else {

       for (let rasti2 of aRastit) {
         let option = document.createElement('option');
         option.setAttribute('value', rasti2['1']);
         datalist.appendChild(option);
       }
       //ja hypätään pois ulommasta silmukasta.
       break;
    }
  }

  let joukkueenLeimaukset = document.getElementById('rLeimaukset');
  joukkueenLeimaukset.appendChild(datalist);

  //joukkueen rastit aikajärjestykseen.
  mJoukkue['rastit'].sort(function(a, b) {
      if (a['aika'] < b['aika']) {
        return -1;
      }
      if (a['aika'] > b['aika']) {
        return 1;
      }
      return 0;
  });

  //tehdään input-kentät joukkueen leimauksille.
  for (let rasti of mJoukkue['rastit']) {
    luoRastiLeimauskentta(rasti);
  }

  //ja vielä lopuksi yksi tyhjä myöhempää käyttöä varten.
  luoRastiLeimauskentta({aika: null, rasti: 'uusi'});

  for (let i = 0; i < mJoukkue['jasenet'].length; i++) { //ja sitten tehdään lisää ja sijoitetaan niihin jäsenten nimet.
    if (i > 4) { //jos jäsen
      muokkaaKenttia();
    }
    jasenInputit[i].value = mJoukkue['jasenet'][i];
  }

  //poistetaan ylimääräisistä kentistä mahdolliset vanhat nimitiedot
  //sekoittamasta pakkaa
  for (let i = mJoukkue['jasenet'].length; i < jasenInputit.length; i++) {
    jasenInputit[i].value = '';
  }

  for (let i = 0; i < leimausCheckboxes.length; i++) {
    leimausCheckboxes[i].checked = false;
  }

  //valitaan leimausCheckboxit joukkueen tietoihin perustuen.
  for (let i = 0; i < leimausCheckboxes.length; i++) {
    for (let j = 0; j < mJoukkue['leimaustapa'].length; j++) {
      if (leimausCheckboxes[i].value == mJoukkue['leimaustapa'][j]) {
        leimausCheckboxes[i].checked = true;
        break;
      }
    }
  }

  //etsitään että mihin sarjaan joukkue kuuluu ja valitaan
  //sarjaRadioButton sen mukaan.
  for (let kilpailu of data) {
    if (kilpailu['nimi'] == 'Jäärogaining') {
      for (let sarja of kilpailu['sarjat']) {
        for (let joukkue of sarja['joukkueet']) {
          if (joukkue == mJoukkue) {
            for (let i = 0; i < sarjaRadioInput.length; i++) {
              if (sarjaRadioInput[i].value == sarja['nimi']) {
                sarjaRadioInput[i].checked = true;
                break;
              }
            }
            break;
          }
        }
      }
    }
  }
}

/*
 * Funktio uuden joukkueen lisäämistä tai vanhan joukkueen muokkaamista varten.
*/
function lisaaTaiMuokkaaJoukkue() {
  let aJasenet = [];
  let aLeimaus = [];
  let aRastit = [];
  let jSarja;
  let jLisatty = document.getElementById('joukkueLisatty');
  let lomakkeet = document.getElementsByTagName('form');
  let nimiLabel = document.getElementById('nimi');
  let leimausDiv = document.getElementById('lTapa');
  let sarjaDiv = document.getElementById('sDiv');
  let jasenetFieldset = document.getElementById('jasenet');
  let nimiInput = nimiLabel.getElementsByTagName('input')[0];
  let jasenInputit = jasenetFieldset.getElementsByTagName('input');
  let leimausCheckboxes = leimausDiv.getElementsByTagName('input');
  let sarjaRadiobuttons = sarjaDiv.getElementsByTagName('input');

  //trimmaillaan nimestä tarpeettomiaa välejä pois.
  let jNimi = nimiInput.value.trim();

  // vakiojäsenet lisättäisiin näin.
  // ajasenet.push('Foo Bar');
  // aJasenet.push('Bar Foo');
  //katsotaan kaikki aiheelliset input-kentät,
  for (let i = 0; i < jasenInputit.length; i++) {
      //pukataan input-kentistä jäsenten nimet jasenet-tietorakenteeseen.
      if (jasenInputit[i].value.length > 1) {
        aJasenet.push(jasenInputit[i].value.trim());
      }
  }

  for (let i = 0; i < leimausCheckboxes.length; i++) {
    if (leimausCheckboxes[i].checked) {
      aLeimaus.push(leimausCheckboxes[i].value);
    }
  }

  for (let i = 0; i < sarjaRadiobuttons.length; i++) {
    if (sarjaRadiobuttons[i].checked) {
      jSarja = sarjaRadiobuttons[i].value;
      break;
    }
  }

  //rastileimauksia varten
  let joukkueenLeimaukset = document.getElementById('tLeimaukset');
  let lRivit = joukkueenLeimaukset.getElementsByTagName('tr');

  //skipataan otsakerivi, joten aloitetaan ykkösestä.
  for (let i = 1; i < lRivit.length; i++) {
    let input = lRivit[i].getElementsByTagName('input');
    if (input[0].value !== 'undefined' && input[0].value.length > 0 && (!input[2].selected)) {
      let dAika = new Date(muutaAika(input[1].value));
      let korjattuAika = dAika.setHours(dAika.getHours() + 2);
      aRastit.push({aika: korjattuAika, rasti: rastit2.get(input[0].value)});
    }
  }


  let jId;
   //lisätään uusi joukkue, tai sitten päivitetään vanhaa
   if (lisataanko === true) {
     mJoukkue = {};
     //generoidaan id uudelle joukkueelle.
     jId = generoiId();
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

     for (let kilpailu of data) {
       if (kilpailu['nimi'] == 'Jäärogaining') {
         for (let sarja of kilpailu['sarjat']) {
           if (sarja['nimi'] == jSarja) {
             mJoukkue = {nimi: jNimi, jasenet: aJasenet, id: jId, rastit: aRastit, leimaustapa: aLeimaus};
             sarja['joukkueet'].push(mJoukkue);
             jLisatty.textContent = 'Joukkue ' + jNimi + ' on lisätty.';
             joukkueet.set(jId, mJoukkue);
             break;
           }
         }
       }
     }

     lisataanko = false;
   }
   //jos ei ole tarvetta lisätä uutta niin tästä alas muokataan vanhaa
   //
   else {

     for (let kilpailu of data) {
       if (kilpailu['nimi'] == 'Jäärogaining') {
         for (let sarja of kilpailu['sarjat']) {
           for (let i = 0; i < sarja['joukkueet'].length; i++) {
             if (sarja['joukkueet'][i] === mJoukkue) {
               sarja['joukkueet'].splice(i, 1);
             }
           }
         }
       }
     }

     for (let kilpailu of data) {
       if (kilpailu['nimi'] == 'Jäärogaining') {
         for (let sarja of kilpailu['sarjat']) {
           if (sarja['nimi'] == jSarja) {
             //vanhan joukkueen päivittelyä.
             mJoukkue.nimi = jNimi;
             mJoukkue.leimaustapa = aLeimaus;
             mJoukkue.jasenet = aJasenet;
             mJoukkue.rastit = aRastit;
             sarja['joukkueet'].push(mJoukkue);
             lisataanko = true;
             jLisatty.textContent = 'Joukkue ' + jNimi + ' on muokattu.';
             break;
           }
         }
       }
     }
   }

  //lopuksi vielä tyhjennetään input-kentät
  for (let i = 0; i < sarjaRadiobuttons.length; i++) {
    sarjaRadiobuttons[i].checked = false;
  }

  sarjaRadiobuttons[0].checked = true;

  //lopuksi vielä tyhjennetään input-kentät
  for (let i = 0; i < leimausCheckboxes.length; i++) {
    leimausCheckboxes[i].checked = false;
  }

  //lopuksi vielä tyhjennetään input-kentät
  for (let i = 0; i < jasenInputit.length; i++) {
    jasenInputit[i].value = "";
  }

  poistaLeimauskentat();
  luoRastiLeimauskentta({aika: null, rasti: null});

  jasenKentat = jasenInputit.length;

  while (jasenKentat > 5) {
    //poistetaan ylimääräiset nimikentät (tai oikeastaan niiden vanhemmat)
    jasenInputit[jasenKentat-1].parentNode.parentNode.remove();
    jasenKentat--;
  }

  lisataanko = true;
  nimiInput.value = "";

  let optiot = Array.from(rastit);
  let datalist = document.createElement('datalist');

  //lisätään vielä kaikki ehdotukset takaisin uusia joukkueita varten.
  for (let i = 0; i < optiot.length; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', optiot[i]['1']);
    datalist.appendChild(option);
  }

  //ja lisäyksen/muokkauksen jälkeen luodaan joukkuelistaus uudelleen.
  luoJoukkueListaus();

}

/*
* Joukkueen leimauskentät poistetaan kun niitä ei tarvita enää.
* Eli joukkueen muokkaamisen/lisäämisen jälkeen.
*/
function poistaLeimauskentat() {
  let joukkueenLeimaukset = document.getElementById('tLeimaukset');
  let lRivit = joukkueenLeimaukset.getElementsByTagName('tr');
  //poistetaan vanhat leimauskentät
  let i = lRivit.length -1;

  while (i > 0) {
    lRivit[i].remove();
    i--;
  }

}

/*
* Pakolliset globaalimuuttujien alustukset tähän alkuun
* ja sitten kutsutaan tarvittavia rakennuspalikkoja kaiken näkyvän luomiseen.
*/
window.onload = function() {
  mJoukkue = {nimi: null, jasenet: [], id: null, rastit: [], leimaustapa: []};
  joukkueet = haeJoukkueId();
  leimaustavat = haeLeimaustavat();
  rastit = haeRastit(0); //key: rastiId.
  rastit2 = haeRastit(1); //key: rastiKoodi.
  luoJasenKentat();
  luoLeimaustapaListaus();
  luoSarjaListaus();
  luoJoukkueListaus();
  tarkistaLomake();
};
