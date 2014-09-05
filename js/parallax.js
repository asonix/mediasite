function parallax (elements, drama, zero) {

  function isScrolledIntoView (elem) {

    var docViewTop = document.body.scrollTop || document.documentElement.scrollTop;
    var docViewBottom = docViewTop + window.innerHeight;

    var elemTop = getPosY (elem);
    var elemBottom = elemTop + elem.clientHeight;

    return (((elemBottom >= docViewTop) || (elemTop >= docViewTop)) && (elemTop <= docViewBottom));
  }

  for (var i = 0; i < elements.length; i++) {
    if (isScrolledIntoView (elements[i]) == true) {
      var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
      var position = -drama * (getPosY (elements[i]) - zero - scrolltop) / window.innerHeight;

      elements[i].style.backgroundPosition = '0% ' + position + 'px';
    }
  }
}
