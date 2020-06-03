"use strict";

var bunny, //pupun kuvaa varten
    cSkrolleri, //tekstiskrolleria varten
    ctxSkrolleri, //tekstiskrollerin kontekstia varten
    font = 'Arial',
    siniSkrolleri, //sinuskrollerille
    paikka = 0, //tekstiskrollerille
    palkkiLkm = 10,
    flakes = [], //kaikki lumihiutaleet
    maxFlakes = 200,
    viive = 200, //skrollerin viive ms
    rOwl = true, //indikoi, että tuleeko uuden pöllön animaatio kääntää (reverse)
    teksti = 'TIEA2120 Web-käyttöliittymien ohjelmointi -kurssin viikkotehtävä 4 taso 3 edellyttää skrollerin toteuttamista. Tämä skrolleri toimii tekstin määrästä riippumatta';

/*
* Web-käyttöliittymien ohjelmointi. Viikkotehtävä 4.
* Canvas, SVG ja animaatiot.
* Vitostason palautus.
* Yllättävän raskas ajettava kaikkine lumihiutalepollauksineen ym.
*/

/*
* Funktiolla luodaan pupujussin kumpikin puolikas, ja asetetaan ne oikeaan kohtaan keskelle canvasta.
*/
function luoPupu() {

  let pupuUp = document.getElementById('pupuUp'),
      pupuDown = document.getElementById('pupuDown'),
      cWidth = 383,
      cHeight = 300,
      ctxPupuUp = pupuUp.getContext('2d'),
      ctxPupuDown = pupuDown.getContext('2d'),
      max = 300,
      laajuus = 125,
      nopeus = 25,
      animointi = [];

  for (let i = 0; i < max || animointi[0] != animointi[animointi.length - 1]; i++) {
       animointi.push(parseFloat(((Math.sin(1.0 * i / nopeus) + 1.0) * laajuus).toFixed(0)));
  }


  pupuUp.width = cWidth;
  pupuUp.height = cHeight;
  pupuDown.width = cWidth;
  pupuDown.height = cHeight;

  bunny = document.createElement('img');
  bunny.setAttribute('src', 'bunny.png');
  bunny.setAttribute('alt', 'Bunny');
  bunny.setAttribute('title', 'Bunny');
  bunny.setAttribute('id', 'bunny');

  bunny.onload = function(e) {
    ctxPupuUp.drawImage(bunny,   0, 0,              bunny.width, bunny.height/2, 0, 0, bunny.width, bunny.height/2);
    ctxPupuDown.drawImage(bunny, 0, bunny.height/2, bunny.width, bunny.height/2, 0, 0, bunny.width, bunny.height/2);
  };

  let w = pupuUp.width;
  let h = pupuUp.height;

  let x0 = 0,  //"palastellaan" pupu neljään sarakkeeseen
      x1 = w * 0.25,
      x2 = w * 0.50,
      x3 = w * 0.75,
      x4 = w;


  /*
  * Sinikäyrän arvoja (animointi-array) käytetään hyödyksi, kun palastellaan pupujussin puolikkaita aaltoiluefektin
  * tuottamiseksi aina vain uudelleen ja uudelleen, piirtämällä pupujen palasia rivi ja sarake kerrallaan.
  */
  (function animoiPupu() {

  animointi.push(animointi.shift()); //siirretään animaation aluksi sinikäyrä-arrayn ensimmäinen arvo sen viimeiseksi.

  ctxPupuUp.clearRect(0, 0, w, h); //tyhjennetään canvakset
  ctxPupuDown.clearRect(0, 0, w, h);

  for (let y = 0; y < h; y++) { //käydään pupun puolikkaat läpi rivi kerrallaan

    let lx1 = x1 + (animointi[y] * 0.2), //määritellään muuttuneet sinikäyrän mukaiset arvot grafiikkojen muuttamiseksi ja tehdään pientä korjausliikettä
        lx2 = x2 + (animointi[y] * 0.2), //..
        lx3 = x3 + (animointi[y] * 0.2); //..

    let w0 = lx1,          //lasketaan sarakkeiden väliset erot
        w1 = lx2 - lx1,
        w2 = lx3 - lx2,
        w3 = x4 - lx3;

    ctxPupuUp.drawImage(bunny, x0, y, x1     , 1,  0        , y, w0, 1); //piirretään sarake 1 pupun yläpuoliskon rivistä y
    ctxPupuUp.drawImage(bunny, x1, y, x2 - x1, 1,  lx1 - 0.5, y, w1, 1); //piirretään sarake 2 pupun yläpuoliskon rivistä y
    ctxPupuUp.drawImage(bunny, x2, y, x3 - x2, 1,  lx2 - 1  , y, w2, 1); //piirretään sarake 3 pupun yläpuoliskon rivistä y
    ctxPupuUp.drawImage(bunny, x3, y, x4 - x3, 1,  lx3 - 1.5, y, w3, 1); //piirretään sarake 4 pupun yläpuoliskon rivistä y

    ctxPupuDown.drawImage(bunny, x0, h + y, x1     , 1,  0        , y, w0, 1); //piirretään sarake 1 pupun alaosan rivistä y
    ctxPupuDown.drawImage(bunny, x1, h + y, x2 - x1, 1,  lx1 - 0.5, y, w1, 1); //piirretään sarake 2 pupun alaosan rivistä y
    ctxPupuDown.drawImage(bunny, x2, h + y, x3 - x2, 1,  lx2 - 1  , y, w2, 1); //piirretään sarake 3 pupun alaosan rivistä y
    ctxPupuDown.drawImage(bunny, x3, h + y, x4 - x3, 1,  lx3 - 1.5, y, w3, 1); //piirretään sarake 4 pupun alaosan rivistä y

  }

  window.requestAnimationFrame(animoiPupu); //ja aloitetaan alusta
  })();

}


