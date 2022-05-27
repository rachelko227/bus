<?php
//require_once 'conn.php';
require_once 'RESTfulinterface.php';
class RouteadminHandler implements RESTfulinterface {
   public function restGet($params) {
        include ('conn.php');
       $sql = "SELECT routeID, companyCode, routeNamee, routeType, serviceMode, specialType, journeyTime, locStartNamee, locEndNamee, hyperlinkE, fullFare, lastUpdateDate1
                FROM route_bus WHERE routeNamee='$params[0]'";
          if($params[0] == '') {
            $myArray['error'] = array('code'=>'100', 'message'=>'route name missing');
          } else {
            $result = mysqli_query($conn,$sql);
            if(mysqli_num_rows($result)<1) {
                $myArray['error'] = array('code'=>'101', 'message'=>'no such route name');
              } else {
          
     
        while($row = mysqli_fetch_assoc($result)){
            $myArray[] = $row;

        }}
    }
        echo json_encode($myArray);

    
}
    public function restPost($params) {
        include ('conn.php');
        $sql = "INSERT INTO route_bus( companyCode, routeNamee, routeType, serviceMode, specialType, journeyTime, locStartNamee, locEndNamee, hyperlinkE, fullFare) 
                VALUES ('$params[0]','$params[1]','$params[2]','$params[3]','$params[4]','$params[5]','$params[6]','$params[7]','$params[8]','$params[9]')";
        $result = $conn->query($sql);

        if(mysqli_affected_rows($conn)>0) {
            $myArray[] = 'Success';
           
        }
        echo json_encode($myArray);
       
    }
    public function restPut($params) {
        include ('conn.php');
        $sql="UPDATE route_bus SET companyCode='$params[1]',routeNamee='$params[2]',routeType='$params[3]',serviceMode='$params[4]',specialType='$params[5]',journeyTime='$params[6]',locStartNamee='$params[7]',locEndNamee='$params[8]',hyperlinkE='$params[9]',fullFare='$params[10]' WHERE routeID='$params[0]'";
  
        $result = $conn->query($sql);
        if(mysqli_affected_rows($conn)>0) {
            $myArray[] = 'Success';
        }
     
        echo json_encode($myArray);
    }
    public function restDelete($params) {
        include ('conn.php');
        if($params[0] == '') {
            $myArray['error'] = array('code'=>'200', 'message'=>'route ID missing');
          } else {
        $sql = "DELETE FROM route_bus WHERE routeID = '$params[0]'";
        $result = $conn->query($sql);
        if(mysqli_affected_rows($conn)==0) {
            $myArray['error'] = array('code'=>'201', 'message'=>'no such route ID');
        } else {
      
            $myArray[] = 'Success';
        }
    }
        echo json_encode($myArray);
    }
}

?>
