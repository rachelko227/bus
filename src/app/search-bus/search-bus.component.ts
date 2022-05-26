import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusRecord } from '../BusRecord.model';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
  @Input() searchType: string;
  active!: string;
  http: HttpClient;
  serverData: Object | null;
  serverDataArr: any;
  url: string;
  searchBusForm: FormGroup;
  busRecord: BusRecord = {
    routeID: '', 
    companyCode: '', 
    routeNamee: '', 
    routeType: '', 
    serviceMode: '', 
    specialType: '',
    journeyTime: '', 
    locStartNamee: '', 
    locEndNamee: '',
    hyperlinkE: '',  
    fullFare: ''
  }
  loading!: boolean;

  constructor(fb: FormBuilder, http: HttpClient) { 
    this.http = http;
    this.serverData = null;
    this.url = "";
    this.searchType = "";
    this.searchBusForm = fb.group(
      {
        'searchKey': ['', Validators.required]
      }
    );
  }

  onSubmit(formValue: any): void {
    this.serverData = null;
    if (this.searchType === "By Route") {
      this.url = "http://localhost/courseWork/server/Controller.php/Route/" + formValue['searchKey'];
    } else if (this.searchType === "By Current Location") {
      this.url = "http://localhost/courseWork/server/Controller.php/Stop/" + formValue['searchKey'];
    } else if (this.searchType === "By Start Point") {
      this.url = "http://localhost/courseWork/server/Controller.php/Start/" + formValue['searchKey'];
    } else if (this.searchType === "By End Point") {
      this.url = "http://localhost/courseWork/server/Controller.php/End/" + formValue['searchKey'];
    }
    this.http.get<any>(this.url).subscribe(
      res => {
        console.log(res);
        this.serverData = res;
        this.serverDataArr = JSON.parse(JSON.stringify(res));
      }
      ,res => {
        console.log('error');
        this.serverData = "Failed to connect to server";
      },
      () => { // common function
        this.loading = false;
      }
    );
  }

  @Output() deleteEvent = new EventEmitter<BusRecord>();
  deleteButtonHandler(routeNamee: string) {
    console.log("Search: delete button: " + routeNamee);
    console.log("Search: Emitting deleteEvent");

    for (let bus of this.serverDataArr) {
      if (routeNamee === bus.routeNamee) {
        this.busRecord.routeID = bus.routeID;
        this.busRecord.companyCode = bus.companyCode;
        this.busRecord.routeNamee = bus.routeNamee;
        this.busRecord.routeType = bus.routeType;
        this.busRecord.serviceMode = bus.serviceMode;
        this.busRecord.specialType = bus.specialType;
        this.busRecord.journeyTime = bus.journeyTime;
        this.busRecord.locStartNamee = bus.locStartNamee;
        this.busRecord.locEndNamee = bus.locEndNamee;
        this.busRecord.hyperlinkE = bus.hyperlinkE;
        this.busRecord.fullFare = bus.fullFare;
      }
    }
    this.deleteEvent.emit(this.busRecord);
  }
  
  @Output() editEvent = new EventEmitter<BusRecord>();

  editButtonHandler(routeNamee: string) {
    console.log("Search: edit button: " + routeNamee);
    console.log("Search: Emitting editEvent");

    for (let bus of this.serverDataArr) {
      if (routeNamee === bus.routeNamee) {
        this.busRecord.routeID = bus.routeID;
        this.busRecord.companyCode = bus.companyCode;
        this.busRecord.routeNamee = bus.routeNamee;
        this.busRecord.routeType = bus.routeType;
        this.busRecord.serviceMode = bus.serviceMode;
        this.busRecord.specialType = bus.specialType;
        this.busRecord.journeyTime = bus.journeyTime;
        this.busRecord.locStartNamee = bus.locStartNamee;
        this.busRecord.locEndNamee = bus.locEndNamee;
        this.busRecord.hyperlinkE = bus.hyperlinkE;
        this.busRecord.fullFare = bus.fullFare;
      }
    }   
    this.editEvent.emit(this.busRecord);
  }

  ngOnInit(): void {
 //   console.log("searchType:" + this.searchType);
  }
}
