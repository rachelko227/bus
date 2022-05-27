<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
require_once 'conn.php';
class Controller {
    private $handler;
    private $params;
    function __construct() {
        $dataStr = $_SERVER['PATH_INFO'];
        $this->params = explode('/', $dataStr);
        array_shift($this->params);

        $resource = array_shift($this->params);

        $resource = strtolower($resource);
        $resource = ucfirst($resource);
        $handlerName = $resource.'Handler';
        $handlerFile = $handlerName.'.php';
        if (file_exists($handlerFile)) {
            require_once $handlerFile;
            $this->handler = new $handlerName;
            $method = $_SERVER['REQUEST_METHOD'];
            $method = 'rest'.ucfirst(strtolower($method));
            $this->handler->$method($this->params);
        } else {
            echo 'Invalid resource name';
        }
    }
}
$controller = new Controller();
?>