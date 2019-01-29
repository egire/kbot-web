$(document).ready(function(){
    $("#load").click(function(){
        query("load");
    });
    
    $("#save").click(function(){
        query("save");
    });

    $("#add").click(function(){
        var name = $("#name").val();
        var pin = $("#pin").val();
        var type = $("#type").val();
        query("add", "name="+name+"&pin="+pin);
    });
    
    $("#delete").click(function(){
        var name = $("#name").val();
        query("delete", "name="+name);
    });
    
    $("#switch").click(function(){
        var name = $("#select").val();
        query("switch", "name="+name);
    });
    
    $("#rotate").click(function(){
        var name = $("#select").val();
        var angle = $("#angle").val();
        query("rotate", "name="+name+"&angle="+angle);
    });

});

function query(type, data="") {
    var url = "http://th3ri5k.mynetgear.com:8000/";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", url+type+"?"+data, true);
    xhttp.send();
}

function log(data="") {
    var url = "http://th3ri5k.mynetgear.com:8000/";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#logs").html(this.responseText);
        }
    };
    xhttp.open("GET", url+"log?"+data, true);
    xhttp.send();
}
