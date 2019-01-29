$(document).ready(function(){
    $("#load").click(function(){
        command("load");
    });
    
    $("#save").click(function(){
        command("save");
    });

    $("#add").click(function(){
        var name = $("#name").val();
        var pin = $("#pin").val();
        var type = $("#type").val();
        var min = $("#min").val();
        var max = $("#max").val();
        command("add", "name="+name+"&pin="+pin+"&type="+type+"&min="+min+"&max="+max);
    });
    
    $("#delete").click(function(){
        var name = $("#name").val();
        query("delete", "name="+name);
    });
    
    $("#switch").click(function(){
        var name = $("#select").val();
        command("switch", "name="+name);
    });
    
    $("#rotate").click(function(){
        var name = $("#select").val();
        var angle = $("#angle").val();
        command("rotate", "name="+name+"&angle="+angle);
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

function command(type, data="") {
    var url = "http://th3ri5k.mynetgear.com:8000/";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            result = this.responseText;
        }
    };
    
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhttp.open("POST", url+type, true);
    xhttp.send(data);
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
