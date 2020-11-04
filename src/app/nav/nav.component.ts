import { Component, OnInit, DoCheck } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CookieService } from "angular2-cookie/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  loginUser: any = {};
  UserLoginName: string = "";
  noNavbar=true;

  ngOnInit() {
    this.userLog(); 
  }

  userLog() {
    let logged = localStorage.getItem("isLogged");

    console.log("hoşgeldin ",logged);
    if (logged != null) {
      this.UserLoginName = localStorage.getItem("isLogged");
    }
  }

  login() {
    this.authService.login(this.loginUser);
    this.UserLoginName = this.authService.loginUserName;
    this.UserLoginName = localStorage.getItem("isLogged");
  }
  getCookie() {
    console.log(this.cookieService.get("loginUserName"));
  }
  logOut() {
    this.authService.logOut();
  }
  get isAuthenticated() {
    return this.authService.loggedIn();
  }
  get logUserName() {
    return this.authService.logName();
  }

 
}




