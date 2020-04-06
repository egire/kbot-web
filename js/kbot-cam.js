var mjpeg_img;
var cam_url = "http://th3ri5k.chickenkiller.com/video/"

function reload_img () {
  mjpeg_img.src = cam_url + "cam_pic.php?time=" + new Date().getTime();
}

function error_img () {
  setTimeout("mjpeg_img.src = cam_url + 'cam_pic.php?time=' + new Date().getTime();", 100);
}

function InitCam() {
  mjpeg_img = document.getElementById("kbotcam");
  mjpeg_img.onload = reload_img;
  mjpeg_img.onerror = error_img;
  reload_img();
}

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
