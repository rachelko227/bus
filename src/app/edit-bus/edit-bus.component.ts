import { Component, OnInit,  Output, EventEmitter, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BusRecord } from '../BusRecord.model';
import { ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
   ,changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditBusComponent implements OnInit, OnChanges {
  @Input() busRecord!: BusRecord;
  url!: string;
  loading: boolean = false;
  editBusForm: FormGroup;
  http: HttpClient;
  serverData: Object | null;
  message: string = "hello";

  constructor(fb: FormBuilder, http: HttpClient) { 
    this.http = http;
    this.serverData = null;
    this.editBusForm = fb.group(
      {
        'routeID': ['', Validators.required],
        'companyCode': ['', Validators.required],
        'routeNamee': ['', Validators.required],
        'routeType': ['', Validators.required],
        'serviceMode': ['', Validators.required],
        'specialType': ['', Validators.required],
        'journeyTime': ['', Validators.required],
        'locStartNamee': ['', Validators.required],
        'locEndNamee': ['', Validators.required],
        'hyperlinkE': ['', Validators.required],
        'fullFare': ['', Validators.required]
      }
    );

  }

  ngOnInit(): void {
    console.log("EditBus: ngOnInit()");
    
  }

  ngOnChanges(): void {
    console.log("Edit: ngOnChanges()");
    this.editBusForm.controls['routeID'].setValue(this.busRecord.routeID);
    this.editBusForm.controls['companyCode'].setValue(this.busRecord.companyCode);
    this.editBusForm.controls['routeNamee'].setValue(this.busRecord.routeNamee);
    this.editBusForm.controls['routeType'].setValue(this.busRecord.routeType);
    this.editBusForm.controls['serviceMode'].setValue(this.busRecord.serviceMode);
    this.editBusForm.controls['specialType'].setValue(this.busRecord.specialType);
    this.editBusForm.controls['journeyTime'].setValue(this.busRecord.journeyTime);
    this.editBusForm.controls['locStartNamee'].setValue(this.busRecord.locStartNamee);
    this.editBusForm.controls['locEndNamee'].setValue(this.busRecord.locEndNamee);
    this.editBusForm.controls['hyperlinkE'].setValue(this.busRecord.hyperlinkE);
    this.editBusForm.controls['fullFare'].setValue(this.busRecord.fullFare);
  }

  onSubmit(formValue: any): void {
    // you should add http stuff to make a request to server 
    console.log("Submitted value: ", formValue);
    this.serverData = null;
    this.url = 'http://localhost/courseWork/server/Controller.php/Routeadmin/' + formValue['routeID'] + "/" + formValue['companyCode'] + "/" + formValue['routeNamee'] + "/" + formValue['routeType'] + 
    "/" + formValue['serviceMode'] + "/" + formValue['specialType'] + "/" + formValue['journeyTime'] + "/" + formValue['locStartNamee'] + "/" + formValue['locEndNamee'] + 
    "/" + formValue['hyperlinkE'] + "/" + formValue['fullFare'];

    this.http.put(this.url, {
      'routeID': formValue['routeID'],
      'companyCode': formValue['companyCode'],
      'routeNamee': formValue['routeNamee'],
      'routeType': formValue['routeType'],
      'serviceMode': formValue['serviceMode'],
      'specialType': formValue['specialType'],
      'journeyTime': formValue['journeyTime'],
      'locStartName': formValue['locStartName'],
      'locEndName': formValue['locEndName'],
      'hyperlinkE': formValue['hyperlinkE'],
      'fullFare': formValue['fullFare']
    }
    ).subscribe(
      res => {
        console.log(res);
        this.serverData = res;
      //  this.serverDataArr = JSON.parse(JSON.stringify(res));
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

  @Output() cancelEditEvent = new EventEmitter();

  cancelButtonHandler(): void {
    
    this.cancelEditEvent.emit();
  }

}
