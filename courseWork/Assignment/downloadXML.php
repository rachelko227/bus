<?php

$xml1 = file_get_contents("https://static.data.gov.hk/td/routes-fares-xml/ROUTE_BUS.xml");
file_put_contents("ROUTE_BUS.xml", $xml1); 

$xml2 = file_get_contents("https://static.data.gov.hk/td/routes-fares-xml/RSTOP_BUS.xml"); 
file_put_contents("RSTOP_BUS.xml", $xml2); 

$xml3 = file_get_contents("https://static.data.gov.hk/td/routes-fares-xml/STOP_BUS.xml"); 
file_put_contents("STOP_BUS.xml", $xml3); 

?>