import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import Swal from 'sweetalert2';
import { IPAddressValidators } from 'src/app/validators/ip-address.validators';
import { SerialNumberValidators } from 'src/app/validators/serial-number.validators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'add-gateway',
  templateUrl: './add-gateway.component.html',
  styleUrls: ['./add-gateway.component.scss']
})
export class AddGatewayComponent implements OnInit {

  constructor(private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('Add Gateway')
  }

  gatewayForm = new FormGroup({
    serialNumber: new FormControl('', Validators.required, SerialNumberValidators.uniqueSerialNumber),
    deviceName: new FormControl('', Validators.required),
    ipv4: new FormControl('', [Validators.required, Validators.minLength(7), IPAddressValidators.validIP]),
  });

  // Get values from the reactive form for form validation in the template
  get serialNumber(){return this.gatewayForm.get('serialNumber')}
  get deviceName(){return this.gatewayForm.get('deviceName')}
  get ipv4(){return this.gatewayForm.get('ipv4')}

  peripheralForm = new FormGroup({});

  model = {
    peripheralDevices: [{}],
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'peripheralDevices',
      type: 'repeat',
      templateOptions: {
        addText: 'Add another peripheral device',
      },
      fieldArray: {
        fieldGroup: [
          {
            type: 'input',
            key: 'UID',
            className: 'col-sm-4',
            templateOptions: {
              label: 'UID:',
              required: true,
            },
          },
          {
            type: 'input',
            key: 'vendor',
            className: 'col-sm-4',
            templateOptions: {
              label: 'Vendor:',
              required: true,
            },
          },
          {
            type: 'input',
            key: 'dateCreated',
            className: 'col-sm-4',
            hide: true,
            defaultValue: new Date().toLocaleString(),
            templateOptions: {
              label: 'Date Created:',
              
            },
          },
          {
            type: 'select',
            key: 'status',
            className: 'col-sm-4',
            templateOptions: {
              label: 'Status:',
              required: true,
              options: [
                {label: 'Online', value: 'online'},
                {label: 'Offline', value: 'offline'},
              ],
            },
          },
        ],
      },
    },
  ];


  submit() {
    if(this.peripheralForm.valid && this.gatewayForm.valid) {      

      const { serialNumber, deviceName, ipv4 } = this.gatewayForm.controls

      const data = {
        serialNumber: serialNumber.value,
        deviceName: deviceName.value,
        ipv4: ipv4.value,
        peripheralDevices: this.model.peripheralDevices
      }

      if(data.peripheralDevices.length > 10){
        Swal.fire({
          icon: 'warning',
          title: 'Only 10 devices allowed 😒',
        })
        return
      }

      this._data.postGateway(data).subscribe(res => {
        if(res){
          Swal.fire({
            icon: 'success',
            title: 'Gateway saved! 🎉🎊',
          })
          this.resetTheForm()
        }
      })
      
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill out all fields',
      })
    }
  }

  resetTheForm() {
    this.gatewayForm.reset();
  }

}
