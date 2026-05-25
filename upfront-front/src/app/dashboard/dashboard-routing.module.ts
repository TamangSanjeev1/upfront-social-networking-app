import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {authGuard} from "../core/guards/auth.guard";

const routes: Routes = [{
  path: '', component: LandingComponent, canActivate: [authGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
