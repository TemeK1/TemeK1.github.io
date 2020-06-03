"use strict";
// seuraavat estävät jshintin narinat jqueryn ja leafletin objekteista
/* jshint jquery: true */
/* globals L */


// kirjoita tänne oma ohjelmakoodisi

/*
* Web-käyttöliittymien ohjelmointi. Viikkotehtävä 5.
* jQuery, Drag & Drop, kartat
* Vitostason palautus.
*/

var dRastit, //tähän haetaan Map-rakenne, jossa arvona toimii rastin koodi
    kRastit, //tähän haetaan Map-rakenne, jossa arvona toimii rastiolio
    mJoukkueet, //tähän haetaan Map-rakenne, jossa arvona toimii joukkueolio
    kartta, //tähän muuttujaan tallennetaan kartta
    merkki, //markeria varten
    //indikoi raja-arvoja määrittävän laatikon leveyttä metreinä, käytetään hyväksi määritettäessä tooltipin etäisyyttä ympyrästä
    //arvo on nyt 400, sillä laatikon keskileveys on ympyrän keskipisteessä. Joten Puolet (200 metriä tässä tapauksessa) jää keskipisteen oikealle puolelle kuten vaatimuksissa oli.
    boundsValue = 400,
    vPallo, //kulloinkin käpälöitävä circle
    pallerot = [], //kaikki circlet tallennetaan tauluun
    polylinet = new Map(); //arvona toimii polylineolio

/*
* Alustetaan asioita.
*/
$(document).ready(function() {

  dRastit = haeRastit(0);
  kRastit = haeRastit(1);
  mJoukkueet = haeJoukkueId(); //haetaan Map-rakenne kaikista joukkueista globaaliin muuttujaan.
  luoJoukkueListaus(); //luodaan kaikki joukkue-elementit Joukkue-laatikkoon
  luoKartta(); //kartan luonti ja asettelu
  piirraRastit(); //rastien piirto kartalle
  siirronKuuntelijat(); //kuuntelijoiden alustus Kartalla ja Joukkue -listoille.

});

/*
* Funktio hakee kaikki rastit data-rakenteesta ja lisää tiedot Map-objektiin.
* @param tyyppi kertoo että tuleeko mappirakenteeseen tallentaa arvoksi vain rastin koodi vai koko rastiobjekti.
* @returns {Map} palauttaa map-assosiaatiorakenteen
*/
function haeRastit(tyyppi) {

  let rastikirja = new Map();

  if (tyyppi == 0) {
    for (let kilpailu of data) {
      for (let rasti of kilpailu['rastit']) {
        rastikirja.set(rasti['id'], (rasti['koodi'].toString()));
      }
    }
  } else {

    for (let kilpailu of data) {
      for (let rasti of kilpailu['rastit']) {
        rastikirja.set(rasti['id'], rasti);
      }
    }
  }

  return rastikirja;
}

/*
* Funktio assosiatiivisen rakenteen tekoa varten, jossa avaimena toimii
* joukkueen id ja arvona joukkue-objektin viite.
* @returns {Map} palauttaa map-assosiaatiorakenteen
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
* Tämän voimin luodaan joukkueiden ja niiden jäsenten
* oikeaoppinen listaus sivun laitaan. Kutsutaan aina
* muutosten koittaessa ja pyyhitään edeltävä listaus pois alta
* ensitöiksi.
*/
function luoJoukkueListaus() {

  //joukkuelista
  let lista = $('#joukkueet');

  let aJoukkueet = haeJoukkueet(1);

  for (let i = 0; i < aJoukkueet.length; i++) {

    let li = document.createElement('li'),
        nimi = document.createTextNode(aJoukkueet[i]['nimi'] + ' ' + aJoukkueet[i]['matka'] + ' km');
        li.setAttribute('draggable', 'true');
        li.setAttribute('class', 'joukkue');
        li.setAttribute('id', aJoukkueet[i]['jId']);


    li.addEventListener("dragstart", function(e) {
       // raahataan datana elementin id-attribuutin arvo
       //käytetään id:nä joukkueen id:tä
       e.dataTransfer.setData("text/plain", e.target.getAttribute('id'));
    });

    //sateenkaariväritys elementille
    li.style.backgroundColor = rainbow(aJoukkueet.length, i);
    lista.append(li);
    li.appendChild(nimi);

  }

}

