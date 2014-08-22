
function homepage () {
  function navFix () {
    function moveElements (list, destination) {
      for (var i = 0; i < list.length; i++) {
        destination.appendChild (list[i]);
      }
    }
    
    if (window.innerWidth <= 1200) {
      moveElements ([document.getElementsByTagName ("header")[0].getElementsByTagName ("ul")[0]], document.getElementsByClassName ("overflow")[0]);
    }
    else {
      moveElements (document.getElementsByClassName ("overflow")[0].childNodes, document.getElementsByTagName ("header")[0].getElementsByTagName ("nav")[0]);
    }
  
    document.getElementsByClassName ("extend")[0].onclick = function () {
      var target = document.getElementsByClassName ("overflow")[0];
      if (target.className == "overflow") {
        target.className = "overflow overflowing";
        this.parentNode.className = "controls moved";
        this.innerHTML = "&#62;&#62;";
      }
      else {
        target.className = "overflow";
        this.parentNode.className = "controls";
        this.innerHTML = "&#60;&#60;";
      }
    }
  }
  slider == null ? slider = new Slider () : slider.start ();
  var inslide = document.getElementsByClassName ("inslide");
  var city = document.getElementsByClassName ("layer");
  slider.custom = function () {
    //execute custom function on slide change
    sectionResize ();
  }
  
  function resizeCity () {
      document.getElementsByClassName ("cityscape")[0].style.height = document.body.clientWidth / 501 * 441 + "px";
  }
  
  setInterval (function () {
    for (var i = 0; i < document.getElementsByClassName ("left").length; i++) {
      document.getElementsByClassName ("left")[i].onclick = function () {
        slider.left ();
      }
      document.getElementsByClassName ("left")[i].onmouseover = function () {};
    }
    for (var i = 0; i < document.getElementsByClassName ("right").length; i++) {
      document.getElementsByClassName ("right")[i].onclick = function () {
        slider.right ();
      }
      document.getElementsByClassName ("right")[i].onmouseover = function () {};
    }
    for (var i = 0; i < document.getElementsByClassName ("center").length; i++) {
      document.getElementsByClassName ("center")[i].onclick = function () {
        slider.right ();
      }
      document.getElementsByClassName ("center")[i].onmouseover = function () {
        document.getElementsByClassName ("pauseicon")[0].style.display = "block";
        slider.stop();
      };
      document.getElementsByClassName ("center")[i].onmouseout = function () {
        document.getElementsByClassName ("pauseicon")[0].style.display = "none";
        slider.start();
      };
    }
  }, 100);
  
  var slidez = document.getElementsByTagName ("header")[0].clientHeight;
  var slided = 550;
  var cityz = 0;
  parallax (inslide, 50, slidez);
  parallax (city, 50, cityz);
  sectionResize ();
  navFix ();
  
  window.onscroll = function () {
    cityz = window.innerHeight - city[0].clientHeight - document.getElementsByTagName ("footer")[0].clientHeight;
    parallax (inslide, slided, slidez);
    parallax ([city[0]], -10 * window.innerHeight/700, cityz);
    parallax ([city[1]], -800 * window.innerHeight/700, cityz);
    parallax ([city[2]], -400 * window.innerHeight/700, cityz);
    parallax ([city[3]], -200 * window.innerHeight/700, cityz);
  };
  window.onresize = function () {
    cityz = window.innerHeight - 441 - 34
    parallax (inslide, slided, slidez);
    parallax ([city[0]], -10, cityz);
    parallax ([city[1]], -800, cityz);
    parallax ([city[2]], -400, cityz);
    parallax ([city[3]], -200, cityz);
    sectionResize ();
    navFix ();
  };
  slider.run();
}