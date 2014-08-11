function parallax (elements) {

  function isScrolledIntoView (elem) {
    
    var docViewTop = document.body.scrollTop;
    var docViewBottom = docViewTop + window.innerHeight;
    
    var elemTop = getPosY (elem);
    var elemBottom = elemTop + elem.clientHeight;
    
    return (((elemBottom >= docViewTop) || (elemTop >= docViewTop)) && (elemTop <= docViewBottom));
  }
  
  var drama = elements[0].clientHeight / 5;
  
  for (var i = 0; i < elements.length; i++) {
    if (isScrolledIntoView (elements[i]) == true) {
      var position = /*getPosY (elements[i]) -*/ drama*document.body.scrollTop/window.innerHeight;
      var final = position;
      
      elements[i].style.backgroundPosition = /*getPosX (elements[i]) +*/ '0px ' + final + 'px';
    }
  }
}