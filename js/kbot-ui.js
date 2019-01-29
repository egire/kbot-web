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
            $("#camera").attr("style", "width: 400px; height: 300px;");
        } else {
        $("#camera").attr("style", "width: 512px; height: 384px;");}
    });
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