// var request = new XMLHttpRequest();
function ajaxSearchStartEnd() {
    var resource = "Start";
    var locStartName = document.getElementById("locStartNameeStartEnd").value;
    var locEndName = document.getElementById("locEndNameeStartEnd").value;
    var url =
        "http://localhost/courseWork/server/Controller.php/" + resource + "/" + locStartName;
    request.open("GET", url, true);
    request.onreadystatechange = displayResultStartEnd;
    request.send(null);
}
function displayResultStartEnd() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            // var element = document.getElementById("resultStartEnd");
            // element.innerHTML = request.responseText;
            var text = JSON.parse(request.responseText);
            if(text.error) {
				if(text['error']['code'] == '120') {
				var errMsg = `<div class="ui negative message"><div class="header">`;
				errMsg += text['error']['message'];
				errMsg += `</div><p>Please enter start location or end location</p></div>`;
				document.getElementById("resultStartEnd").innerHTML = errMsg;
            } 
            if(text['error']['code'] == '121') {
				var errMsg = `<div class="ui negative message"><div class="header">`;
				errMsg += text['error']['message'];
				errMsg += `</div><p>Please enter another start location or end location</p></div>`;
				document.getElementById("resultStartEnd").innerHTML = errMsg;
			} 
		} else {
            var table = `<div class="ui top attached warning icon message"><div class="content">`;
            table += `${text.length}`;
            table += ` record(s) found</div></div><table class="ui attached table"><thead><th>Route name</th><th>Start Location</th><th>End location</th></thead><tbody><tr>`;
            for (var route of text) {
                table += "<td>" + route.routeNamee + "</td>";
                table += "<td>" + route.locStartNamee + "</td>";
                table += "<td>" + route.locEndNamee + "</td>";
                table += "</tr>";
            }
            table += "</tbody></table>";
            document.getElementById("resultStartEnd").innerHTML = table;
        }
    }
}
}