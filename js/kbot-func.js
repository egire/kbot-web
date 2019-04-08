var url = "http://localhost:8000/";

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
    var xhttp = new XMLHttpRequest();
    var token = getCookie("token");
    var username = getCookie("username");
    data = "username=" + username + "&token=" + token + "&" + data;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", url+type+"?"+data, true);
    xhttp.send();
}

function getCookie(name) {
    var cookie = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (cookie) return cookie[2];
}

function command(type, data="") {
    var xhttp = new XMLHttpRequest();
    var token = getCookie("token");
    var username = getCookie("username");
    data = "username=" + username + "&token=" + token + "&" + data;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            result = this.responseText;
        }
    };
    xhttp.open("POST", url+type, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
}

function login(data="") {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if(this.responseText) {
                json = JSON.parse(this.responseText);
                document.cookie = "username="+json[0]["username"];
                document.cookie = "token="+json[0]["token"];
                $("#status").html("Hello, "+json[0]["username"]+"!");
                window.location = "./controls.html";
            } else {$("#status").html("Authetication failed.");}
        }
    };
    xhttp.open("POST", url+"login", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
}

function log(data="") {
    var xhttp = new XMLHttpRequest();
    var token = getCookie("token");
    console.log(token);
    var username = getCookie("username");
    data = "username=" + username + "&token=" + token + "&" + data;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#logs").html(this.responseText);
        }
    };
    xhttp.open("GET", url+"log?"+data, true);    
    console.log(url+"log?"+data)
    xhttp.send();
}