/*
* Tällä funktiolla piirretään kaikki rastit kartalle ympyröinä
* ja asetetaan niille tapahtumankuuntelijat tooltip-toiminnallisuutta varten.
*/
function piirraRastit() {

  for (let kilpailu of data) {
    if (kilpailu.nimi === 'Jäärogaining') {
      for (let rasti of kilpailu.rastit) {
        let circle = L.circle(
              [parseFloat(rasti.lat), parseFloat(rasti.lon)], {
                  color: 'red',
                  fillColor: 'red',
                  fillOpacity: 0.3,
                  radius: 150
              }
        ).addTo(kartta);

        let x = circle.getLatLng(),
            rajat = circle.getLatLng().toBounds(boundsValue),
            tyyli = '';

        if (rasti.koodi == 'LAHTO' || rasti.koodi == 'MAALI') {
          tyyli = 'tooltip';
        }


        let tooltip = L.tooltip({
          direction: 'right',
          permanent: true,
          sticky: true,
          opacity: 0.3,
          className: tyyli
        }).setContent(rasti.koodi);

        circle.bindTooltip(tooltip).openTooltip([x.lat, rajat._northEast.lng]);

        circle.addEventListener('mousemove', function() {
          circle.getTooltip().setOpacity(1.0);
        });

        circle.addEventListener('mouseout', function() {
          circle.getTooltip().setOpacity(0.3);
        });


        //tooltip.setLatLng([x.lat, rajat._northEast.lng]).addTo(kartta);

        //kolmostason marker-systeemi pistetty pyydetysti kommentteihin tästä alaspäin.
        //klikkitapahtuma ympyrälle sen läpinäkyvyyden säätämiseksi
        //ja siirtomarkerin asettelemiseksi.
        //circle.addEventListener("click", function(e) {

        //  for (let circle of pallerot) {
        //    circle.setStyle({
        //      fillOpacity: 0.5
        //    });
        //  }

        //  e.target.setStyle({
        //    fillOpacity: 1.0
        //  });

          //jos marker löytyy entuudestaan niin poistetaan se ennen uuden luontia
          //if (merkki !== undefined) {
          //  merkki.remove();
          //}

          //merkki = L.marker(this.getLatLng(), { draggable: true });
          //merkki.addTo(kartta);

          //dragend tapahtuma markerille, jossa rastioliolle sekä ympyrälle asetetaan uudet
          //markerin sijaintia vastaavat koordinaatit
          //merkki.addEventListener("dragend", function(e) {

          //  let koordinaatit = this.getLatLng();
          //  rasti.lat = koordinaatit.lat.toString();
          //  rasti.lon = koordinaatit.lng.toString();

          //  circle.setLatLng(this.getLatLng());

          //  let joukkueElementit = document.getElementsByClassName('joukkue');

          //  for (let i = 0; i < joukkueElementit.length; i++) {

          //    let matkaKm = joukkueenMatkaJaAika(parseInt(joukkueElementit[i].getAttribute('id')), false);
          //    let joukkue = mJoukkueet.get(parseInt(joukkueElementit[i].getAttribute('id')));

              //tarkastetaan, että kuinka syvälle rakenteessa tarvitsee mennä elementin tekstisisältöä
              //päivitettäessä. Syvyys vaihtelee yhden askeleen verran riippuen siitä, että onko joukkueen nimielementti
              //details-elementin lapsi (vasen Kartalla-listaus) vai ei (oikea Joukkuelistaus)
          //    if (joukkueElementit[i].firstChild.firstChild) {
          //      joukkueElementit[i].firstChild.firstChild.textContent = joukkue.nimi + ' ' + matkaKm + ' km';
          //    } else {
          //      joukkueElementit[i].firstChild.textContent = joukkue.nimi + ' ' + matkaKm + ' km';
          //    }

          //  }

          //  merkki.remove();

          //});
        //});
        //lisätään vielä uusin ympyrä globaaliin tauluun, jotta pysytään niistä kaikista kirjoilla.
        pallerot.push(circle);

        //hiiren nappulan alastuonti, eli 'ympyrän kiinnitys'
        circle.addEventListener("mousedown", function (e) {
           kartta.dragging.disable();
           vPallo = e.target;

           vPallo.setStyle({
             fillOpacity: 0.3,
             fillColor: 'blue'
           });

           //kursorin/ympyrän liikutus kartalla kun ympyrä on ensin kiinnitetty
           kartta.addEventListener("mousemove", function (e) {

             if (vPallo) {
               vPallo.setLatLng(e.latlng);
             }

             let x = vPallo.getLatLng();
             let rajat = vPallo.getLatLng().toBounds(boundsValue);
             vPallo.closeTooltip();
             vPallo.openTooltip([x.lat, rajat._northEast.lng]);

          });
       });

       //hiiren nappulan ylöstuonti 'ympyrän vapautus'
       circle.addEventListener("mouseup", function (e) {

           kartta.dragging.enable();
           //poistetaan vanha liikutus kartalla tapahtuma
           kartta.removeEventListener("mousemove");

           for (let circle of pallerot) {
               circle.setStyle({
               fillOpacity: 0.3,
               fillColor: 'red'
               });
           }

           let koordinaatit = vPallo.getLatLng();
           rasti.lat = koordinaatit.lat.toString();
           rasti.lon = koordinaatit.lng.toString();
           //vPallo.setLatLng(this.getLatLng());
           let joukkueElementit = document.getElementsByClassName('joukkue');

           for (let i = 0; i < joukkueElementit.length; i++) {

              let matkaKm = joukkueenMatkaJaAika(parseInt(joukkueElementit[i].getAttribute('id')), false);
              let joukkue = mJoukkueet.get(parseInt(joukkueElementit[i].getAttribute('id')));

               //tarkastetaan, että kuinka syvälle rakenteessa tarvitsee mennä elementin tekstisisältöä
               //päivitettäessä. Syvyys vaihtelee yhden askeleen verran riippuen siitä, että onko joukkueen nimielementti
               //details-elementin lapsi (vasen Kartalla-listaus) vai ei (oikea Joukkuelistaus)
              if (joukkueElementit[i].firstChild.firstChild) {
                 joukkueElementit[i].firstChild.firstChild.textContent = joukkue.nimi + ' ' + matkaKm + ' km';
              } else {
                 joukkueElementit[i].firstChild.textContent = joukkue.nimi + ' ' + matkaKm + ' km';
              }

          }

           //päivitetään vielä polylinet kartalla vastaamaan muuttuneita rastikoordinaatteja
           paivitaReitit();
       });
     }
    }
  }
}

