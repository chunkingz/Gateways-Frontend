# Gateways Frontend (Musala Soft Fullstack Developer Assessment)

This sample project is about managing gateways - master devices that control multiple peripheral devices.

The task is to create a REST service for storing information about these gateways and their associated devices. This information must be stored in the database.

When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

---
<br>

## Technologies used :dart:

For this project I used the MEAN stack:

:green_circle: [MongoDB](https://www.mongodb.com/)

:purple_circle: [Expressjs](https://expressjs.com/)

:red_circle: [Angular](https://angular.io/)

:yellow_circle: [Nodejs](https://nodejs.org/en/)


---
<br>

# Urls (Live Hosting) :link:

:gem: This app is hosted on Heroku [here](https://musala-gateways.herokuapp.com/)

:fire: Firebase coming soon...

:octocat: Github Pages coming soon...

:electric_plug: The API backend [Github Repo](https://github.com/chunkingz/Gateways-Backend)

---
<br>

# Docker :whale:

You may install and test out this project using docker via the command.

```
docker run -dp 5000:5000 chunkingz/gateways
```

If you do not have docker installed locally, you can also test it out on [Play with Docker](https://labs.play-with-docker.com/)

---
<br>

## How to install and test locally :bulb:

Run the following commands in a *split* terminal.

in the first terminal...

```
git clone https://github.com/chunkingz/Gateways-Backend.git
```

```
cd Gateways-Backend
``` 

```
npm i
``` 

in the second terminal...

```
git clone https://github.com/chunkingz/Gateways-Frontend.git
```

```
cd Gateways-Frontend
``` 

```
npm i
``` 

---
<br>

## Automated Build for Development server (in the backend directory) :zap:

For an automated build, run the script below for Gulp and Webpack. 

```
npm run dev-build
```

For a prodcution server, run the script below. 
```
npm start
``` 


To interact with the Endpoints directly, Open Postman and use the following

| Verb        | Endpoint                                      | Payload                   |  Use                          |
| ----------- | --------------------------------------------- |---------------------------|-------------------------------|
| GET         | http://localhost:5000/gateways                | No                        |  Get all gateway devices      |
| GET         | http://localhost:5000/gateways/<gatewayID\>    | No                       |  Get a single gateway device  |
| POST        | http://localhost:5000/gateways                | Yes (See Gateway model below)     |  Add a Gateway                |
| PUT         | http://localhost:5000/gateways/<gatewayID\>    | Yes (See Gateway model below)    |  Update a Gateway             |
| DEL         | http://localhost:5000/gateways/<gatewayID\>    | No                       |  Delete a Gateway             |
| DEL         | http://localhost:5000/gateways/<gatewayID\>/peripheralDevices/<deviceID\> |  No    |  Delete a peripheral device  |
| POST        | http://localhost:5000/gateways/<gatewayID\>/peripheralDevices/add    | Yes (See Peripheral model below) |  Add a peripheral device      |

<br>

> Gateway model

``` typescript
{
    serialNumber: String,
    deviceName: String,
    ipv4: String,
    peripheralDevices: Array<Object>,
}
```

<br>

> Peripheral Devices model

``` typescript
{
    UID: number,
    vendor: String,
    dateCreated: Date,
    status: EnumType,
}
```

---
<br>

## DB Config :file_cabinet:

**Optionally**, you may import my dummy DB values into the `gateways` collection, in mongodb compass/atlas

The file is located in `<backend dir>/imports/gateways.json`

---

:bowtie: yours truly
