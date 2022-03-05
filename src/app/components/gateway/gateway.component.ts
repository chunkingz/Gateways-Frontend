import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  gateways: any
  gatewaysLen: any

  constructor(private _data: DataService, private _title: Title) { }

  ngOnInit() {
    this._title.setTitle('Gateway Homepage')
    this.getGateways()
  }

  getGateways() {
    this._data.getGateway().subscribe(res => {
      this.gateways = res;
      this.gatewaysLen = this.gateways.length
    })
  }

  deleteGateway(id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to regain the Gateway data once it's deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._data.deleteGateway(id).subscribe(res => {
          // once done with the delete, refresh the page.
          this.getGateways()
        })
        Swal.fire(
          'Deleted!',
          'The gateway has been deleted.',
          'success'
        )
      }
    })
  }

}