/*
* Poistetaan ensimmäisenä vanhat polylinet, ja sitten
* lisätään uudet päivittyneiden koordinaattien mukaiset polylinet.
*/
function paivitaReitit() {

  let joukkueet = document.getElementsByClassName('joukkue');
  let joukkueetKartalla = document.getElementById('vJoukkueet').getElementsByClassName('joukkue');

  //poistetaan eka vanhat reitit
  for (let i = 0; i < joukkueet.length; i++) {
    let id = joukkueet[i].getAttribute('id');
    if (polylinet.has(id)) {
      polylinet.get(id).remove(kartta);
    }
  }

  //tyhjennetään vanhat arvot Map-rakenteesta, jottei turhaan tule duplikaatteja
  polylinet.clear();

  for (let e = 0; e <= joukkueetKartalla.length -1; e++) {
    let koordinaatit = [];
    let joRastit = [];
    let id = joukkueetKartalla[e].getAttribute('id');

    //jos elementtiin tallennetun id-arvon mukainen joukkue löytyy niin sitten
    //haetaan sen rastit. Muussa tapauksessa hypätään seuraavalle kierrokselle.
    if (mJoukkueet.get(parseInt(id))) {
      joRastit = mJoukkueet.get(parseInt(id)).rastit;
    } else {
      continue;
    }


    for (let rasti of joRastit) {
      let tiedot = kRastit.get(parseInt(rasti.rasti));
      //katsotaan että oliko rasti jäsenneltävissä eli käytännössä, että oliko
      //se oikeellinen. Jos ei niin hypätään silmukan seuraavalle kierrokselle.
      if (tiedot == undefined) continue;

      //oikeellisen rastin lat ja loon lisätään joukkueen koordinaattitietoihin
      koordinaatit.push([parseFloat(tiedot.lat), parseFloat(tiedot.lon)]);
    }

    //oikeellisten rastien koordinaattien pohjalta piirretään polyline
    let polyline = L.polyline(koordinaatit, {color: document.getElementById(id).style.backgroundColor}).addTo(kartta);
    //ja asetetaan uusi polyline vielä globaaliin Map-rakenteeseen myöhempää tarkastelua varten
    polylinet.set(id, polyline);
  }


}
/*
* Luodaan kartta, asetetaan mitat, näkymän keskipiste, kartan taso
* ja asetetaan kartta oikeaan div-elementtiin.
*/
function luoKartta() {

  let div = $("#map");
	div.css("width", Math.round(window.innerWidth) + "px");
	div.css("height", Math.round(window.innerHeight/1.7) + "px");

  kartta = new L.map('map', {
       crs: L.TileLayer . MML. get3067Proj()
     }).setView([62.130280, 25.666688], 11);

  let aRastit = Array.from(kRastit.values());
  //selvitetään min ja max -koordinaatit, jotta osataan
  //asetella fitBoundsille oikeaoppiset parametrit.
  let minLat = parseFloat(aRastit[0].lat),
      maxLat = parseFloat(aRastit[0].lat),
      minLon = parseFloat(aRastit[0].lon),
      maxLon = parseFloat(aRastit[0].lon);

  for (let i = 0; i < aRastit.length; i++) {

     let lat = parseFloat(aRastit[i].lat),
         lon = parseFloat(aRastit[i].lon);

     if (lat < minLat) {
       minLat = lat;
     }

     if (lat > maxLat) {
       maxLat = lat;
     }

     if (lon < minLon) {
       minLon = lon;
     }

     if (lon > maxLon) {
       maxLon = lon;
     }
  }

  kartta.fitBounds([[minLat, minLon], [maxLat, maxLon]]);

  L.tileLayer.mml_wmts({ layer: "maastokartta" }).addTo(kartta);

}