/*
* Funktiolla luodaan gradienttipalkkeja palkkiLkm:n verran, ja asetetaan kasvava viive jokaiselle
* käyttäen style.animationDelay:ta hyödyksi.
*/
function luoPalkit() {

  let viive = 0;

  for (let i = 0; i < palkkiLkm; i++) {

    let bar = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        rect = document.createElementNS("http://www.w3.org/2000/svg","rect"),
        leveys = document.documentElement.clientWidth;

    bar.setAttribute("class", "palkki");
    bar.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    bar.setAttribute("version", "1.1");
    bar.setAttribute("viewBox", "0 0" + " " + leveys +  " " + 50);
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "url(#liukuvari)");
    bar.appendChild(rect);
    viive = viive + (i*0.032);
    bar.style.animationDelay = viive + "s";
    document.getElementById('content').appendChild(bar);
  }

}

/*
* Luodaan uusia lumihiutaleita tietyllä intervallilla.
* Varmistetaan hiutaleiden määrä, ettei niitä nyt sentään
* ihan loputtomiin luoda. maxFlakes-arvoa (global) voi halutessaan kasvattaa.
*/
function luoLumisade() {

  if (flakes.length <= maxFlakes) {
    let defaultSnow = document.getElementsByName('snowflake')[0],
        newFlake = defaultSnow.cloneNode(), //uusi hiutale on klooni ns. vakiohiutaleesta.
        x = Math.floor(Math.random() * document.documentElement.clientWidth); //sattumanvarainen x koordinaatti (left)

    newFlake.style.top = '-20%';
    newFlake.style.left = x + 'px';
    flakes.push(newFlake);

    document.getElementById('content').appendChild(newFlake); //liitetään hiutale sivun content-osioon.
    window.setTimeout(luoLumisade, 1200);
  }

}

