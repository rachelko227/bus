import { Component, ViewChild } from '@angular/core';
import { BusRecord } from './BusRecord.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'bus';
  deleteEventTriggered: boolean = false;
  editEventTriggered: boolean = false;
  busRecord!: BusRecord;
  routeActive: boolean = true;
  currentActive: boolean = false;
  startActive: boolean = false;
  endActive: boolean = false;
  createActive: boolean = false;
  createInactive: boolean = false;
  createHandler(activeCreate: boolean) {
    console.log(activeCreate);
    if(activeCreate === true) {
      this.createActive = false;
    } else {
      this.createActive = true;
    }
  }
  clickHandler(active: string) {
    if(active === 'routeActive') {
      this.routeActive = true;
      this.currentActive = false;
      this.startActive = false;
      this.endActive = false;
    } else if (active === 'currentActive') {
      this.routeActive = false;
      this.currentActive = true;
      this.startActive = false;
      this.endActive = false;
    } else if (active === 'startActive') {
      this.routeActive = false;
      this.currentActive = false;
      this.startActive = true;
      this.endActive = false;
    } else if (active === 'endActive') {
      this.routeActive = false;
      this.currentActive = false;
      this.startActive = false;
      this.endActive = true;
    }
  }

  deleteEventReceiver(busRecord: BusRecord) {
    console.log("App: delete event received");
    console.log("App: busRecord received from delete event:");

    var newBusRecord: BusRecord = {
      "routeID": busRecord.routeID,
      "companyCode": busRecord.companyCode,
      "routeNamee": busRecord.routeNamee,
      "routeType": busRecord.routeType,
      "serviceMode": busRecord.serviceMode,
      "specialType": busRecord.specialType,
      "journeyTime": busRecord.journeyTime,
      "locStartNamee": busRecord.locStartNamee,
      "locEndNamee": busRecord.locEndNamee,
      "hyperlinkE": busRecord.hyperlinkE,
      "fullFare": busRecord.fullFare
    };
    this.busRecord = newBusRecord;
    
    this.deleteEventTriggered = true;
  }
  
  editEventReceiver(busRecord: BusRecord) {
    console.log("App: edit event received");
    console.log("App: busRecord received from edit event:");
    
    var newBusRecord: BusRecord = {
      "routeID": busRecord.routeID,
      "companyCode": busRecord.companyCode,
      "routeNamee": busRecord.routeNamee,
      "routeType": busRecord.routeType,
      "serviceMode": busRecord.serviceMode,
      "specialType": busRecord.specialType,
      "journeyTime": busRecord.journeyTime,
      "locStartNamee": busRecord.locStartNamee,
      "locEndNamee": busRecord.locEndNamee,
      "hyperlinkE": busRecord.hyperlinkE,
      "fullFare": busRecord.fullFare
    };
    this.busRecord = newBusRecord;

    console.log("routeNamee: " + this.busRecord.routeNamee);

    this.editEventTriggered = true;
  }
  

  cancelDeleteEventReceiver() {
    console.log("App: cancel delete event received");
    this.deleteEventTriggered = false;
  }

  cancelEditEventReceiver() {
    console.log("App: cancel edit event received");
    this.editEventTriggered = false;
  }
  
}
