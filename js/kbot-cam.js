$(document).ready(function() {
  setInterval(function() {
      cam("cam");
  }, 1000);
});

$(document).ready(function(){
  $("#camerastart").click(function(){
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", cam_url + "cmd_pipe.php?cmd=ru 1", true);
      xhttp.send();
  });

  $("#camerastop").click(function(){
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", cam_url + "cmd_pipe.php?cmd=ru 0", true);
      xhttp.send();
  });
});

function cam(name="") {
    var log = new XMLHttpRequest();
    var token = getCookie("token");
    var username = getCookie("username");

    var data = "username=" + username + "&token=" + token + "&name=" + name;
    log.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var cam = document.getElementById("kbotcam");
            cam.src = this.responseText;
        }
    };

    log.open("POST", url+"cam?"+data, true);
    log.send();
}