/*
* Tätä härpäkettä pyöritetään ympäri ja ympäri, kun halutaan tutkia
* kahden 'samalla sarakkeella' sijaitsevan lumihiutaleen etäisyyksiä toisistaan.
* Jos kahden hiutaleen etäisyys on riittävän läheinen niin uudemman hiutaleen (flake1) animaatio pysäytetään.
* Sen jälkeen looppia ei jatketa lainkaan vaan se keskeytetään ja hypätään setTimeoutilla alkuun.
* Ulompi looppi aloittaa arrayn loppupäästä ja sisempi alkupäästä, ja homma jatkuu aina array:n puoliväliin saakka,
* jos etäisyyssääntöä rikkovia hiutaleita ei löydy.
*/
function tarkistaHiutaleet() {

  //pyöräytetään tämä kun löytyy yksi rajoitteita rikkova hiutalepari
  //niin osataan hypätä silmukoista pois järkevästi
  let skip = false;

  for (let i = flakes.length - 1; i >= flakes.length/2; i--) {

    if (skip === false) {

      for (let j = 0; j <= flakes.length/2; j++) {

        if (i != j) {

          let flake1 = document.getElementsByClassName('snowflake')[i],
              flake2 = document.getElementsByClassName('snowflake')[j],
              //kovakoodasin hiukan arvoja näiden perään, simuloidakseni jonkinlaista approksimaatiota
              //hiutaleen keskipisteestä laskennan järkevöittämiseksi.
              bottom1 = parseInt(window.getComputedStyle(flake1).bottom) - 13,
              bottom2 = parseInt(window.getComputedStyle(flake2).bottom) - 13,
              left1 =  parseInt(window.getComputedStyle(flake1).left) - 14,
              left2 =  parseInt(window.getComputedStyle(flake2).left) - 14,
              xDistance = Math.abs(left2 - left1),
              yDistance = Math.abs(bottom2 - bottom1);

         //lisäsin tähän vielä bottom1 ja bottom2 tarkastukset, kun välillä tuppasi milloin mistäkin ihmeen syystä
         //hiutaleet jumiutumaan jo taivaalle, ja sehän ei ollut ollenkaan kivaa. Ns. varmuusvara.
         if (xDistance <= 28 && yDistance <= 28 && bottom1 <= 200 && bottom2 <= 200) {

            flake1.style.animationPlayState = 'paused';
            skip = true;
            break;
         }
       }
     }
   } else {
     break;
   }
  }
  window.requestAnimationFrame(tarkistaHiutaleet);
}

/*
* Funktiolla alustetaan sinusskrolleri ja tarvittavat muuttujat sen kanssa leikkimiseen.
*/
function asetaSiniSkrolleri() {

  siniSkrolleri = document.getElementById('siniSkrolleri');
  siniSkrolleri.width = document.documentElement.clientWidth*4.0;
  siniSkrolleri.height = document.documentElement.clientHeight;

  let ctxSini = siniSkrolleri.getContext('2d'),
      paikka = document.documentElement.clientWidth,
      w = siniSkrolleri.width,
      h = siniSkrolleri.height,
      //skrollerin nopeus
      nopeus = 0.07,
       //liikkeen amplitudi, mitä isompi, niin sen "näyttävämpi" eli laajemmassa kaaressa teksti liikkuu
      laajuus = 20,
      //merkkien väli
      vali = 14,
      kulma = 0.0,
      //kasvattamalla tätä vakioarvoa lopputuloksesta saadaan ns. enemmän kiemurteleva, mutta liika on liikaa
      vakio = 0.7,
      //merkkijono splitattuna taulukkoon
      aTeksti = teksti.split(''),
      //tämän arrayn arvot pitävät kirjaa yksittäisen kirjainten saamista
      //y-arvoista, joita käytetään hyväksi fillTextissä.
      y = new Array(teksti.length),
      dx = ((2 * Math.PI) / w) * vali + vakio,
      x = kulma,
      xSijainti,
      ySijainti,
      pituus = aTeksti.length;

  let kirjaimenKoko = document.documentElement.clientHeight/25;

  ctxSini.font = kirjaimenKoko + 'px ' + font;
  ctxSini.fillStyle = 'white';

  (function animoiSkrolleri() {

    //pyyhitään aikaisemmat
    ctxSini.clearRect(0, 0, w, h);

    //liikutetaan kanvasta hiljalleen
    paikka = paikka - 4;
    siniSkrolleri.style.left = paikka + 'px';

    //kun kanvas meinaa mennä liian kauas niin palautetaan takaisin ruotuun
    if (paikka <= -(teksti.length * vali * 2.2)) {
        paikka = document.documentElement.clientWidth;
    }

    //kasvatetaan kulmaa
    kulma = kulma + nopeus;
    x = kulma;

    //lasketaan y-arvot merkkijonon kaikille merkeille fillTextiä varten
    for (let i = 0; i < y.length; i++) {

      y[i] = Math.sin(x) * laajuus;
      x = x + dx;
    }

    //piirretään kaikki merkit kanvakselle yksitellen
    for (let i = 0; i < teksti.length; i++) {

      xSijainti = (i * (vali * 2)) + (Math.sin(x) * laajuus);
      ySijainti = (y[i] * 2.2) + (h / 2.2);

      //kirjain kerrallaan vaihtelevaan sijaintiin
      ctxSini.fillText(aTeksti[i], xSijainti, h/6.5 + ySijainti);
      x = x + dx + Math.cos(nopeus * x);
    }

    //aloitetaan alusta
    window.requestAnimationFrame(animoiSkrolleri);
  })();

}


