"use strict";

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("courses");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
  // Start by saying: no switching is done:
  switching = false;
  rows = table.rows;
  /* Loop through all table rows (except the
  first, which contains table headers): */
  for (i = 1; i < (rows.length - 1); i++) {
    // Start by saying there should be no switching:
    shouldSwitch = false;
    /* Get the two elements you want to compare,
    one from current row and one from the next: */
    x = rows[i].getElementsByTagName("TD")[n];
    y = rows[i + 1].getElementsByTagName("TD")[n];
    /* Check if the two rows should switch place,
    based on the direction, asc or desc: */
    if (dir == "asc") {
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    } else if (dir == "desc") {
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
      }
  }
  if (shouldSwitch) {
    /* If a switch has been marked, make the switch
    and mark that a switch has been done: */
    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    switching = true;
    // Each time a switch is done, increase this count by 1:
    switchcount ++;
  } else {
    /* If no switching has been done AND the direction is "asc",
    set the direction to "desc" and run the while loop again. */
    if (switchcount == 0 && dir == "asc") {
      dir = "desc";
      switching = true;
    }
   }
  }
}

/*
* Function searches for the courses from the data structure and appends them one by one on the table of CV page.
* Also calculates the weighed average of grades.
*/
function searchCourses() {
  let table = document.getElementById('courses');
  let tbody = table.getElementsByTagName('tbody')[0];
  let points = 0,
      credits = 0,
      creditsTotal = 0;
      
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].finished === true) {
      let tr1 = document.createElement('tr'),
          td1 = document.createElement('td'),
          td2 = document.createElement('td'),
          td3 = document.createElement('td'),
          td4 = document.createElement('td'),
          txt1 = document.createTextNode(courses[i].name),
          txt2 = document.createTextNode(courses[i].credits),
          txt3 = document.createTextNode(courses[i].grade),
          txt4 = document.createTextNode(courses[i].note);
      tr1.appendChild(td1);
      tr1.appendChild(td2);
      tr1.appendChild(td3);
      tr1.appendChild(td4);
      td1.appendChild(txt1);
      td2.appendChild(txt2);
      td3.appendChild(txt3);
      td4.appendChild(txt4);
      tbody.appendChild(tr1);

      if (parseInt(courses[i].grade)) {
        credits += parseInt(courses[i].credits);
        points += parseInt(courses[i].credits) * parseInt(courses[i].grade);
      }
      creditsTotal += parseInt(courses[i].credits);
    }

  }
  let ka = (points/credits).toFixed(2);
  let div = document.getElementById('average');
  let teksti = document.createTextNode("Painotettu keskiarvo: " + ka + " | Opintopisteet: " + creditsTotal);
  div.appendChild(teksti);
}

$(document).ready(function(){
  searchCourses();
})
