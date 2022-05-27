<?php
set_time_limit(0);

include 'conn.php';

$affectedRow = 0;

$domTree = new DOMDocument();
$domTree->load('ROUTE_BUS.xml');

$quoteArray = $domTree->getElementsByTagName("ROUTE");



foreach ($quoteArray as $q) {
    $routeID1Array = $q->getElementsByTagName('ROUTE_ID');
    $routeID1Node = $routeID1Array->item(0);
    $routeID1Value = $routeID1Node->nodeValue;

    $companyCodeArray = $q->getElementsByTagName("COMPANY_CODE");
    $companyCodeNode = $companyCodeArray->item(0);
    $companyCodeValue = $companyCodeNode->nodeValue;

    $routeNamecArray = $q->getElementsByTagName("ROUTE_NAMEC");
    $routeNamecNode = $routeNamecArray->item(0);
    $routeNamecValue = $routeNamecNode->nodeValue;

    $routeNamesArray = $q->getElementsByTagName("ROUTE_NAMES");
    $routeNamesNode = $routeNamesArray->item(0);
    $routeNamesValue = $routeNamesNode->nodeValue;

    $routeNameeArray = $q->getElementsByTagName("ROUTE_NAMEE");
    $routeNameeNode = $routeNameeArray->item(0);
    $routeNameeValue = $routeNameeNode->nodeValue;

    $routeTypeArray = $q->getElementsByTagName("ROUTE_TYPE");
    $routeTypeNode = $routeTypeArray->item(0);
    $routeTypeValue = $routeTypeNode->nodeValue;

    $serviceModeArray = $q->getElementsByTagName("SERVICE_MODE");
    $serviceModeNode = $serviceModeArray->item(0);
    $serviceModeValue = $serviceModeNode->nodeValue;

    $specialTypeArray = $q->getElementsByTagName("SPECIAL_TYPE");
    $specialTypeNode = $specialTypeArray->item(0);
    $specialTypeValue = $specialTypeNode->nodeValue;

    $journeyTimeArray = $q->getElementsByTagName("JOURNEY_TIME");
    $journeyTimeNode = $journeyTimeArray->item(0);
    $journeyTimeValue = $journeyTimeNode->nodeValue;

    $locStartNamecArray = $q->getElementsByTagName("LOC_START_NAMEC");
    $locStartNamecNode = $locStartNamecArray->item(0);
    $locStartNamecValue = $locStartNamecNode->nodeValue;

    $locStartNamesArray = $q->getElementsByTagName("LOC_START_NAMES");
    $locStartNamesNode = $locStartNamesArray->item(0);
    $locStartNamesValue = $locStartNamesNode->nodeValue;

    $locStartNameeArray = $q->getElementsByTagName("LOC_START_NAMEE");
    $locStartNameeNode = $locStartNameeArray->item(0);
    $locStartNameeValue = $locStartNameeNode->nodeValue;

    $locEndNamecArray = $q->getElementsByTagName("LOC_END_NAMEC");
    $locEndNamecNode = $locEndNamecArray->item(0);
    $locEndNamecValue = $locEndNamecNode->nodeValue;

    $locEndNamesArray = $q->getElementsByTagName("LOC_END_NAMES");
    $locEndNamesNode = $locEndNamesArray->item(0);
    $locEndNamesValue = $locEndNamesNode->nodeValue;

    $locEndNameeArray = $q->getElementsByTagName("LOC_END_NAMEE");
    $locEndNameeNode = $locEndNameeArray->item(0);
    $locEndNameeValue = $locEndNameeNode->nodeValue;

    $hyperlinkCArray = $q->getElementsByTagName("HYPERLINK_C");
    $hyperlinkCNode = $hyperlinkCArray->item(0);
    $hyperlinkCValue = $hyperlinkCNode->nodeValue;

    $hyperlinkSArray = $q->getElementsByTagName("HYPERLINK_S");
    $hyperlinkSNode = $hyperlinkSArray->item(0);
    $hyperlinkSValue = $hyperlinkSNode->nodeValue;

    $hyperlinkEArray = $q->getElementsByTagName("HYPERLINK_E");
    $hyperlinkENode = $hyperlinkEArray->item(0);
    $hyperlinkEValue = $hyperlinkENode->nodeValue;

    $fullFareArray = $q->getElementsByTagName("FULL_FARE");
    $fullFareNode = $fullFareArray->item(0);
    $fullFareValue = $fullFareNode->nodeValue;

    $lastUpdateDate1Array = $q->getElementsByTagName("LAST_UPDATE_DATE");
    $lastUpdateDate1Node = $lastUpdateDate1Array->item(0);
    $lastUpdateDate1Value = $lastUpdateDate1Node->nodeValue;


    $locStartNameeValue2 = mysqli_real_escape_string($conn, $locStartNameeValue);
    $locEndNameeValue2 = mysqli_real_escape_string($conn, $locEndNameeValue);
    $sql = "
INSERT INTO route_bus
(routeID, companyCode, routeNamee, routeType, serviceMode, specialType, journeyTime, locStartNamee, locEndNamee, hyperlinkE, fullFare, lastUpdateDate1) 
VALUES 
('$routeID1Value','$companyCodeValue','$routeNameeValue','$routeTypeValue','$serviceModeValue','$specialTypeValue','$journeyTimeValue','$locStartNameeValue2','$locEndNameeValue2','$hyperlinkEValue','$fullFareValue','$lastUpdateDate1Value')";

    $result = mysqli_query($conn, $sql);

    if (! empty($result)) {
        $affectedRow ++;
    } else {
        $error_message = mysqli_error($conn) . "\n";
    }
}
?>
    <h2>Insert XML Data to MySql Table Output</h2>
<?php
if ($affectedRow > 0) {
    $message = $affectedRow . " records inserted";
} else {
    $message = "No records inserted";
}
mysqli_close($conn);
?>
    <style>
        body {
            max-width:550px;
            font-family: Arial;
        }
        .affected-row {
            background: #cae4ca;
            padding: 10px;
            margin-bottom: 20px;
            border: #bdd6bd 1px solid;
            border-radius: 2px;
            color: #6e716e;
        }
        .error-message {
            background: #eac0c0;
            padding: 10px;
            margin-bottom: 20px;
            border: #dab2b2 1px solid;
            border-radius: 2px;
            color: #5d5b5b;
        }
    </style>
    <div class="affected-row"><?php  echo $message; ?></div>
<?php if (! empty($error_message)) { ?>
    <div class="error-message"><?php echo nl2br($error_message); ?></div>
<?php } ?>