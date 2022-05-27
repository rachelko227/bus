//GET
function ajaxSearch() {
	var resource = document.getElementById("resource").value;
	var keyword = document.getElementById("keyword").value;
	var url =
		"http://localhost/courseWork/server/Controller.php/" +
		resource +
		"/" +
		keyword;
	request.open("GET", url, true);
	request.onreadystatechange = displayResultRouteName;
	request.send(null);
}

function displayResultRouteName() {
	if (request.readyState == 4) {
		if (request.status == 200) {
			var text = JSON.parse(request.responseText);
			//text['error']['code'] == '100'
			if(text.error) {
				if(text['error']['code'] == '100') {
					var errMsg = `<div class="ui negative message"><div class="header">`;
					errMsg += text['error']['message'];
					errMsg += `</div><p>Please enter route name</p></div>`;
					document.getElementById("result").innerHTML = errMsg;
				}
				if(text['error']['code'] == '101') {
					var errMsg = `<div class="ui negative message"><div class="header">`;
					errMsg += text['error']['message'];
					errMsg += `</div><p>Please enter another route name</p></div>`;
					document.getElementById("result").innerHTML = errMsg;
				} 
			} else {
			var table = `<div class="ui top attached warning icon message"><div class="content">
                    <i class="bus large icon"></i>
                     TO <i class="share large icon"></i> FROM <i class="sync large icon"></i>
                </div>
            </div>`;
			var table = `<table class="ui attached table"><thead><th>Company code</th><th>Service mode</th><th>Special type</th><th>Journey time</th><th>Location start name</th><th>Location end name</th><th>Fare</th></thead><tbody><tr>`;
			for (var route of text) {
			var comCode;
			var serMode;
			var specType;
			if (route.companyCode == 'NWFB'){
				comCode = 'New World First Bus';
			} else if(route.companyCode == 'KMB') {
				comCode = 'Kowloon Motor Bus';
			} else if(route.companyCode == 'CTB') {
				comCode = 'City Bus';
			} else if(route.companyCode == 'KMB+CTB') {
				comCode = 'Kowloon Motor Bus/City Bus';
			} else if(route.companyCode == 'LWB') {
				comCode = 'Long Win Bus';
			} else if(route.companyCode == 'NLB') {
				comCode = 'New Lantao Bus';
			} else if(route.companyCode == 'KMB+NWFB') {
				comCode = 'Kowloon Motor Bus/New World First Bus';
			} else if(route.companyCode == 'LWB+CTB') {
				comCode = 'Long Win Bus/City Bus';
			} else if(route.companyCode == 'PI') {
				comCode = 'Ma Wan Bus';
			} else if(route.companyCode == 'DB') {
				comCode = 'Discovery Bay Bus';
			} else if(route.companyCode == 'XB') {
				comCode = 'LMC Cross Boundary Coach';
			} else if(route.companyCode == 'LRTFeeder') {
				comCode = 'Mass Transit Railway Feeder Bus';
			} else {
				comCode = route.companyCode;
			}
			
			if(route.serviceMode == 'A') {
				serMode = 'whole';
			} else if(route.serviceMode == 'N') {
				serMode = 'night';
			} else if(route.serviceMode == 'NT') {
				serMode = 'night & specific time';
			} else if(route.serviceMode == 'R') {
				serMode = 'regular/day';
			} else if(route.serviceMode == 'T') {
				serMode = 'regular & specific time';
			} else {
				serMode = route.serviceMode;
			}

			if(route.specialType == '0') {
				specType = 'Not applicable';
			} else if(route.specialType == '1') {
				specType = 'Time or day specific services';
			} else if(route.specialType == '2') {
				specType = 'Separate fare for weekend and Public Holidays';
			} else if(route.specialType == '3') {
				specType = 'Time or day specific and separate fare for weekend and PHs';
			} else {
				specType = route.specialType;
			}

					table += "<td style='display:none'>" + route.routeID + "</td>";
					table += "<td>" + comCode + "</td>";
					table += "<td>" + serMode + "</td>";
					table += "<td>" + specType + "</td>";
					table += "<td>" + route.journeyTime + " mins</td>";
					table += "<td>" + route.locStartNamee + "</td>";
					table += "<td>" + route.locEndNamee + "</td>";
					table += "<td>$" + route.fullFare + "</td>";
					
					table += "</tr>";
				}
			
			table += "</tbody></table>";
			document.getElementById("result").innerHTML = table;
		
	}
	}
}
}
// Aberdeen Mong Kok
