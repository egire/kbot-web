var cam_state = true;

$(document).ready(function() {
  setInterval(function() {
      if($("#updatecam").prop("checked")){
        cam("cam");}
  }, 1000);
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