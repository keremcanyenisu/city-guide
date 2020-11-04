import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { CookieService } from "angular2-cookie/core";
import { AlertifyService } from "./services/alertify.service"; 

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged = localStorage.getItem("isLogged");

    // alert(state.url);
    
    if (state.url == "/register") {
      console.log(logged);
      if (logged == null) {
        return true;
      }
  
      this.router.navigate(["city"]);
      this.alertifyService.error("Zaten Giriş Yaptınız.");
  
      return false;
    }
 
    else if (state.url == "/cityAdd"){
      if (logged != null) {
        return true;
      }
  
      this.router.navigate(["city"]);
      this.alertifyService.error("Şehir Eklemek için Giriş Yapmalısınız!");
  
      return false;
    }
 
    else if (state.url == "/passwordReset"){
      if (logged != null) {
        return true;
      }
  
      this.router.navigate(["city"]);
      this.alertifyService.error("Bir Hata ile karşılaşıldı.");
  
      return false;
    }
  
  }
}
