CREATE DATABASE IF NOT EXISTS BUSDATA;
USE BUSDATA;

CREATE TABLE IF NOT EXISTS route_Bus (
   routeID  int(11) NOT NULL,
   companyCode  varchar(10) NOT NULL,
   routeNamee  varchar(50) NOT NULL,
   routeType  int(10) NOT NULL,
   serviceMode  varchar(10) NOT NULL,
   specialType  int(10) NOT NULL,
   journeyTime  int(10) NOT NULL,
   locStartNamee  varchar(65535) NOT NULL,
   locEndNamee  varchar(65535) NOT NULL,
   hyperlinkE  varchar(65535) NOT NULL,
   fullFare  float (20) NOT NULL,
   lastUpdateDate1  datetime(6) NOT NULL DEFAULT current_timestamp(6)
);

CREATE TABLE IF NOT EXISTS rstop_Bus (
    routeID  int(11) NOT NULL,
    routeSEQ  int(10) NOT NULL,
    stopSEQ  int(10) NOT NULL,
    stopID  int(10) NOT NULL,
    stopPickDrop  varchar(10) NOT NULL,
    stopNamee  varchar(50) NOT NULL,
    lastUpdateDate  datetime(6) NOT NULL DEFAULT current_timestamp(6)
);

CREATE TABLE IF NOT EXISTS stop_Bus (
   stopID  int(11) NOT NULL,
   stopType  int(10) NOT NULL,
   x  int(10) NOT NULL,
   y  int(10) NOT NULL,
   lastUpdateDate3  datetime(6) NOT NULL DEFAULT current_timestamp(6)
);

ALTER TABLE route_bus
  ADD PRIMARY KEY (routeID);

ALTER TABLE stop_bus
  ADD PRIMARY KEY (stopID);

ALTER TABLE route_bus
  MODIFY routeID int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE stop_bus
  MODIFY stopID int(11) NOT NULL AUTO_INCREMENT;


