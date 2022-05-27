<?php
require_once 'RESTfulinterface.php';
class RouteHandler implements RESTfulinterface {
    public function restGet($params) {

        include ('conn.php');

        $sql = "
        SELECT DISTINCT route_bus.routeID, route_bus.companyCode, route_bus.routeNamee, route_bus.routeType, route_bus.serviceMode, route_bus.specialType, route_bus.journeyTime, route_bus.locStartNamee, route_bus.locEndNamee, route_bus.hyperlinkE, route_bus.fullFare 
        FROM route_bus, rstop_bus WHERE route_bus.routeNamee='$params[0]' AND rstop_bus.routeSEQ='1'
        ";

        if($params[0] == ''){
          $myArray['error'] = array('code'=>'100', 'message'=>'route name missing');

        } else {

        $result = mysqli_query($conn,$sql);

        if(mysqli_num_rows($result)<1) {
          $myArray['error'] = array('code'=>'101', 'message'=>'no such route name');
        } else {
          while($row = mysqli_fetch_assoc($result)){
            $myArray[] = $row;
        }
      }
    }
        echo json_encode($myArray);
  }
    public function restPost($params) {
      include ('conn.php');
      $sql = "INSERT INTO route_bus( companyCode, routeNamee, routeType, serviceMode, specialType, journeyTime, locStartNamee, locEndNamee, hyperlinkE, fullFare) 
                VALUES ('$params[0]','$params[1]','$params[2]','$params[3]','$params[4]','$params[5]','$params[6]','$params[7]','$params[8]','$params[9]')";
      $result = $conn->query($sql);
      if(mysqli_affected_rows($conn)>0) {
          echo "Successful";
              }

    
    echo 'routeID auto gen';
    echo 'Last Update Date current';
  }
    public function restPut($params) {
        include ('conn.php');
        $sql="UPDATE route_bus SET companyCode='$params[1]',routeNamee='$params[2]',routeType='$params[3]',serviceMode='$params[4]',specialType='$params[5]',journeyTime='$params[6]',locStartNamee='$params[7]',locEndNamee='$params[8]',hyperlinkE='$params[9]',fullFare='$params[10]' WHERE routeID='$params[0]'";
       
        $result = $conn->query($sql);
        if(mysqli_affected_rows($conn)>0) {
            echo 'putupdate';
            echo "Successful";
        }
      

    }
    public function restDelete($params) {
        include ('conn.php');
        $sql = "DELETE FROM route_bus WHERE routeID = '$params[0]'";

         foreach($params as $item){
             echo $item;
          }
        $result = $conn->query($sql);
        if(mysqli_affected_rows($conn)>0) {
            echo 'delete';
            echo "Successful";
        }
       
    }
}
?>
