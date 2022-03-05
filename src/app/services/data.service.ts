import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGateway } from '../models/gateway-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedGateway: IGateway | any;
  gateway: IGateway[] | any;

  private _url = `http://localhost:5000/gateways`;

  constructor(private _http: HttpClient) { }

  /**
   * GET all the Gateways
   * @returns all the gateway devices from the db
   */
  getGateway(){
    return this._http.get(`${this._url}/`)
  }

  /**
   * GET a single Gateway by ID
   * @param {string} id - the id of the gateway
   * @returns a single gateway device
   */
  getGatewayByID(id: string){
    return this._http.get(`${this._url}/${id}`)
  }

  /**
   * POST - (Add) a Gateway
   * @param {string} data - the user submitted gateway data
   * @returns the created gateway device
   */
  postGateway(data: any){
    return this._http.post(`${this._url}/`, data)
  }

  /**
   * PUT - (Update) a Gateway
   * @param {string} id - the id of the gateway
   * @param {string} data - the updated gateway data
   * @returns the updated gateway device
   */
  updateGateway(id: string, data: any){
    return this._http.put(`${this._url}/${id}`, data)
  }

  /**
   * Delete the Gateway
   * @param {string} id - the id of the gateway
   * @returns the deleted gateway device
   */
  deleteGateway(id: string){    
    return this._http.delete(`${this._url}/${id}`)
  }

  /**
   * POST - (Add) a Peripheral device
   * @param {string} gatewayID - the id of the gateway
   * @param {string} data - the user submitted peripheral device data
   * @returns the updated gateway
   */
   postPeripheralDevice(gatewayID: string, data: any){
    return this._http.post(`${this._url}/${gatewayID}/peripheralDevices/add`, data)
  }

  /**
   * Delete the Peripheral Device
   * @param {string} gatewayID - the id of the gateway
   * @param {string} peripheralUID - the UID of the Peripheral Device
   * @returns all the gateway devices from the db
   */
  deletePeripheral(gatewayID: string, peripheralUID: string){    
    return this._http.delete(`${this._url}/${gatewayID}/peripheralDevices/${peripheralUID}`)
  }

}
