(this.webpackJsonpspecies=this.webpackJsonpspecies||[]).push([[0],[,,,,,,function(e,t,a){},,function(e){e.exports=JSON.parse('{"categories":[{"name":"El\xe4inten lajintuntemus - selk\xe4rankaiset","order":[{"name":"Linnut","folder":"birds/","species":[{"id":1,"name":["r\xe4k\xe4ttirastas","turdus pilaris"],"description":"Keskikokoinen, 22-27 cm pitk\xe4. P\xe4\xe4 ja yl\xe4per\xe4 ovat harmaat","pictures":["1_1.jpg","1_2.jpg"],"pictureSkeleton":[{"left":0,"top":10,"width":15,"height":15,"text":"nurmi on vihre\xe4\xe4","picture":0},{"left":25,"top":5,"width":12,"height":20,"text":"linnun p\xe4\xe4 on harmaa","picture":1}],"thumbnails":["1_1.jpg","1_2.jpg"],"tips":["Yksi yleisimpi\xe4 suomen pesim\xe4lintuja","\xe4\xe4ntelee \'kr\xe4k-ks\xe4k-ks\xe4k\'","Kuuluu rastaiden heimoon"]},{"id":2,"name":["harakka","pica pica"],"description":"Mustavalkoinen","pictures":["2_1.jpg"],"pictureSkeleton":[{"left":0,"top":0,"width":50,"height":50,"text":"lintu","picture":0},{"left":40,"top":40,"width":50,"height":50,"text":"lintu","picture":0}],"thumbnails":["2_1.jpg"],"tips":["habituslaji","kuulemma kiinnostunut hopeaesineist\xe4"]}]},{"name":"Kalat","folder":"fish/","species":[{"id":1,"name":["ahven","perca fluviatilis"],"description":"Yleens\xe4 vihre\xe4s\xe4vyinen tummilla pystyraidoilla. Sen vatsaev\xe4t ja pyrst\xf6 ovat puna-oranssit. Tyypillisesti ahven on 15\u201330 sentin pituinen ja 50\u2013350 gramman painoinen ja sen elinik\xe4 on noin kuusi vuotta.","pictures":["1_1.png"],"thumbnails":["1_1.png"]},{"id":2,"name":["hauki","esox lucius"],"description":"Vartalo on pitkulainen ja solakka, ja ev\xe4t ovat per\xe4p\xe4\xe4ss\xe4. Kyljet ovat vihre\xe4t, vatsa vaalea ja selk\xe4 l\xe4hes musta. Kyljiss\xe4 on 7\u20139 hailakankeltaista t\xe4pl\xe4rivi\xe4, ja punaruskeissa eviss\xe4 on tummia l\xe4iski\xe4.","pictures":["2_1.png"],"thumbnails":["2_1.png"]}]},{"name":"Nis\xe4kk\xe4\xe4t","folder":"mammals/","species":[{"id":1,"name":["ahma","gulo gulo"],"description":"Noin 70 cm pitk\xe4. Uroksen paino vaihtelee 8-28 kg:n v\xe4lill\xe4.","pictures":["3_1.jpg"],"thumbnails":["3_1.jpg"],"tips":["isoin n\xe4\xe4t\xe4el\xe4in","melko ahmatti elukka"]},{"id":2,"name":["k\xe4rpp\xe4","mustela erminea"],"description":"Pienikokoinen ja nopea petoel\xe4in. Uroksen ruumis on kooltaan noin 23-27 cm, ja naaraan noin 8-22 cm, ja h\xe4nn\xe4n pituus noin 7-10 cm.","pictures":["4_1.jpg","4_2.jpg"],"thumbnails":["4_1.jpg","4_2.jpg"],"tips":["musta h\xe4nn\xe4n k\xe4rki"]},{"id":3,"name":["lumikko","mustela nivalis"],"description":"Pienikokoinen ja sutjakka. Koko mahdollistaa myyrien kaivamissa tunneleissa liikkumisen ja saalistamisen. Uroksen ruumis on kooltaan noin 15-20 cm, ja naaraan noin 13-15 cm.","pictures":["5_1.jpg","5_2.jpg","5_3.jpg"],"thumbnails":["5_1.jpg","5_2.jpg","5_3.jpg"],"tips":["pienin n\xe4\xe4t\xe4el\xe4in","h\xe4nn\xe4n k\xe4rki ei ole musta"]}]}]},{"name":"El\xe4inten lajintuntemus - selk\xe4rangattomat","order":[]}]}')},,,function(e){e.exports=JSON.parse('{"questionsInTrial":5,"timePerQuestion":120,"timePerExam":1800,"path":"http://users.jyu.fi/~tekapyla/species/img/"}')},function(e,t,a){e.exports=a(18)},,,,,function(e,t,a){},function(e,t,a){"use strict";a.r(t);var i=a(0),s=a.n(i),n=a(10),r=a.n(n),o=(a(17),a(2)),l=a(3),c=a(4),u=a(5),h=a(7),p=a(1),m=(a(6),function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props.path+this.props.folder+this.props.src;return s.a.createElement("div",null,s.a.createElement("img",{className:"Species",src:e,title:this.props.title,alt:this.props.title}))}}]),a}(s.a.Component)),d=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props.path+this.props.folder+this.props.src;return s.a.createElement("div",null,s.a.createElement("img",{className:"Thumbnail",src:e,title:this.props.title,alt:this.props.title}))}}]),a}(s.a.Component),v=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("p",{className:"SkeletonParagraph"},this.props.id+1,". ",this.props.text),s.a.createElement("div",{className:"Skeleton",style:{border:"0.1em dashed orange",left:this.props.left+"vw",top:this.props.top+"vh",width:this.props.width+"vw",height:this.props.height+"vh",position:"absolute",textAlign:"left",opacity:1,zIndex:3}},this.props.id+1,"."))}}]),a}(s.a.Component),k=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(e){var i;return Object(o.a)(this,a),(i=t.call(this,e)).state={counter:0,answer:"",correct:!1,tipVisible:!1,tip:0,shouldIGiveLetter:!1,giveLetter:i.props.name[0].length-1},i.click=i.click.bind(Object(p.a)(i)),i.handleChange=i.handleChange.bind(Object(p.a)(i)),i.helpWithName=i.helpWithName.bind(Object(p.a)(i)),i.showTip=i.showTip.bind(Object(p.a)(i)),i.reset=i.reset.bind(Object(p.a)(i)),i.props.reset(i.reset),i}return Object(l.a)(a,[{key:"click",value:function(e){e<=this.props.pictures.length-1&&this.setState({counter:e})}},{key:"showTip",value:function(){this.props.tips&&(this.state.tip<this.props.tips.length&&!1===this.state.tipVisible?this.setState({tipVisible:!0},function(){this.updateItem(this.state)}.bind(this)):this.state.tip<this.props.tips.length&&!0===this.state.tipVisible?this.setState({tip:this.state.tip+1},function(){this.updateItem(this.state)}.bind(this)):this.setState({tipVisible:!1,tip:0,shouldIGiveLetter:!0},function(){this.updateItem(this.state)}.bind(this)))}},{key:"helpWithName",value:function(){if(!(this.state.giveLetter<0)){var e=this.props.name[0].substr(this.state.giveLetter,this.props.name[0].length);this.setState({answer:e,giveLetter:this.state.giveLetter-1},function(){this.updateItem(this.state)}.bind(this))}}},{key:"handleChange",value:function(e){var t=e.target,a=t.value,i=!1;if("answer"===t.name){this.setState({answer:a});var s,n=Object(h.a)(this.props.name);try{for(n.s();!(s=n.n()).done;){var r=s.value;if(0===a.toLowerCase().trim().localeCompare(r)){t.setCustomValidity(""),i=!0;break}i=!1,t.setCustomValidity("V\xe4\xe4r\xe4 nimi")}}catch(o){n.e(o)}finally{n.f()}}i!==this.state.correct&&this.setState({correct:i},function(){this.updateItem(this.state)}.bind(this))}},{key:"handleSubmit",value:function(e){e.preventDefault()}},{key:"updateItem",value:function(){this.setState(this.state)}},{key:"reset",value:function(){this.setState({counter:0,answer:"",correct:!1,tipVisible:!1,tip:0,shouldIGiveLetter:!1,giveLetter:this.props.name[0].length-1},function(){this.updateItem(this.state)}.bind(this))}},{key:"render",value:function(){var e=this,t=this.props.pictures.map((function(t){return s.a.createElement(m,{key:t,id:e.props.id,title:e.props.id,path:e.props.path,folder:e.props.folder,src:t})})),a=this.props.thumbnails.map((function(t,a){return s.a.createElement("div",{key:"t_"+t,onClick:function(){return e.click(a)}},s.a.createElement(d,{style:{order:a},id:e.props.id,title:e.props.id,path:e.props.path,folder:e.props.folder,src:t}))})),i=(this.props.skeleton&&!this.props.exam&&this.props.skeleton.map((function(e,t){return s.a.createElement(v,{id:t,left:e.left,top:e.top,width:e.width,height:e.height,text:e.text})})),!this.props.tips||this.props.exam||this.state.shouldIGiveLetter?"":s.a.createElement("div",{className:"Tip",onClick:function(){return e.showTip()}},s.a.createElement("p",null,"N\xe4yt\xe4 vihje"))),n=this.props.tips&&this.state.tipVisible&&!this.props.exam?this.props.tips[this.state.tip]:"",r=this.state.shouldIGiveLetter&&!this.props.exam?s.a.createElement("div",{onClick:function(){return e.helpWithName()},className:"NameHelp"},s.a.createElement("p",null,"Klikkaile, jos tarvitset apua nimen kanssa.")):s.a.createElement("div",null,s.a.createElement("p",null));return s.a.createElement("div",null,s.a.createElement("div",{className:"Pictures"},t[this.state.counter]),s.a.createElement("div",{className:"Thumbnails"},a),s.a.createElement("div",{className:"Specimen"},s.a.createElement("p",{className:"description"},this.props.description),s.a.createElement("p",null,s.a.createElement("label",null,"Mik\xe4 laji on kyseess\xe4? ",s.a.createElement("input",{type:"text",minLength:"2",name:"answer",value:this.state.answer,onChange:this.handleChange,required:"required"}))),i,s.a.createElement("p",null,n),r))}}]),a}(s.a.Component),f=a(8),g=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(e){var i;Object(o.a)(this,a),i=t.call(this,e);var s=JSON.parse(JSON.stringify(f)),n=Math.floor(Math.random()*s.categories[0].order.length),r=Math.floor(Math.random()*s.categories[0].order[n].species.length);return i.state={answer:"",category:0,counter:0,data:s,pictureInt:0,rndSpecimen:r,rndOrder:n,reset:null,seconds:i.props.time,time:{},timerBackgroundColor:"blue",timePerQuestion:i.props.timePerQuestion,questions:i.props.questions,questionCounter:0,answers:[]},i.timer=0,i.click=i.click.bind(Object(p.a)(i)),i.handleAnswer=i.handleAnswer.bind(Object(p.a)(i)),i.handleSubmit=i.handleSubmit.bind(Object(p.a)(i)),i.startTimer=i.startTimer.bind(Object(p.a)(i)),i.countDown=i.countDown.bind(Object(p.a)(i)),i.getSpecimen=i.getSpecimen.bind(Object(p.a)(i)),i.registerReset=i.registerReset.bind(Object(p.a)(i)),0==i.timer&&i.state.seconds>0&&(i.timer=setInterval(i.countDown,1e3)),i}return Object(l.a)(a,[{key:"secondsToTime",value:function(e){var t=e%3600,a=t%60;return{h:Math.floor(e/3600),m:Math.floor(t/60),s:Math.ceil(a)}}},{key:"componentDidMount",value:function(){var e=this.secondsToTime(this.state.seconds);this.setState({time:e})}},{key:"click",value:function(e){this.setState({counter:e})}},{key:"startTimer",value:function(){0==this.timer&&this.state.seconds>0&&(this.timer=setInterval(this.countDown,1e3))}},{key:"countDown",value:function(){var e=this.state.seconds-1;this.setState({time:this.secondsToTime(e),seconds:e}),0==e&&(clearInterval(this.timer),this.setState({timerBackgroundColor:"red"}))}},{key:"handleAnswer",value:function(e){var t=e.target,a=t.value,i=!1;if("answer"===t.name){this.setState({answer:a});var s,n=Object(h.a)(this.state.data.categories[this.state.category].order[this.state.rndOrder].species[this.state.rndSpecimen].name);try{for(n.s();!(s=n.n()).done;){var r=s.value;if(0===a.toLowerCase().trim().localeCompare(r)){t.setCustomValidity(""),i=!0;break}i=!1,t.setCustomValidity("V\xe4\xe4r\xe4 nimi")}}catch(o){n.e(o)}finally{n.f()}}i!==this.state.correct&&this.setState({correct:i},function(){this.updateItem(this.state)}.bind(this))}},{key:"handleSubmit",value:function(e){if(e.preventDefault(),this.state.questionCounter-this.state.questions!=1){var t=JSON.parse(JSON.stringify(this.state.answers)),a={};!0===this.state.correct?t[this.state.questionCounter]=!0:t[this.state.questionCounter]=!1,a.answers=t,a.answer="",this.state.questionCounter<this.state.questions&&(a.questionCounter=this.state.questionCounter+1);var i=Math.floor(Math.random()*this.state.data.categories[this.state.category].order.length);a.rndOrder=i,a.rndSpecimen=Math.floor(Math.random()*this.state.data.categories[this.state.category].order[i].species.length),this.setState(a,function(){this.updateItem(this.state)}.bind(this))}}},{key:"getSpecimen",value:function(){var e=JSON.parse(JSON.stringify(this.state.data.categories[this.state.category].order[this.state.rndOrder].species[this.state.rndSpecimen]));return e.folder=this.state.data.categories[this.state.category].order[this.state.rndOrder].folder,e}},{key:"registerReset",value:function(e){this.setState({reset:e})}},{key:"updateItem",value:function(){this.setState(this.state)}},{key:"render",value:function(){var e=this,t=0==this.state.time.m&&0==this.state.time.s?s.a.createElement("div",null,"Koe on ohi"):"",a=s.a.createElement("div",null,"Teht\xe4v\xe4 ",this.state.questionCounter+1,"."),i=this.getSpecimen(),n=i.pictures.map((function(t){return s.a.createElement(m,{key:t,id:e.props.id,title:e.props.id,path:e.props.path,folder:i.folder,src:t})})),r=i.thumbnails.map((function(t,a){return s.a.createElement("div",{key:"t_"+t,onClick:function(){return e.click(a)}},s.a.createElement(d,{style:{order:a},id:e.props.id,title:e.props.id,path:e.props.path,folder:i.folder,src:t}))})),o=s.a.createElement("div",null,s.a.createElement("div",{className:"Pictures"},n[this.state.counter]),s.a.createElement("div",{className:"Thumbnails"},r),s.a.createElement("div",{className:"Specimen"},s.a.createElement("p",{className:"description"},i.description),s.a.createElement("p",null,s.a.createElement("label",null,"Lajin suomenkielinen nimi ",s.a.createElement("input",{type:"text",minLength:"2",name:"answer",value:this.state.answer,onChange:this.handleAnswer,required:"required"}))),s.a.createElement("p",null,s.a.createElement("label",null,"Lajin tieteellinen nimi ",s.a.createElement("input",{type:"text",minLength:"2",name:"answer",value:this.state.answer,onChange:this.handleAnswer,required:"required"}))),s.a.createElement("p",null,s.a.createElement("button",{onClick:this.handleSubmit},"Vastaa"))));return s.a.createElement("div",null,s.a.createElement("div",{className:"Timer",style:{backgroundColor:this.state.timerBackgroundColor}},"Tenttiaikaa j\xe4ljell\xe4 ",s.a.createElement("strong",null,this.state.time.m," minuuttia")," ja ",s.a.createElement("strong",null,this.state.time.s," sekuntia"),t),s.a.createElement("div",{className:"Content Exam"},a," ",o))}}]),a}(s.a.Component),b=a(11),y=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(e){var i;Object(o.a)(this,a),i=t.call(this,e);var s=JSON.parse(JSON.stringify(f)),n=JSON.parse(JSON.stringify(b));return i.state={data:s,configuration:n,counter:0,category:0,order:0,examMode:!1,showExamIntro:!1,examIntro:"T\xe4m\xe4n harjoitustentin tarkoitus on simuloida selk\xe4rankaisten lajintuntemusten oikeaa tenttitilannetta. T\xe4m\xe4 on vain sinun omaksi hy\xf6dyksi ja opiksi, joten apuv\xe4lineiden k\xe4yt\xf6ss\xe4 ei ole mit\xe4\xe4n mielt\xe4. Isoilla ja pienill\xe4 kirjaimilla ei ole v\xe4li\xe4.",reset:null},i.exam=i.exam.bind(Object(p.a)(i)),i.parseSpecies=i.parseSpecies.bind(Object(p.a)(i)),i.parseCategories=i.parseCategories.bind(Object(p.a)(i)),i.parseOrders=i.parseOrders.bind(Object(p.a)(i)),i.click=i.click.bind(Object(p.a)(i)),i.startExam=i.startExam.bind(Object(p.a)(i)),i.switchCategory=i.switchCategory.bind(Object(p.a)(i)),i.switchOrder=i.switchOrder.bind(Object(p.a)(i)),i.registerReset=i.registerReset.bind(Object(p.a)(i)),i}return Object(l.a)(a,[{key:"parseSpecies",value:function(){var e,t=[],a=Object(h.a)(f);try{for(a.s();!(e=a.n()).done;){var i=e.value;t.push(JSON.parse(JSON.stringify(i)))}}catch(s){a.e(s)}finally{a.f()}return t}},{key:"parseCategories",value:function(){for(var e=this,t=[],a=function(a){a===e.state.category?t.push(s.a.createElement("div",{onClick:function(){return e.switchCategory(a)},key:a,className:"Category Active"},e.state.data.categories[a].name)):t.push(s.a.createElement("div",{onClick:function(){return e.switchCategory(a)},key:a,className:"Category"},e.state.data.categories[a].name))},i=0;i<this.state.data.categories.length;i++)a(i);return t}},{key:"parseOrders",value:function(){for(var e=this,t=[],a=function(a){a===e.state.order&&!1===e.state.examMode?t.push(s.a.createElement("div",{onClick:function(){return e.switchOrder(a)},key:a,className:"Order Active"},e.state.data.categories[e.state.category].order[a].name)):t.push(s.a.createElement("div",{onClick:function(){return e.switchOrder(a)},key:a,className:"Order"},e.state.data.categories[e.state.category].order[a].name))},i=0;i<this.state.data.categories[this.state.category].order.length;i++)a(i);return t}},{key:"click",value:function(e){this.state.data.categories[this.state.category].order[this.state.order]&&(1===e?this.state.counter<this.state.data.categories[this.state.category].order[this.state.order].species.length-1&&(this.setState({counter:this.state.counter+1}),this.state.reset()):this.state.counter>0&&(this.setState({counter:this.state.counter-1}),this.state.reset()))}},{key:"switchCategory",value:function(e){!0!==this.state.examMode&&(this.setState({category:e,order:0,counter:0}),this.state.reset())}},{key:"switchOrder",value:function(e){!0!==this.state.examMode&&(this.setState({order:e,counter:0}),this.state.reset())}},{key:"registerReset",value:function(e){this.setState({reset:e})}},{key:"exam",value:function(){this.state.reset(),this.setState({showExamIntro:!0,examMode:!1})}},{key:"startExam",value:function(){this.setState({showExamIntro:!1,examMode:!0},function(){this.updateItem(this.state)}.bind(this))}},{key:"updateItem",value:function(){this.setState(this.state)}},{key:"render",value:function(){var e=this,t=this.parseCategories(),a=this.parseOrders(),i=null,n=this.state.data.categories[this.state.category].order[this.state.order];this.state.data.categories[this.state.category].order[this.state.order]&&(i=s.a.createElement("div",null,s.a.createElement(k,{pictures:n.species[this.state.counter].pictures,thumbnails:n.species[this.state.counter].thumbnails,id:n.species[this.state.counter].id,name:n.species[this.state.counter].name,description:n.species[this.state.counter].description,skeleton:n.species[this.state.counter].pictureSkeleton,tips:n.species[this.state.counter].tips,folder:n.folder,path:this.state.configuration.path,exam:this.state.examMode,reset:this.registerReset})));var r=this.state.configuration.timePerQuestion/60,o=this.state.configuration.timePerExam/60,l=this.state.showExamIntro?s.a.createElement("div",{className:"Content"},s.a.createElement("h3",null,"Harjoitustentti - Selk\xe4rankaisten lajintuntemus"),this.state.examIntro,s.a.createElement("div",null,s.a.createElement("p",null,"Kysymyksi\xe4 yhteens\xe4: ",this.state.configuration.questionsInTrial),s.a.createElement("p",null,"Aikaa per kysymys: ",r," minuuttia"),s.a.createElement("p",null,"Aikaa per tentti: ",o," minuuttia"),s.a.createElement("div",{className:"StartButton",onClick:function(){return e.startExam()}},"Aloita tentti"))):s.a.createElement("div",null,s.a.createElement("div",{className:"Categories"},t),s.a.createElement("div",{className:"Orders"},!1===this.state.examMode?s.a.createElement("div",{onClick:function(){return e.exam()},className:"StartExam"},"Harjoituskoe"):s.a.createElement("div",{className:"StartedExam"},"Harjoituskoe"),a),!1===this.state.examMode?s.a.createElement("div",null,s.a.createElement("div",{className:"Arrows"},s.a.createElement("div",{className:"Next",onClick:function(){return e.click(1)}},s.a.createElement("p",null,"Seuraava laji")),s.a.createElement("div",{className:"Previous",onClick:function(){return e.click(-1)}},s.a.createElement("p",null,"Edellinen laji"))),s.a.createElement("div",{className:"Content"},i),s.a.createElement("div",{className:"Arrows"},s.a.createElement("div",{className:"Next",onClick:function(){return e.click(1)}},s.a.createElement("p",null,"Seuraava laji")),s.a.createElement("div",{className:"Previous",onClick:function(){return e.click(-1)}},s.a.createElement("p",null,"Edellinen laji")))):s.a.createElement(g,{questions:this.state.configuration.questionsInTrial,path:this.state.configuration.path,timePerQuestion:this.state.configuration.timePerQuestion,time:this.state.configuration.timePerExam}));return s.a.createElement("div",null,l)}}]),a}(s.a.Component),j=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(y,null))}}]),a}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[12,1,2]]]);
//# sourceMappingURL=main.832d872d.chunk.js.map