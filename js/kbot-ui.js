$(document).ready(function(){
    setInterval(function(){
        if($("#updatejson").prop("checked")) {
            query("json");
            displayJSON();}
        if($("#updateswitches").prop("checked")) {
            updateswitches("switches");}
        if($("#updatelogs").prop("checked")) {
            log("tail=False&maxlines=50");}
    }, 1000); 
    
    setInterval(function(){  
        var video = "http://th3ri5k.mynetgear.com/video/cam_pic.php";
        $("#video").attr("src", video+"?time="+new Date().getTime());

    }, 1000); 
    
    $("#camera").draggable();     
    $("#maximize").click(function (){
        if ($("#camera").css("width") == "512px") {
            $("#camera").attr("style", "width: 400px; height: 225px;");
        } else {
        $("#camera").attr("style", "width: 512px; height: 288px;");}
    });
});

$(document).keyup(function(key) {
    if($("#enableWASD").prop("checked")) {
        switch(key.which) {
            case 65: // left
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                break;
            case 87: // up
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                break;
            case 68: // right
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                break;
            case 83: // down
                command("move", "leftFore="+0.0+"&leftAft="+0.0+"&rightFore="+0.0+"&rightAft="+0.0);
                break;
        }
        key.preventDefault(); // prevent default action (scroll / move caret)
    }
});
$(document).keydown(function(key) {
    if($("#enableWASD").prop("checked")) {
        switch(key.which) {
            case 65: // left
                speed = parseFloat($("#movespeed").val());
                command("move", "leftFore="+speed+"&leftAft="+(speed)+"&rightFore="+speed+"&rightAft="+speed);
                break;
            case 87: // up
                speed = parseFloat($("#movespeed").val());
                command("move", "leftFore=-"+speed+"&leftAft=-"+(speed)+"&rightFore="+speed+"&rightAft="+speed);
                break;
            case 68: // right
                speed = parseFloat($("#movespeed").val());
                command("move", "leftFore=-"+speed+"&leftAft=-"+(speed)+"&rightFore=-"+speed+"&rightAft=-"+speed);
                break;
            case 83: // down
                speed = parseFloat($("#movespeed").val());
                command("move", "leftFore="+speed+"&leftAft="+(speed)+"&rightFore=-"+speed+"&rightAft=-"+speed);
                break;
            default: return; 
        }
        key.preventDefault();
    }
});

function displayJSON() {
    $("#json").html(JSON.stringify(json));
}

function displayLog() {
    //$("#logs").html(json);
}

function updateswitches(id) {
    $("#"+id).html("");
    $.each(json, function(i, pin) {
        if(pin.type == "GPIO") {
            $("#"+id).append('<button onclick="query(\'switch\',\'name='+pin.name+'\');">'+pin.name+'</button><br>');}
        else if (pin.type == "SERVO") {
            //$("#buttons").append('<input onchage="rotate('$(this).attr('value'))" placeholder="'+pin.name+'" id="'+pin.name+'">');
            //$("#buttons").append('<button onclick="query(\'rotate\', name=\''+pin.name+'\' angle=\'$("#'+pin.name+'").val();\'>Rotate</button><br>');
        }
    });
}