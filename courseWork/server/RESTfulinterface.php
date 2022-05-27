<?php
require_once 'conn.php';
interface RESTfulinterface {
  public function restGet ($params);
  public function restPut ($params);
  public function restPost ($params);
  public function restDelete ($params);
}
?>