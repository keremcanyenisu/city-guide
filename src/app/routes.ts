import { CityComponent } from "./city/city.component";
import { ValueComponent } from "./value/value.component";
import {Routes} from "@angular/router"
import { CityDetailComponent } from "src/app/city/city-detail/city-detail.component";
import { CityAddComponent } from "src/app/city/city-add/city-add.component";
import { RegisterComponent } from "./register/register.component";
import { LoginGuard } from "./login.guard";
import { PendingChangesGuard } from "./guards/pending-changes.guard";
import { ForgotPasswordComponent } from "./forgotPassword/forgotPassword.component"; 
import { NavComponent } from "./nav/nav.component";

export const appRoutes : Routes  = [
  { path: "forgotPassword/:Val", component: ForgotPasswordComponent },
  { path: "register", component: RegisterComponent ,canActivate:[LoginGuard] },
  { path: "city", component: CityComponent },
  { path: "cityAdd", component: CityAddComponent ,canActivate:[LoginGuard] }, //,canDeactivate:[PendingChangesGuard] 
  { path: "value", component: ValueComponent },
  { path: "cityDetail/:cityId", component: CityDetailComponent },
  { path: "**", redirectTo: "city", pathMatch: "full" }
];
