import { Component, OnInit,  Output, EventEmitter, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BusRecord } from '../BusRecord.model';
import { ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-delete-bus',
  templateUrl: './delete-bus.component.html',
  styleUrls: ['./delete-bus.component.css']
  ,changeDetection: ChangeDetectionStrategy.OnPush
})

export class DeleteBusComponent implements OnInit, OnChanges {
  @Input() busRecord!: BusRecord;
  url!: string;
  loading: boolean = false;
  deleteBusForm: FormGroup;
  http: HttpClient;
  serverData: Object | null;
  message: string = "hello";

  constructor(fb: FormBuilder, http: HttpClient) { 
    this.http = http;
    this.serverData = null;
    this.deleteBusForm = fb.group(
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
    console.log("DeleteBus: ngOnInit()");
  }

  ngOnChanges() {
    console.log("Delete: ngOnChanges()");
    this.deleteBusForm.controls['routeID'].setValue(this.busRecord.routeID);
    this.deleteBusForm.controls['companyCode'].setValue(this.busRecord.companyCode);
    this.deleteBusForm.controls['routeNamee'].setValue(this.busRecord.routeNamee);
    this.deleteBusForm.controls['routeType'].setValue(this.busRecord.routeType);
    this.deleteBusForm.controls['serviceMode'].setValue(this.busRecord.serviceMode);
    this.deleteBusForm.controls['specialType'].setValue(this.busRecord.specialType);
    this.deleteBusForm.controls['journeyTime'].setValue(this.busRecord.journeyTime);
    this.deleteBusForm.controls['locStartNamee'].setValue(this.busRecord.locStartNamee);
    this.deleteBusForm.controls['locEndNamee'].setValue(this.busRecord.locEndNamee);
    this.deleteBusForm.controls['hyperlinkE'].setValue(this.busRecord.hyperlinkE);
    this.deleteBusForm.controls['fullFare'].setValue(this.busRecord.fullFare);
  }

  onSubmit(formValue: any): void {
    console.log("Submitted value: ", formValue);
    this.serverData = null;
    this.url = 'http://localhost/courseWork/server/Controller.php/Routeadmin/' + formValue['routeID'];
    this.http.delete(this.url).subscribe(
      res => {
        console.log(res);
        this.serverData = res;
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

  @Output() cancelDeleteEvent = new EventEmitter();

  cancelButtonHandler(): void {
    console.log("Delete: emitting cancelDeleteEvent");
    this.cancelDeleteEvent.emit();
  }

}
