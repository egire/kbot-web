$(document).ready(function(){
    setInterval(function(){
        if(!$("#updatejson").prop("checked")) return;
        query("json");
        displayJSON();
        if(!$("#updateswitches").prop("checked")) return;
        updateswitches("switches");
        
        //query("log");
    }, 1000); 
    
    setInterval(function(video){  
        var video = "http://admin:158!%*@moonman1.mynetgear.com/html/cam_pic.php"    
        $("#video").attr("src", video+"?time="+new Date().getTime());
    }, 1000); 
    
    $("#camera").draggable();
    
    displayJSON();
    updateswitches("switches");
    
    $('#editor-title').click(function(){
       $('#editor').slideToggle('slow');
    });
  
    $('#config-title').click(function(){
       $('#config').slideToggle('slow');
    });
    
    $('#json-title').click(function(){
       $('#info').slideToggle('slow');
    });
    
    $('#controls-title').click(function(){
        $('#controls').slideToggle('slow');
    });
            
});

function displayJSON() {
    $("#json").html(JSON.stringify(json));
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