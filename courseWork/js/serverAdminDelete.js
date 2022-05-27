
//DELETE

function ajaxDelete() {
    var resource = document.getElementById("resourceDel").value ;
    var routeID = document.getElementById("routeIDDel").value;

    var url = "http://localhost/courseWork/server/Controller.php/" + resource + "/" + routeID;
    request.open("Delete", url, true);

    request.onreadystatechange = displayResultDelete;
    request.send(null);
}


function displayResultDelete() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            var text = JSON.parse(request.responseText);
            if(text.error) {
			if(text['error']['code'] == '200') {
                    var errMsg = `<div class="ui negative message"><div class="header">`;
                    errMsg += text['error']['message'];
                   errMsg += `</div><p>Please enter another route ID</p></div>`;
                    document.getElementById("actionResult").innerHTML = errMsg;
                }
                if(text['error']['code'] == '201') {
                    var errMsg = `<div class="ui negative message"><div class="header">`;
                    errMsg += text['error']['message'];
                   errMsg += `</div><p>Please enter route ID</p></div>`;
                    document.getElementById("actionResult").innerHTML = errMsg;
		        }
            } else {
            var context = `<div class="ui top attached warning icon message"><i class="warning icon"></i><div class="content">`
            for (var result of text) {
                context += "Delete " + result + "";
            }
            context += "</div></div>";
            document.getElementById("actionResult").innerHTML = context;

            }
        }
    }
}