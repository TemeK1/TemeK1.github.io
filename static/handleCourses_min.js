"use strict";function sortTable(n){var table,rows,switching,i,x,y,shouldSwitch,dir,switchcount=0;table=document.getElementById("courses");switching=true;dir="asc";while(switching){switching=false;rows=table.rows;for(i=1;i<(rows.length-1);i++){shouldSwitch=false;x=rows[i].getElementsByTagName("TD")[n];y=rows[i+1].getElementsByTagName("TD")[n];if(dir=="asc"){if(x.innerHTML.toLowerCase()>y.innerHTML.toLowerCase()){shouldSwitch=true;break;}}else if(dir=="desc"){if(x.innerHTML.toLowerCase()<y.innerHTML.toLowerCase()){shouldSwitch=true;break;}}}
if(shouldSwitch){rows[i].parentNode.insertBefore(rows[i+1],rows[i]);switching=true;switchcount++;}else{if(switchcount==0&&dir=="asc"){dir="desc";switching=true;}}}}
function searchCourses(){let table=document.getElementById('courses');let tbody=table.getElementsByTagName('tbody')[0];let points=0,credits=0,creditsTotal=0;for(let i=0;i<courses.length;i++){if(courses[i].finished===true){let tr1=document.createElement('tr'),td1=document.createElement('td'),td2=document.createElement('td'),td3=document.createElement('td'),td4=document.createElement('td'),txt1=document.createTextNode(courses[i].name),txt2=document.createTextNode(courses[i].credits),txt3=document.createTextNode(courses[i].grade),txt4=document.createTextNode(courses[i].note);tr1.appendChild(td1);tr1.appendChild(td2);tr1.appendChild(td3);tr1.appendChild(td4);td1.appendChild(txt1);td2.appendChild(txt2);td3.appendChild(txt3);td4.appendChild(txt4);tbody.appendChild(tr1);if(parseInt(courses[i].grade)){credits+=parseInt(courses[i].credits);points+=parseInt(courses[i].credits)*parseInt(courses[i].grade);}
creditsTotal+=parseInt(courses[i].credits);}}
let ka=(points/credits).toFixed(2);let div=document.getElementById('average');let teksti=document.createTextNode("Painotettu keskiarvo: "+ka+" | Opintopisteet: "+creditsTotal);div.appendChild(teksti);}
$(document).ready(function(){searchCourses();})