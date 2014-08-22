function changePage (page) {
  var jsonObj;
  
  var customcommands = {
    home: function () {
      var imgurl = document.getElementsByClassName ('inslide')[0].style.backgroundImage.substring (4,document.getElementsByClassName ('inslide')[0].style.backgroundImage.length-1);
      while (imgurl.indexOf ("\"") != -1) {
        imgurl = imgurl.replace ("\"", "");
      }
      
      var img = new Image();
      img.src = imgurl;
      img.onload = function () {
        var t = setInterval (function () {
          if (document.getElementById ('doneloading') != null) {
            clearInterval (t);
            console.log ('loaded');
            homepage ();
            img.parentNode.removeChild(img);
          }
        }, 25);
      }
      img.style.position = "fixed";
      img.style.left = "-99999%";
      document.body.appendChild (img);
    },
    skills: function () {
      //pass
    }
  }

  // Code from http://www.tutorialspoint.com/json/json_ajax_example.htm
  function loadJSON (callbackfunction) {
    var data_file = "json/" + page + ".json";
    console.log (data_file);
    var http_request = new XMLHttpRequest ();
    try {
      // Opera 8.0+, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest ();
    } catch (e) {
      // Internet Explorer Browsers
      try {
        http_request = new ActiveXObject ("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          http_request = new ActiveXObject ("Microsoft.XMLHTTP");
        } catch (e) {
          // Something went wrong
          alert ("Your browser broke!");
          return false;
        }
      }
    }
    http_request.onreadystatechange = function () {
      if (http_request.readyState == 4) {
        // Javascript function JSON.parse to parse JSON data
        jsonObj = JSON.parse (http_request.responseText);
        // jsObjByPerson variable now contains the data structure
        callbackfunction(jsonObj);
      }
    }
    http_request.open ("GET", data_file, true);
    http_request.send ();
    return true;
  }
  
  //custom code
  loadJSON (function (jsonObj) {
    document.title = jsonObj.page.title;
    while (document.getElementsByTagName ('link').length > 0) {
      document.getElementsByTagName ('link')[0].remove ();
    }
    for (var i = 0; i < jsonObj.page.css.length; i++) {
      var link = document.createElement ('link');
      link.href = "css/" + jsonObj.page.css[i];
      link.type = "text/css";
      link.rel = "stylesheet";
      document.getElementsByTagName ('head')[0].appendChild (link);
    }
    document.body.className = jsonObj.page.classes.join (' ');
    document.getElementsByClassName ('changing')[0].innerHTML = jsonObj.page.content[0];
    document.getElementsByClassName ('changing')[1].innerHTML = jsonObj.page.content[1];
    
    
    //var t = setInterval (function () {
    //  console.log (document.getElementById ('doneloading'));
    //  if (document.getElementById ('doneloading') != null) {
    //    clearInterval (t);
        customcommands[page] ();
    //  }
    //}, 25);
  });
}