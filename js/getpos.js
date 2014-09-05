function getPosY (element) {
  var pos = 0;

  while (element != null) {
    pos += element.offsetTop;
    element = element.offsetParent;
  }

  return pos;
}

function getPosX (element) {
  var pos = 0

  while (element != null) {
    pos += element.offsetLeft;
    element = element.offsetParent;
  }

  return pos;
}
