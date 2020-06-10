/*
* This script searches for every img-element of gallery02 div,
* and appends a new section on the mother container (parentNode) of img. Furthermore, altText of the image
* will be stored into the new section.
*/

window.onload = function() {

  let gallery = document.getElementById('galleria'),
      pictures = [];

  //Just to make sure an element with id 'gallery02' exists...
  if (gallery) {
    pictures = gallery.getElementsByTagName('img');
  }

  for (let picture of pictures) {

    let altText = picture.getAttribute('alt'),
        section = document.createElement('section'),
        paragraph = document.createElement('p'),
        textNode = document.createTextNode(altText);

    section.setAttribute('class', 'overlay');
    section.appendChild(paragraph);
    paragraph.appendChild(textNode);
    picture.parentNode.appendChild(section);
  }

}
