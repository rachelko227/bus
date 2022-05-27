<?php
//require_once 'conn.php';
require_once 'RESTfulinterface.php';
class StartEndHandler implements RESTfulinterface {
  public function restGet($params) {
    include ('conn.php');
  
          $sql = "SELECT routeNamee, locStartNamee, locEndNamee
          FROM route_bus WHERE locStartNamee LIKE '%$params[0]%' AND locEndNamee LIKE '%$params[1]%'";
          $result = mysqli_query($conn,$sql);
       
          while($row = mysqli_fetch_assoc($result)){
          $Array[] = $row;
       
      

    }
        echo json_encode($Array);
  }
    public function restPost($params) {
      include ('conn.php');
      $sql = "INSERT INTO route_bus( companyCode, routeName, routeType, serviceMode, specialType, journeyTime, locStartName, locEndName, hyperlink, fullFare) 
                VALUES ('$params[0]','$params[1]','$params[2]','$params[3]','$params[4]','$params[5]','$params[6]','$params[7]','$params[8]','$params[9]')";
      $result = $conn->query($sql);
      if(mysqli_affected_rows($conn)>0) {
          echo "Successful";
         
      }
  }
    public function restPut($params) {
        include ('conn.php');
        $sql="UPDATE route_bus SET companyCode='$params[1]',routeName='$params[2]',routeType='$params[3]',serviceMode='$params[4]',specialType='$params[5]',journeyTime='$params[6]',locStartName='$params[7]',locEndName='$params[8]',hyperlink='$params[9]',fullFare='$params[10]' WHERE routeID='$params[0]'";
        
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
