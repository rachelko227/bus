//PUT
function ajaxUpdate() {
    var resource = document.getElementById("resourceUpd").value;
    var routeID = document.getElementById("routeIDUpd").value;
    var companyCode = document.getElementById("companyCodeUpd").value;
    var routeName = document.getElementById("routeNameUpd").value;
    var routeType = document.getElementById("routeTypeUpd").value;
    var serviceMode = document.getElementById("serviceModeUpd").value;
    var specialType = document.getElementById("specialTypeUpd").value;
    var journeyTime = document.getElementById("journeyTimeUpd").value;
    var locStartName = document.getElementById("locStartNameUpd").value;
    var locEndName = document.getElementById("locEndNameUpd").value;
    var hyperlink = document.getElementById("hyperlinkUpd").value;
    var fullFare = document.getElementById("fullFareUpd").value;

    var url = "http://localhost/courseWork/server/Controller.php/" + resource + "/" + routeID + "/" + companyCode + "/" + routeName + "/" + routeType + "/" +
        serviceMode + "/" + specialType + "/" + journeyTime + "/" + locStartName + "/" + locEndName + "/" + hyperlink + "/" + fullFare;
    request.open("PUT", url, true);

    request.onreadystatechange = displayResultUpdate;
    request.send(null);
}


function displayResultUpdate() {
    if (request.readyState == 4) {
        if (request.status == 200) {


            var text = JSON.parse(request.responseText);
            var context = `<div class="ui top attached warning icon message"><i class="warning icon"></i><div class="content">`
            for (var result of text) {
                context += "Update " + result + "";
            }
            context += "</div></div>";
            document.getElementById("actionResult").innerHTML = context;

        }
    }

}