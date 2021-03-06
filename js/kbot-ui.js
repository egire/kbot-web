var keyUp, keyDown, keyLeft, keyRight, keyW, keyA, keyS, keyD;
var cam_pan = 98;
var cam_tilt = 110;

$(document).ready(function(){
    setInterval(function(){
        if($("#updatestorage").prop("checked")) {
            query("storage");
            displayStorage();}
        if($("#updateswitches").prop("checked")) {
            updateSwitches("switches");}
        if($("#updatelogs").prop("checked")) {
            log("tail=False&maxlines=50");}

        //$("#video").attr("src", video+"/cam_pic.php?time="+new Date().getTime());
    }, 1000);

    setInterval(function(){
        if($("#updatesensors").prop("checked")) {
            updateSensors();
        }
    }, 250);

    setInterval(function(){
        var movementSpeed = parseFloat($("#movespeed").val());
        if(keyW){
            command("move", "leftFore=-"+movementSpeed+"&leftAft=-"+movementSpeed+"&rightFore="+movementSpeed+"&rightAft="+movementSpeed);
        }
        if(keyS){
            command("move", "leftFore="+movementSpeed+"&leftAft="+movementSpeed+"&rightFore=-"+movementSpeed+"&rightAft=-"+movementSpeed);
        }
        if(keyA){
            command("move", "leftFore="+movementSpeed+"&leftAft="+movementSpeed+"&rightFore="+movementSpeed+"&rightAft="+movementSpeed);
        }
        if(keyD){
            command("move", "leftFore=-"+movementSpeed+"&leftAft=-"+movementSpeed+"&rightFore=-"+movementSpeed+"&rightAft=-"+movementSpeed);
        }
    }, 250);

    setInterval(function(){
        if(keyUp){
            cam_tilt += parseFloat($("#tiltspeed").val());
            cam_tilt = clamp(cam_tilt, 50.0, 180.0);
            command("rotate", "name=TILT&angle="+cam_tilt);
        }
        if(keyDown){
            cam_tilt -= parseFloat($("#tiltspeed").val());
            cam_tilt = clamp(cam_tilt, 50.0, 180.0);
            command("rotate", "name=TILT&angle="+cam_tilt);
        }
        if(keyLeft){
            cam_pan -= parseFloat($("#panspeed").val());
            cam_pan = clamp(cam_pan, 10.0, 180.0);
            command("rotate", "name=PAN&angle="+cam_pan);
        }
        if(keyRight){
            cam_pan += parseFloat($("#panspeed").val());
            cam_pan = clamp(cam_pan, 10.0, 180.0);
            command("rotate", "name=PAN&angle="+cam_pan);
        }
    }, 33);

    $("#camera").draggable();

    $("#maximize").click(function (){
        if ($("#camera").css("width") == "512px") {
            $("#camera").attr("style", "width: 400px; height: 225px;");
        } else {
        $("#camera").attr("style", "width: 512px; height: 288px;");}
    });

    $("#sweep").click(function (){
        query("sweep");
    });
});

$(document).keyup(function(key) {
    if($("#enableDir").prop("checked")) {
        switch(key.which) {
            case 37: // left
                keyLeft = false;
                break;
            case 38: // up
                keyUp = false;
                break;
            case 39: // right
                keyRight = false;
                break;
            case 40: // down
                keyDown = false;
                break;
        }
        key.preventDefault();
    }
});

$(document).keydown(function(key) {
    if($("#enableDir").prop("checked")) {
        switch(key.which) {
            case 37: // left
                keyLeft = true;
                break;
            case 38: // up
                keyUp = true;
                break;
            case 39: // right
                keyRight = true;
                break;
            case 40: // down
                keyDown = true;
                break;
            case 69: //
                centerCamera();
                break;
            default: return;
        }
        key.preventDefault();
    }
});

$(document).keyup(function(key) {
    if($("#enableWASD").prop("checked")) {
        switch(key.which) {
            case 65: // left
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                keyA = false;
                break;
            case 87: // up
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                keyW = false;
                break;
            case 68: // right
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                keyD = false;
                break;
            case 83: // down
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                keyS = false;
                break;
        }
        key.preventDefault(); // prevent default action (scroll / move caret)
    }
});

$(document).keydown(function(key) {
    if($("#enableWASD").prop("checked")) {
        switch(key.which) {
            case 65: // left
                keyA = true;
                break;
            case 87: // up
                keyW = true;
                break;
            case 68: // right
                keyD = true;
                break;
            case 83: // down
                keyS = true;
                break;
            default: return;
        }
        key.preventDefault();
    }
});

function getCamImage(element) {
    $.ajax({
      type: "GET",
      url: video+"/cam_pic.php?time="+new Date().getTime(),
      dataType: "image/jpg",
      success: function(img) {
        i = new Image();
        i.src = img;
        $(element).text(i);
      },
      error: function(error, txtStatus) {
        return false;
      }
    });
}

function clamp(value=0, min=-1.0, max=1.0) {
    if (value > max) {return max;}
    if (value < min) {return min;}
    return value;
}

function centerCamera() {
    cam_pan = 98;
    cam_tilt = 110;
    command("rotate", "name=TILT&angle="+cam_tilt);
    command("rotate", "name=PAN&angle="+cam_pan);
}

function displayStorage() {
    display = "<table class='table table-sm'>\n<thead><tr>\
                <th scope=\"col\">Pin Name</th>\n\
                <th scope=\"col\">Type</th>\n\
                <th scope=\"col\">Mode</th>\n\
                <th scope=\"col\">ID</th>\n\
                <th scope=\"col\">State</th>\n\
              </tr>\n</thead>";

    $.each(storage, function(key, val) {
      display += "<tr>";
      $.each(val, function(key, val)
      {
        display += "<td>"+val+"</td>\n";
      });
      display += "</tr>";
    });

    display += "</table>";

    $("#storage").html(display);
}

function updateSensors() {
    query("sensor", "name=PING");
    if (!storage) { return; }
    /*scatterChart.data.datasets.forEach((dataset) => {
       dataset.data.push(storage);
    });
    scatterChart.update();
    */

    //query("sensor", "name=LENCODER");
    myChart.data.labels.push(storage["x"]);
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(storage);
    });
    myChart.update();
    storage = false;
}

function displayLog() {
    $("#logs").html(storage);
}

function updateSwitches(id) {
    $("#"+id).html("");
    $.each(storage, function(i, pin) {
        if(pin.type == "GPIO" && pin.mode == "OUT") {
            $("#"+id).append('<button onclick="query(\'switch\',\'name='+pin.name+'\');">'+pin.name+'</button><br>');}
        else if (pin.type == "IC2") {
            //$("#buttons").append('<input onchage="rotate('$(this).attr('value'))" placeholder="'+pin.name+'" id="'+pin.name+'">');
            //$("#buttons").append('<button onclick="query(\'rotate\', name=\''+pin.name+'\' angle=\'$("#'+pin.name+'").val();\'>Rotate</button><br>');
        }
    });
}
