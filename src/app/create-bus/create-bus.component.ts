import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-bus',
  templateUrl: './create-bus.component.html',
  styleUrls: ['./create-bus.component.css']
})
export class CreateBusComponent implements OnInit {
  http: HttpClient;
  serverData: Object | null;
  url: string;
  createBusForm: FormGroup;
  createActive: boolean = true;
  constructor(fb: FormBuilder, http: HttpClient) { 
    this.http = http;
    this.serverData = null;
    this.url = "";

    this.createBusForm = fb.group(
      {
        'companyCode': ['', Validators.required],
        'routeNamee': ['', Validators.required],
        'routeType': ['', Validators.compose([Validators.required, this.typeValidator])],
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

  onSubmit(formValue: any): void {
    this.serverData = null;
    this.url = "http://localhost/courseWork/server/Controller.php/Routeadmin/" + formValue['companyCode'] + "/" + formValue['routeNamee'] + "/" + formValue['routeType'] + 
    "/" + formValue['serviceMode'] + "/" + formValue['specialType'] + "/" + formValue['journeyTime'] + "/" + formValue['locStartNamee'] + "/" + formValue['locEndNamee'] + 
    "/" + formValue['hyperlinkE'] + "/" + formValue['fullFare'];

    console.log(formValue['companyCode']);
    console.log(formValue['routeNamee']);
    console.log(formValue['routeType']);
    console.log(formValue['serviceMode']);
    console.log(formValue['specialType']);
    console.log(formValue['journeyTime']);
    console.log(formValue['locStartNamee']);
    console.log(formValue['locEndNamee']);
    console.log(formValue['hyperlinkE']);
    console.log(formValue['fullFare']);

    this.http.post<any>(
      this.url, 
      {
        'companyCode': formValue['companyCode'],
        'routeNamee': formValue['routeNamee'],
        'routeType': formValue['routeType'],
        'serviceMode': formValue['serviceMode'],
        'specialType': formValue['specialType'],
        'journeyTime': formValue['journeyTime'],
        'locStartNamee': formValue['locStartNamee'],
        'locEndNamee': formValue['locEndNamee'],
        'hyperlinkE': formValue['hyperlinkE'],
        'fullFare': formValue['fullFare']
      }
    ).subscribe(
      res => {  // anonymous
        console.log("Server return: " + res);
        this.serverData = res;
      },  
      res => {
        console.log("Server error: " + res);
        this.serverData = res;
      }
    );
  }
  cancelButtonHandler(activeCreate: string) {
    if(activeCreate === 'createActive') {
      this.createActive = true;
    }
  }
  typeValidator(control: FormControl): { [s: string]: boolean }
  | null {
  if (!control.value.match(/[1,2,4,5,7]{1}/)) {
    return { invalidType: true };
  }
  return null;
}
  ngOnInit(): void {
  }

}
