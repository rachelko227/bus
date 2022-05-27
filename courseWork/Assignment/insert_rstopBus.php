<?php
set_time_limit(0);

include 'conn.php';

$affectedRow = 0;


$domTree = new DOMDocument();
$domTree->load('RSTOP_BUS.xml');

$quoteArray = $domTree->getElementsByTagName("RSTOP");

//$quotesArray = array();

foreach ($quoteArray as $q) {
    $routeID2Array = $q->getElementsByTagName('ROUTE_ID');
    $routeID2Node = $routeID2Array->item(0);
    $routeID2Value = $routeID2Node->nodeValue;

    $routeSEQArray = $q->getElementsByTagName("ROUTE_SEQ");
    $routeSEQNode = $routeSEQArray->item(0);
    $routeSEQValue = $routeSEQNode->nodeValue;

    $stopSEQArray = $q->getElementsByTagName("STOP_SEQ");
    $stopSEQNode = $stopSEQArray->item(0);
    $stopSEQValue = $stopSEQNode->nodeValue;

    $stopID2Array = $q->getElementsByTagName("STOP_ID");
    $stopID2Node = $stopID2Array->item(0);
    $stopID2Value = $stopID2Node->nodeValue;

    $stopPickDropArray = $q->getElementsByTagName("STOP_PICK_DROP");
    $stopPickDropNode = $stopPickDropArray->item(0);
    $stopPickDropValue = $stopPickDropNode->nodeValue;

    $stopNamecArray = $q->getElementsByTagName("STOP_NAMEC");
    $stopNamecNode = $stopNamecArray->item(0);
    $stopNamecValue = $stopNamecNode->nodeValue;

    $stopNamesArray = $q->getElementsByTagName("STOP_NAMES");
    $stopNamesNode = $stopNamesArray->item(0);
    $stopNamesValue = $stopNamesNode->nodeValue;

    $stopNameeArray = $q->getElementsByTagName("STOP_NAMEE");
    $stopNameeNode = $stopNameeArray->item(0);
    $stopNameeValue = $stopNameeNode->nodeValue;

    $lastUpdateDate2Array = $q->getElementsByTagName("LAST_UPDATE_DATE");
    $lastUpdateDate2Node = $lastUpdateDate2Array->item(0);
    $lastUpdateDate2Value = $lastUpdateDate2Node->nodeValue;

/*
    $quotesArray[] = array(
        'routeid2' => $routeID2Value,
        'routeseq' => $routeSEQValue,
        'stopseq' => $stopSEQValue,
        'stopid2' => $stopID2Value,
        'stoppickdrop' => $stopPickDropValue,
        'stopnamee' => $stopNameeValue,
        'lastupdatedate2' => $lastUpdateDate2Value
    );

    echo json_encode($quotesArray);
*/


    $stopNameeValue2 = mysqli_real_escape_string($conn, $stopNameeValue);
    $sql = "
INSERT INTO rstop_bus
(routeID, routeSEQ, stopSEQ, stopID, stopPickDrop, stopNamee, lastUpdateDate) 
VALUES 
('$routeID2Value', '$routeSEQValue', '$stopSEQValue', '$stopID2Value', '$stopPickDropValue', '$stopNameeValue2', '$lastUpdateDate2Value')
";
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