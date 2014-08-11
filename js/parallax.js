function parallax (elements) {

  function isScrolledIntoView (elem) {
    
    var docViewTop = document.body.scrollTop || document.documentElement.scrollTop;
    var docViewBottom = docViewTop + window.innerHeight;
    
    var elemTop = getPosY (elem);
    var elemBottom = elemTop + elem.clientHeight;
    
    return (((elemBottom >= docViewTop) || (elemTop >= docViewTop)) && (elemTop <= docViewBottom));
  }
  
  var drama = elements[0].clientHeight / 1;
  
  for (var i = 0; i < elements.length; i++) {
    if (isScrolledIntoView (elements[i]) == true) {
      var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
      var position = /*getPosY (elements[i]) -*/ drama*scrolltop/window.innerHeight;
      var final = position;
      
      console.log (document.scrollTop);
      elements[i].style.backgroundPosition = '0px ' + final + 'px';
    }
  }
}