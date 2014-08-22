function cancelEvent (event) {
  if (event.defaultPrevented) {
    event.preventDefault ();
  }
  else if (event.preventDefault) { 
    event.preventDefault ();
  } else {
    event.returnValue = false; 
  }
}