# Gateways Frontend (Musala Soft Fullstack Developer Assessment)

This sample project is about managing gateways - master devices that control multiple peripheral devices.

The task is to create a REST service for storing information about these gateways and their associated devices. This information must be stored in the database.

When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

---
<br>

# Urls (Live Hosting) :whale:

:gem: This app is hosted on Heroku [here](https://musala-gateways.herokuapp.com/)

:fire: Firebase coming soon...

:octocat: Github Pages coming soon...

:electric_plug: The API backend [Github Repo](https://github.com/chunkingz/Gateways-Backend)

---
<br>

## How to use locally :bulb:

Clone the repo by typing the command below into your terminal.

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

## Backend

Clone the backend using the below command
```
git clone https://github.com/chunkingz/Gateways-Backend.git
```

## Development server :sparkles:

In the frontend dir, run `ng s` for a dev server. 

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

---
<br>

## Build for production

- `ng b` to build the project. The build artifacts will be stored in the `dist/` directory.

- `cp dist/* ../backend/public/`


---
<br>

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

---

:bowtie: yours truly
