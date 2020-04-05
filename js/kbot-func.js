var url = "http://th3ri5k.chickenkiller.com:8080/";
var video = "http://th3ri5k.chickenkiller.com/video"

function getCookie(name) {
    var cookie = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (cookie) return cookie[2];
}

$(document).ready(function(){
    $("#load").click(function(){
        command("load");
    });

    $("#login").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        login("username="+username+"&password="+password);
    });

    $("#logout").click(function(){
        document.cookie = "username=";
        document.cookie = "token=";
        window.location = "./";
    });

    $("#register").submit(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var email = $("#email").val();
        register("username="+username+"&email="+email+"&password="+password);
        event.preventDefault();
        window.location = "./";
    });

    $("#save").click(function(){
        command("save");
    });

    $("#add").click(function(){
        var name = $("#name").val();
        var pin = $("#pin").val();
        var type = $("#type").val();
        var mode = $("#mode").val();
        var omin = $("#omin").val();
        var omax = $("#omax").val();
        var imin = $("#imin").val();
        var imax = $("#imax").val();
        command("add", "name="+name+"&pin="+pin+"&type="+type+"&mode="+mode+"&imin="+imin+"&imax="+imax+"&omin="+omin+"&omax="+omax);
    });

    $("#delete").click(function(){
        var name = $("#name").val();
        query("delete", "name="+name);
    });

    $("#camerastart").click(function(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", video + "/cmd_pipe.php?cmd=ru 1", true);
        xhttp.send();
    });

    $("#camerastop").click(function(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", video + "/cmd_pipe.php?cmd=ru 0", true);
        xhttp.send();
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
            storage = JSON.parse(this.responseText);
        } else if (this.readyState != 4 && this.status == 200) {
            xhttp = new XMLHttpRequest();
        }
    };

    xhttp.open("POST", url+type+"?"+data, true);

    xhttp.send();
}

function command(type, data="") {
    var cmd = new XMLHttpRequest();
    var token = getCookie("token");
    var username = getCookie("username");

    data = "username=" + username + "&token=" + token + "&" + data;
    cmd.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            result = this.responseText;
        }
    };

    cmd.open("POST", url+type, true); // async
    cmd.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    cmd.send(data);
}

function login(data="") {
    var login = new XMLHttpRequest();
    login.onreadystatechange = function() {
        $("#status").hide();
        if (this.status != 200) {
            $("#status").html("Server unavailable.");
            $("#status").show();
        } else if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            if(this.responseText) {
                json = JSON.parse(this.responseText);
                document.cookie = "username="+json["username"];
                document.cookie = "token="+json["token"];
                $("#status").html("Hello, "+json["username"]+"!");
                $("#status").show();

                window.location = "./controls.html";
            } else {
                $("#status").html("Authetication failed.");

                $("#status").show();
            }
        }
    };
    login.open("POST", url+"login", true);
    login.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    login.send(data);
}

function register(data="") {
    var register = new XMLHttpRequest();
    register.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            $("#status").html(this.responseText);
            $("#status").show();

            window.location = "./";
        } else {
          $("#status").html("Registration failed.");

          $("#status").show();
        }
    };
    register.open("POST", url+"register", true);
    register.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    register.send(data);
}

function log(data="") {
    var log = new XMLHttpRequest();
    var token = getCookie("token");
    var username = getCookie("username");

    data = "username=" + username + "&token=" + token + "&" + data;
    log.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#logs").html(this.responseText);
        }
    };
    log.open("POST", url+"log?"+data, true);
    log.send();
}