/*
* Funktiolla tehdään tarvittavat alustukset tekstiskrollerille: kirjasin, kirjasinkoko,
* gradientti, canvaksen mitat. Ja lopulta kutsutaan ensimmäisen kerran liikutaSkrolleria, joka
* hoitaa jatkuvan animaation ylläpitämisen.
*/
function asetaSkrolleri() {

  let w = document.documentElement.clientWidth,
      h = document.documentElement.clientHeight,
      kirjaimenKoko = h/5;

  cSkrolleri = document.getElementById('skrolleri');
  cSkrolleri.width = w;
  cSkrolleri.height = h/3.1;

  ctxSkrolleri = cSkrolleri.getContext('2d');
  let merkkiMaara = teksti.length;

  paikka = w;

  let gradient = ctxSkrolleri.createLinearGradient(0, 0, 0, cSkrolleri.height);
  gradient.addColorStop(0, "black");
  gradient.addColorStop(0.3, "yellow");
  gradient.addColorStop(0.55, "black");

  ctxSkrolleri.font = kirjaimenKoko + 'px ' + font;
  ctxSkrolleri.fillStyle = gradient;

  ctxSkrolleri.fillText(teksti, 0, cSkrolleri.height/1.8);
  liikutaSkrolleria();

}

/*
* Aluksi vanha teksti pyyhitään pois, ja sitten muutetaan hieman x-koordinaattia (paikka) ,
* ja laitetaan sen mukaisesti uusi teksti hieman eri paikkaan. Tätä loputtomasti toistettaessa (requestAnimationFrame),
* skrollaus näyttää sulavalta.
*/
function liikutaSkrolleria() {

  ctxSkrolleri.clearRect(0, 0, cSkrolleri.width, cSkrolleri.height);
  cSkrolleri.style.marginTop = document.documentElement.clientHeight/2.5 + 'px';
  paikka = paikka - 4;

  if (paikka <= -ctxSkrolleri.measureText(teksti).width) {
    paikka = document.documentElement.clientWidth;
  }

  ctxSkrolleri.fillText(teksti, paikka, cSkrolleri.height/2);
  window.requestAnimationFrame(liikutaSkrolleria);
}

/*
* Funktio tuottaa yhden lisäpöllön. Ensin vakiopöllöstä kloonataan kopio; lisäpöllö.
* Sitten tarkastetaan tuleeko pöllö lähettää vasemmalle vai oikealle ja arvotaan
* sattumanvarainen 'arpanumero', jonka perusteella pöllölle asetetaan tyylittelyluokka.
* Ja lopuksi lisätään pöllö sivun kontenttiin.
*/
function lisaaPollo() {

  let defaultOwl = document.getElementsByName('owl')[0],
      newOwl = defaultOwl.cloneNode();

  //lähetetäänkö pöllö oikealle vai vasemmalle, eli kääntämällä animaatio
  if (rOwl === true) {
    newOwl.style.animationDirection = 'reverse';
    rOwl = false;
  } else {
    rOwl = true;
  }

  //arvotaan arvo väliltä 1-4
  let arpa = Math.floor(Math.random() * 5);

  //sen mukainen luokka animaatiota varten
  newOwl.className = 'owl' + arpa;
  document.getElementById('content').appendChild(newOwl);
}

/*
* Alustetaan asioita.
*/
window.onload = function() {
    flakes.push(document.getElementsByName('snowflake')[0]); //kaikkien hiutaleiden äiti, josta muut sitten lopulta kloonataan
    luoPupu();
    luoPalkit(); //horisontaaliset, vertikaalisesti liikkuvat gradienttipalkit
    //luoLumisade(); //kutsutaan hiutaleiden luojaa
    //tarkistaHiutaleet(); //kutsutaan hiutaleiden päällekkäisyystarkastelijaa
    asetaSkrolleri(); //gradienttiskrolleri tekstille
    asetaSiniSkrolleri(); //sinuskrollerin alustus samalle tekstille
    let polloPainike = document.getElementById('addOwl');
    polloPainike.addEventListener('click', function() { lisaaPollo(); });
}
