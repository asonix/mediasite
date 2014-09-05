function skills () {

  var jsObjByPerson;

  // Code from http://www.tutorialspoint.com/json/json_ajax_example.htm
  function loadJSON (callbackfunction) {
    var data_file = "/json/skills_list.json";
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
        jsObjByPerson = JSON.parse (http_request.responseText);
        // jsObjByPerson variable now contains the data structure
        callbackfunction(jsObjByPerson);
      }
    }
    http_request.open ("GET", data_file, true);
    http_request.send ();
    return true;
  }

  // Custom code
  /* OBJECT IN STRUCTURE
   * 
   * obj.person[x].bio
   * obj.person[x].name
   * obj.person[x].skills[y].whatever
   * obj.person[x].username
   *
   * OBJECT OUT STRUCTURE
   * jsObjBySkill[key1][key2][i] == person object; where key1 is general and key2 is specific
   * jsObjBySkill[key1] == { key2 : [person1, person2], key3 : [person2, person3] };
   * 
   */

  var jsObjBySkill = {};

  loadJSON (function (jsObjByPerson) {
    for (var i in jsObjByPerson.person) {
      for (var j in jsObjByPerson.person[i].skills) {
        for (var key in jsObjByPerson.person[i].skills[j]) {
          if (jsObjByPerson.person[i].skills[j].hasOwnProperty (key)) {

            // creates new specific key, ex. Digital
            var newkey = jsObjByPerson.person[i].skills[j][key];
            var specific = {};
            specific[newkey] = [jsObjByPerson.person[i]];

            if (jsObjBySkill.hasOwnProperty (key)) {
              if (jsObjBySkill[key].hasOwnProperty (newkey)) {
                jsObjBySkill[key][newkey].push (jsObjByPerson.person[i]);
              }
              else {
                // reuses general key, adds new specific key
                jsObjBySkill[key][newkey] = [jsObjByPerson.person[i]];
              }
            }
            else {
              // creates new general key, creates new specific key
              jsObjBySkill[key] = {};
              jsObjBySkill[key][newkey] = [jsObjByPerson.person[i]];
            }
          }
        }
      }
    }

    for (var i in jsObjBySkill) {
      if (jsObjBySkill.hasOwnProperty (i)) {
        for (var j in jsObjBySkill[i]) {
          if (jsObjBySkill[i].hasOwnProperty (j)) {
            jsObjBySkill[i][j].sort (function (a, b) {
              return (a.username > b.username) ? 1 : -1;
            });
          }
        }
      }
    }

    var columns = document.getElementsByClassName ('list');
    var left    = columns[0];
    var center  = columns[1];
    var right   = columns[2];

    function loadMiddle (key) {
      for (var i in jsObjBySkill[key]) {
        if (jsObjBySkill[key].hasOwnProperty (i)) {
          var div = document.createElement ('div');
          div.className = "item";
          div.innerHTML = i;
          center.appendChild (div);
          div.onclick = (function (x) {
            return function () {
              while (right.getElementsByClassName ('item').length > 0) {
                right.removeChild(right.getElementsByClassName ('item')[0]);
              }
              for (var i in center.getElementsByClassName ('item')) {
                center.getElementsByClassName ('item')[i].className = "item";
              }
              x.className = "item selected";
              loadRight (key, x.innerHTML);
            }
          })(div);
        }
      }
      center.getElementsByClassName ('item')[0].className = 'item selected';
      while (right.getElementsByClassName ('item').length > 0) {
        right.removeChild(right.getElementsByClassName ('item')[0]);
      }
      loadRight (key, center.getElementsByClassName ('item')[0].innerHTML);
    }

    function loadRight (key1, key2) {
      for (var i in jsObjBySkill[key1][key2]) {
        var div = document.createElement ('div');
        div.className = "item";
        div.innerHTML = "<div class=\"name\">" + jsObjBySkill[key1][key2][i].username +
          "</div>" + jsObjBySkill[key1][key2][i].name +
          "<div class=\"bio\">" + jsObjBySkill[key1][key2][i].bio + "</div>";
        right.appendChild (div);
        div.onclick = (function (x) {
          return function () {
            window.open(jsObjBySkill[key1][key2][x].url + "/index.html", "_self");
          }
        })(i);
      }
    }

    for (var i in jsObjBySkill) {
      if (jsObjBySkill.hasOwnProperty (i)) {
        var div = document.createElement ('div');
        div.className = "item";
        div.innerHTML = i;
        left.appendChild (div);
        div.onclick = (function (x) {
          return function () {
            while (center.getElementsByClassName ('item').length > 0) {
              center.removeChild(center.getElementsByClassName ('item')[0]);
            }
            for (var i in left.getElementsByClassName ('item')) {
              left.getElementsByClassName ('item')[i].className = "item";
            }
            x.className = "item selected";
            loadMiddle (x.innerHTML);
          }
        })(div);
      }
    }

    left.getElementsByClassName ('item')[0].className = 'item selected';
    loadMiddle (left.getElementsByClassName ('item')[0].innerHTML);

  });
}
