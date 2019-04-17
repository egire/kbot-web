var keyUp, keyDown, keyLeft, keyRight, keyW, keyA, keyS, keyD;
var cam_pan = 90;
var cam_tilt = 90;

$(document).ready(function(){
    setInterval(function(){
        if($("#updatejson").prop("checked")) {
            query("json");
            displayJSON();}
        if($("#updateswitches").prop("checked")) {
            updateswitches("switches");}
        if($("#updatelogs").prop("checked")) {
            log("tail=False&maxlines=50");}
        if($("#updatesensors").prop("checked")) {
            displaySensors();
        }
        
    }, 1000); 
    
    setInterval(function(){  
        var video = "http://th3ri5k.mynetgear.com/video/cam_pic.php";
        $("#video").attr("src", video+"?time="+new Date().getTime());

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
            command("rotate", "name=TILT&angle="+cam_tilt);
        }
        if(keyDown){
            cam_tilt -= parseFloat($("#tiltspeed").val());
            command("rotate", "name=TILT&angle="+cam_tilt);
        }
        if(keyLeft){
            cam_pan -= parseFloat($("#panspeed").val());
            command("rotate", "name=PAN&angle="+cam_pan);
        }
        if(keyRight){
            cam_pan += parseFloat($("#panspeed").val());
            command("rotate", "name=PAN&angle="+cam_pan);
        }
    }, 250);
    
    $("#camera").draggable(); 
    
    $("#maximize").click(function (){
        if ($("#camera").css("width") == "512px") {
            $("#camera").attr("style", "width: 400px; height: 225px;");
        } else {
        $("#camera").attr("style", "width: 512px; height: 288px;");}
    });
});

$(document).keyup(function(key) {
    if($("#enableDir").prop("checked")) {
        switch(key.which) {
            case 37: // left
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                keyLeft = false;
                break;
            case 38: // up
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                keyUp = false;
                break;
            case 39: // right
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                keyRight = false;
                break;
            case 40: // down
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
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

function displayJSON() {
    $("#json").html(JSON.stringify(json));
}

function displaySensors() {
    query("sensor", "name=PING");
    myChart.data.labels.push(json["t"]);
    myChart.data.datasets.forEach((dataset) => {
        if(!json) return;
        dataset.data.push(json);
    });
    myChart.update();
}

function displayLog() {
    //$("#logs").html(json);
}

function updateswitches(id) {
    $("#"+id).html("");
    $.each(json, function(i, pin) {
        if(pin.type == "GPIO") {
            $("#"+id).append('<button onclick="query(\'switch\',\'name='+pin.name+'\');">'+pin.name+'</button><br>');}
        else if (pin.type == "IC2") {
            //$("#buttons").append('<input onchage="rotate('$(this).attr('value'))" placeholder="'+pin.name+'" id="'+pin.name+'">');
            //$("#buttons").append('<button onclick="query(\'rotate\', name=\''+pin.name+'\' angle=\'$("#'+pin.name+'").val();\'>Rotate</button><br>');
        }
    });
}