/*
* Tällä luodaan kaikki tärkeät kuuntelijat sekä joukkue, että
* kartalla listojen interaktiivisia toimintoja varten.
*/
function siirronKuuntelijat() {

  let vJoukkueet = document.getElementById('vJoukkueet');
  let joukkueet = document.getElementById('joukkueet');

  //raahaamisen kuuntelija Kartalla-listalle
  vJoukkueet.addEventListener("dragover", function(e) {
    e.preventDefault();
    // Set the dropEffect to move
    e.dataTransfer.dropEffect = "move"
  });

  //pudotuksen kuuntelija Kartalla-listalle
  vJoukkueet.addEventListener("drop", function(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text/plain");

    //jos ollaankin raahaamassa rastielementtiä niin lyödään stuntti seis
    //kun ei me kaivata tässä vaiheessa kuin joukkue-elementtejä.
    if (document.getElementById(data).className == 'rasti') {
      return;
    }

    let eJoukkue = document.getElementById(parseInt(data));
    // lisätään siirretty joukkue Kartalla-listan ensimmäistä lapsielementtiä edeltäväksi
    vJoukkueet.insertBefore(eJoukkue, vJoukkueet.firstChild);

    //poistetaan juuri siirretyltä joukkueelta nimitiedot, ja lisätään ne hieman myöhemmin eri tavalla
    eJoukkue.removeChild(eJoukkue.firstChild);

    let koordinaatit = [];
    //haetaan joukkueen rastileimaukset
    let jRastit = mJoukkueet.get(parseInt(data)).rastit;

    //tarkistetaan niiden oikeellisuus
    for (let rasti of jRastit) {
      let tiedot = kRastit.get(parseInt(rasti.rasti));

      //seuraavalle kierrokselle, jos leima ei ollut oikeellinen
      if (tiedot == undefined) continue;

      //muussa tapauksessa lisätään oikeelliset koordinaatit koordinaatti-tauluun
      koordinaatit.push([parseFloat(tiedot.lat), parseFloat(tiedot.lon)]);

    }

    //jos sama polyline löytyy ennestään niin poistetaan se ensin
    if (polylinet.has(data)) {
      polylinet.get(data).remove(kartta);
    }

    //luodaan koordinaattien pohjalta uusi poyline
    let polyline = L.polyline(koordinaatit, {color: document.getElementById(data).style.backgroundColor}).addTo(kartta);
    polylinet.set(data, polyline);

    //details ja summary elementeillä tehdään vitostason hieno rastilistaus
    let details = document.createElement('details'),
        summary = document.createElement('summary'),
        joukkue = mJoukkueet.get(parseInt(data)),
        ul = document.createElement('ul'),
        rastit = joukkue.rastit,
        nimiTeksti = document.createTextNode(joukkue.nimi + ' ( ' + joukkueenMatkaJaAika(parseInt(data), false) + ' km )');

    eJoukkue.appendChild(details);
    details.appendChild(summary);
    details.appendChild(ul);
    summary.appendChild(nimiTeksti);

    //iteroidaan joukkueen kaikkien leimausten läpi
    for (let r of rastit) {

      let rastinKoodi = dRastit.get(parseInt(r.rasti));
      //mennään seuraavalle kierrokselle, jos leimauksen koodi ei ollut oikeellinen
      if (typeof rastinKoodi == 'undefined') {
        continue;
      }

      //muussa tapauksessa luodaan tarvittavat elementin leimauselementtiä varten
      let teksti = document.createTextNode(rastinKoodi),
          li = document.createElement('li');

      //leimauselementin id koostuu joukkueen id:n, g-kirjaimen ja rastin id:n yhdistelmästä duplikaattien välttämiseksi
      li.setAttribute('id', joukkue.id + 'g' + r.rasti);
      li.setAttribute('class', 'rasti');
      li.setAttribute('draggable', 'true');
      ul.appendChild(li);
      ul.setAttribute('class', joukkue.id);
      li.appendChild(teksti);

      //raahauksen tarkastelija leimauselementtiä varten
      li.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });

      //tarkastelija sille, että raahataanko kyseistä leimauselementtiä
      li.addEventListener("dragstart", function(e) {
         // raahataan datana elementin id-attribuutin arvo
         e.dataTransfer.setData("text/plain", e.target.getAttribute('id'));
      });

      //listaelementtien drop-tapahtumankuuntelija
      li.addEventListener("drop", function(e) {
        e.preventDefault();

        try {
          //kokeillaan, että josko siirtoa kaipaava leimauselementti löytyisi sekä sitä vastaava joukkue
          let data2 = e.dataTransfer.getData("text/plain");
          let id = parseInt((data2).split('g')[0]);
          let joukkue1 = mJoukkueet.get(id);
          let ul = document.getElementsByClassName(joukkue1.id)[0];

          let joukkue2 = mJoukkueet.get(parseInt(e.target.parentNode.parentNode.parentNode.getAttribute('id')));

          //tarkistetaan vain varmuuden vuoksi, että ei olla siirtämässä leimaa toisen joukkueen tontille
          if (joukkue1 == joukkue2) {
            e.target.parentNode.insertBefore(document.getElementById(data2), e.target);
          }
        }
        catch (e) {
          console.log("Huomattiin virhe elementin siirtämisessä.");
        }

        //mikäli kaikki meni tähän saakka hyvin niin voidaan selvittää muuttunut
        //leimausten järjestys ja tallentaa tämä uusi järjestys joukkueen rastit-tauluun
        let parentList = li.parentNode.parentNode.parentNode;
        let id = parseInt(parentList.getAttribute('id')),
            joukkue = mJoukkueet.get(id),
            eRastit = parentList.getElementsByClassName('rasti'),
            uRastit = [],
            rMap = new Map();

        for (let eRasti of eRastit) {
          for (let rasti of joukkue.rastit) {
            if (parseInt(eRasti.getAttribute('id').split('g')[1]) == parseInt(rasti.rasti)) {
              rMap.set(parseInt(rasti.rasti), rasti);
            }
          }
        }

        uRastit = Array.from(rMap.values());

        joukkue.rastit.length = 0;
        joukkue.rastit = uRastit;

        //sitten lasketaan joukkueen muuttunut matka kilometreinä
        let matkaKm = joukkueenMatkaJaAika(id, false);
        //päivitetään muutokset leimauselementtiin
        parentList.firstChild.firstChild.textContent = joukkue.nimi + ' ( ' + matkaKm + ' km )';
        //päivitetään vielä reitit
        paivitaReitit();

      });

    }

    //viimeinen listaelementti, joka pysyy tyhjänä aina. Tällä tarjotaan mahdollisuutta siirtää
    //leimaus nätisti viho viimeiseksi.
    let liEmpty = document.createElement('li');
    liEmpty.setAttribute('id', 'liEmpty');
    liEmpty.setAttribute('class', 'cLiEmpty');
    ul.appendChild(liEmpty);

    liEmpty.addEventListener("drop", function(e) {
      e.preventDefault();

      try {
        let data3 = e.dataTransfer.getData("text/plain");
        let id = parseInt((data3).split('g')[0]);
        let joukkue1 = mJoukkueet.get(id);
        let ul = document.getElementsByClassName(joukkue1.id)[0],
        parentList = liEmpty.parentNode.parentNode.parentNode,
        eRastit = parentList.getElementsByClassName('rasti'),
        uRastit = [],
        rMap = new Map();

        //tarkistetaan, ettei olla naapurijoukkueen tontilla
        let joukkue2 = mJoukkueet.get(parseInt(e.target.parentNode.parentNode.parentNode.getAttribute('id')));
        if (joukkue1 == joukkue2) {
          e.target.parentNode.insertBefore(document.getElementById(data3), e.target);

          for (let eRasti of eRastit) {
            for (let rasti of joukkue.rastit) {
              if (parseInt(eRasti.getAttribute('id').split('g')[1]) == parseInt(rasti.rasti)) {
                rMap.set(parseInt(rasti.rasti), rasti);
              }
            }
          }

          uRastit = Array.from(rMap.values());

          joukkue.rastit.length = 0;
          joukkue.rastit = uRastit;

          //sitten lasketaan joukkueen muuttunut matka kilometreinä
          let matkaKm = joukkueenMatkaJaAika(id, false);
          //päivitetään muutokset leimauselementtiin
          parentList.firstChild.firstChild.textContent = joukkue.nimi + ' ( ' + matkaKm + ' km )';
          //päivitetään vielä reitit
          paivitaReitit();
        }

      }
      catch (e) {
        console.log('Huomattiin virhe elementin siirtämisessä.')
      }

    });

  }, true);

   //raahauksen tarkastelija Joukkueet-listaa varten
  joukkueet.addEventListener("dragover", function(e) {
    e.preventDefault();
    // Set the dropEffect to move
    e.dataTransfer.dropEffect = "move"
  });

  //pudotuksen tarkastelija Joukkueet-listaa varten
  //kun ollaan siirtämässä joukkue-elementtiä takaisin alkuperäiseen tilaan
  joukkueet.addEventListener("drop", function(e) {
    e.preventDefault();

    let data = e.dataTransfer.getData("text/plain");

    //jos ollaankin raahaamassa rastielementtiä niin lyödään stuntti seis
    if (document.getElementById(data).className == 'rasti') {
      return;
    }

    //muussa tapauksessa jatketaan ja haetaan siirrettävä elementti
    let eJoukkue = document.getElementById(parseInt(data));
    // lisätään siirrettävä elementti joukkue listaan
    joukkueet.appendChild(eJoukkue);
    let joukkue = mJoukkueet.get(parseInt(data));
    //pyyhitään joukkueen polyline pois kartalta
    if (polylinet.has(data)) {
      polylinet.get(data).remove(kartta);
    }

    //poistetaan joukkue-elementin details-härpäke lapsineen
    eJoukkue.removeChild(eJoukkue.firstChild);
    //ja luodaan uusi nimiteksti
    let nimiTeksti = document.createTextNode(joukkue.nimi + ' ' + joukkueenMatkaJaAika(parseInt(data), false) + ' km');
    eJoukkue.appendChild(nimiTeksti);

   });

}

