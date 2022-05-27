
// SEARCH - STOP 途經此站的巴士路線
function ajaxSearchStop() {
    var resource = document.getElementById("resourceStop").value;
    var keyword = document.getElementById("stopNameeStop").value;
    var url = "http://localhost/courseWork/server/Controller.php/" + resource + "/" + keyword;
    request.open("GET", url, true);
    request.onreadystatechange = displayResultStop;
    request.send(null);
}


function displayResultStop() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            // var element = document.getElementById("resultStop");
            // element.innerHTML = request.responseText;
            var text = JSON.parse(request.responseText);
            if(text.error) {
				if(text['error']['code'] == '130') {
				var errMsg = `<div class="ui negative message"><div class="header">`;
				errMsg += text['error']['message'];
				errMsg += `</div><p>Please enter route ID</p></div>`;
                document.getElementById("resultStop").innerHTML = errMsg;
            } 
            if(text['error']['code'] == '121') {
				var errMsg = `<div class="ui negative message"><div class="header">`;
				errMsg += text['error']['message'];
				errMsg += `</div><p>Please enter another current location</p></div>`;
                document.getElementById("resultStop").innerHTML = errMsg;
            } 
        } else {
            
            var table = `<div class="ui top attached warning icon message"><div class="content">`;
            table += `${text.length}`;
            table += ` record(s) found</div></div><table class="ui attached table"><thead><th>Route name</th><th>Loccation start name</th><th>Loccation end name</th></thead><tbody><tr>`;
            for (var route of text) {

                table += "<td>" + route.routeNamee + "</td>";
                table += "<td>" + route.locStartNamee + "</td>";
                table += "<td>" + route.locEndNamee + "</td>";
                table += "</tr>";

            }
            table += "</tbody></table>";
            document.getElementById("resultStop").innerHTML = table;
        }
    }
}
}
