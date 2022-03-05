import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddGatewayComponent } from './components/add-gateway/add-gateway.component';
import { GatewayComponent } from './components/gateway/gateway.component';
import { UpdateGatewayComponent } from './components/update-gateway/update-gateway.component';

const routes: Routes = [
  { path:'', component: GatewayComponent },
  { path:'add-gateway', component: AddGatewayComponent },
  { path:'gateway/:id', component: UpdateGatewayComponent },
  { path:'about', component: AboutComponent },
  { path:'**', component: GatewayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