/*
* Funktio koostaa operaation, jossa kaikille joukkueille lasketaan pisteet joukkue kerrallaan (laskeJoukkueenPisteet)
* ja lopulta palauttaa joukkue- ja pistetiedot niitä kaipaavalle.
* @param jarjesta kertoo että minkä attribuutin mukaan joukkuetaulu tulee järjestää. Joko sarjan tai nimen.
* @returns {array} palauttaa kaikki joukkueet matkatietoineen.
*/
function haeJoukkueet(jarjesta) {
  let joukkueet = [];

  for (let kilpailu of data) {
    for (let sarja of kilpailu['sarjat']) {
      for (let joukkue of sarja['joukkueet']) {
        let matkaKm = joukkueenMatkaJaAika(joukkue.id, true);
        joukkueet.push({nimi: joukkue['nimi'], sarja: sarja['nimi'], jasenet: joukkue['jasenet'], matka: matkaKm, jId: joukkue['id']});
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
  }

  return joukkueet;
}

/*
* Funktio selvittää matkan pituuden parametrina tuodun joukkuen id:n mukaan.
* Palauttaa objektin, jossa tieto sekä pituudesta (km) ja ajasta (hh:mm:ss).
* @param id indikoi että minkä joukkueen matkatietoja ollaan selvittämässä
* @param aikaJarjestys, true = järjestetään leimat aikajärjestykseen, false = ei tarvitse järjestää enää
* @returns {Float} Palauttaa joukkueen kulkeman matkan kiometreinä
*/
function joukkueenMatkaJaAika(id, aikaJarjestys) {

  let lat1, lon1, lat2, lon2, mLat, mLon, alku, loppu;
  let matka = 0,
      jRastit = [],
      vRastit,
      tKilpailu,
      mLoydetyt = new Map(),
      muutetutLeimaukset = [],
      tiimi,
      loydetyt = [];

  for (let kilpailu of data) {
    if (kilpailu.nimi === 'Jäärogaining') {
      vRastit = kilpailu.rastit;
      tKilpailu = kilpailu;
    }
  }

  for (let sarja of tKilpailu.sarjat) {
    for (let joukkue of sarja.joukkueet) {
        if (joukkue.id == id) {
          jRastit = joukkue.rastit;
          tiimi = joukkue;
          break;
        }
    }
  }

  for (let rasti2 of jRastit) { //verrataan joukkueen oikeellisia rastisuorituksia kaikkiin rasteihin ja päätellään siitä,
     for (let rasti1 of vRastit) { //että missä lokaatioissa joukkue on käynyt. Tallennetaan 'loydettyihin' aika, sijainti, id ja koodi.
        if (parseInt(rasti1.id) == parseInt(rasti2.rasti)) { //tarkistetaan, että onko joukkue käynyt kyseisellä rastilla.
          mLoydetyt.set(rasti1.id, {aika: rasti2.aika, rasti: rasti1.id, id: rasti1.koodi, lon: rasti1.lon, lat: rasti1.lat});
        }
     }
  }

  loydetyt = Array.from(mLoydetyt.values());

  if (aikaJarjestys === true) {
    //Järjestetään  joukkueen oikeelliset rastitiedot aikajärjestykseen.
    loydetyt.sort(function(a, b) {
     return (a.aika).localeCompare(b.aika);
    });
  }

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

  tiimi.rastit = muutetutLeimaukset;


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

  //palautetaan tieto kokonaismatkan pituudesta kilometreinä
  let matkaKm = Math.round(matka * 10) / 10;
  return matkaKm;
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

  return deg * (Math.PI/180);
}

/*
* Vinkistä kopsittu sateenkaarigeneraattori. :)
*/
function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    let r, g, b;
    let h = step / numOfSteps;
    let i = ~~(h * 6);
    let f = h * 6 - i;
    let q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    let c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}
