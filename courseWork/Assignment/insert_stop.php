<?php
set_time_limit(0);

include 'conn.php';

$affectedRow = 0;

$domTree = new DOMDocument();
$domTree->load('STOP_BUS.xml');

$quoteArray = $domTree->getElementsByTagName("STOP");

//$quotesArray = array();

foreach ($quoteArray as $q) {
    $stopID3Array = $q->getElementsByTagName('STOP_ID');
    $stopID3Node = $stopID3Array->item(0);
    $stopID3Value = $stopID3Node->nodeValue;

    $stopTypeArray = $q->getElementsByTagName("STOP_TYPE");
    $stopTypeNode = $stopTypeArray->item(0);
    $stopTypeValue = $stopTypeNode->nodeValue;

    $xArray = $q->getElementsByTagName("X");
    $xNode = $xArray->item(0);
    $xValue = $xNode->nodeValue;

    $yArray = $q->getElementsByTagName("Y");
    $yNode = $yArray->item(0);
    $yValue = $yNode->nodeValue;

    $lastUpdateDate3Array = $q->getElementsByTagName("LAST_UPDATE_DATE");
    $lastUpdateDate3Node = $lastUpdateDate3Array->item(0);
    $lastUpdateDate3Value = $lastUpdateDate3Node->nodeValue;

/*
    $quotesArray[] = array(
        'stopid3' => $stopID3Value,
        'stoptype' => $stopTypeValue,
        'x' => $xValue,
        'y' => $yValue,
        'lastupdatedate3' => $lastUpdateDate3Value
    );

    echo json_encode($quotesArray);
*/
    $sql = "
INSERT INTO stop_bus
(stopID, stopType, x, y, lastUpdateDate3) 
VALUES 
('$stopID3Value', '$stopTypeValue', '$xValue', '$yValue', '$lastUpdateDate3Value')
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