import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IPAddressValidators } from 'src/app/validators/ip-address.validators';
import { SerialNumberValidators } from 'src/app/validators/serial-number.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-update-gateway',
  templateUrl: './update-gateway.component.html',
  styleUrls: ['./update-gateway.component.scss']
})
export class UpdateGatewayComponent implements OnInit {
  gateways: any;
  peripheralDevices: any;
  peripheralLen: any;
  closeResult = '';
  id: any;

  constructor(
    private _data: DataService, 
    private _router: Router, 
    private _currentRoute: ActivatedRoute, 
    private _title: Title,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this._title.setTitle('Update Gateway')
    this.refreshPage();
  }

  /**
   * Utility for initializing props and refreshing the page on action
   */
  refreshPage(){
    this.id = this._currentRoute.snapshot.paramMap.get('id')    
    if(this.id) this.getSelectedGateway(this.id)
  }

  /**
   * Get the current Gateway based on the route.
   * @param {string} id - the id of the current Gateway
   */
  getSelectedGateway(id: string) {
    this._data.getGatewayByID(id).pipe(take(1)).subscribe(res => {
      this.gateways = res;
      this.peripheralDevices = this.gateways.peripheralDevices;
      this.peripheralLen = this.peripheralDevices.length;

      this.setGatewayValues()
    }, () => {
      // return back to home, if id not found.
      this.invalidID()
    })
  }

  /**
   * if an invalid gateway ID has been provided
   */
  invalidID(){
    Swal.fire({
      icon: 'warning',
      title: 'Invalid ID',
    })
    this._router.navigate([''])
  }

  /**
   * Populate the Gateway values on the screen
   */
  setGatewayValues(){
    this.gatewayForm.get('serialNumber')?.setValue(this.gateways.serialNumber)
    this.gatewayForm.get('deviceName')?.setValue(this.gateways.deviceName)
    this.gatewayForm.get('ipv4')?.setValue(this.gateways.ipv4)
  }

  /**
   * Delete the device based on the ID
   * @param UID - the UID of the Peripheral Device
   */
  deletePeripheralDevice(peripheralUID: string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to regain the Device data once it's deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {        
        this._data.deletePeripheral(this.gateways._id, peripheralUID).pipe(take(1)).subscribe(res => {
          // once done with the delete, refresh the page.
          this.refreshPage()
        })
        Swal.fire(
          'Deleted!',
          'The device has been deleted.',
          'success'
        )
      }
    })
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

/**
 * function for updating the gateway
 * @returns 
 */
  updateGateway() {
    if(this.gatewayForm.valid) {      

      const { serialNumber, deviceName, ipv4 } = this.gatewayForm.controls

      // check to see if the user didnt make any change and submits the form, do nothing.
      if( serialNumber.value == this.gateways.serialNumber && deviceName.value == this.gateways.deviceName && ipv4.value == this.gateways.ipv4) return

      const data = {
        serialNumber: serialNumber.value,
        deviceName: deviceName.value,
        ipv4: ipv4.value,
      }
      
      this._data.updateGateway(this.gateways._id, data).pipe(take(1)).subscribe(res => {
        if(res){
          Swal.fire({
            icon: 'success',
            title: 'Gateway Updated! 🎉🎊',
          })
        }
      })
      
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill out all fields',
      })
    }
  }

  openModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Done and Closed`;
    }, () => {
      // this.closeResult = `Dismissed`;
    });
  }

  // define the reactive form group/controllers for the peripheral devices
  peripheralForm = new FormGroup({
    uid: new FormControl('', Validators.required),
    vendor: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  // Get values from the reactive form for form validation in the template
  get uid(){return this.peripheralForm.get('uid')}
  get vendor(){return this.peripheralForm.get('vendor')}
  get status(){return this.peripheralForm.get('status')}

  /**
   * function for adding a peripheral device to the current gateway
   */
  addPeripheralDevice(){
    
    if(this.peripheralForm.valid) {      

      const { uid, vendor, status } = this.peripheralForm.controls

      // data model to be sent to the backend
      const data = {
        "peripheralDevices": [
          {
            UID: uid.value,
            vendor: vendor.value,
            status: status.value,
          }
        ]
      }

      this._data.postPeripheralDevice(this.id, data).pipe(take(1)).subscribe(res => {
        if(res){
          Swal.fire({
            icon: 'success',
            title: 'Device added! 🎉🎊',
          })
          // once done with the delete, refresh the page and reset the modal form.
          this.refreshPage()
          this.peripheralForm.reset()
        }
      }, () => {
        // if it gets here, meaning the connected devices are already 10 in total.
        Swal.fire({
          icon: 'error',
          title: 'The peripheral devices cannot be more than 10 ❗️',
          text: 'You may delete one or more to add another 🤪'
        })
      })
      
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill out all fields',
      })
    }
  }
}
