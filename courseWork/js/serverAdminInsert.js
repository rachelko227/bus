//POST
function ajaxInsert() {
    var resource = document.getElementById("resourceIns").value;
    var companyCode = document.getElementById("companyCodeIns").value;
    var routeName = document.getElementById("routeNameIns").value;
    var routeType = document.getElementById("routeTypeIns").value;
    var serviceMode = document.getElementById("serviceModeIns").value;
    var specialType = document.getElementById("specialTypeIns").value;
    var journeyTime = document.getElementById("journeyTimeIns").value;
    var locStartName = document.getElementById("locStartNameIns").value;
    var locEndName = document.getElementById("locEndNameIns").value;
    var hyperlink = document.getElementById("hyperlinkIns").value;
    var fullFare = document.getElementById("fullFareIns").value;

    var url = "http://localhost/courseWork/server/Controller.php/" + resource + "/" + companyCode + "/" + routeName + "/" + routeType +
    "/" +    serviceMode + "/" + specialType + "/" + journeyTime + "/" + locStartName + "/" + locEndName + "/" + hyperlink + "/" + fullFare;
    request.open("POST", url, true);
    request.onreadystatechange = displayResultInsert;
    request.send(null);
}

function displayResultInsert() {
    if (request.readyState == 4) {
        if (request.status == 200) {
             // var element = document.getElementById("actionResult");
             // element.innerHTML = request.responseText;


            var text = JSON.parse(request.responseText);
            var context = `<div class="ui top attached warning icon message"><i class="warning icon"></i><div class="content">`
            for (var result of text) {
                context += "Insert " + result + "";
            }
            context += "</div></div>";
            document.getElementById("actionResult").innerHTML = context;


        }
    }

}