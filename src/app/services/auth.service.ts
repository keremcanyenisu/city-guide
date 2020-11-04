import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginUser } from "../models/loginUser";
import { RegisterUser } from "../models/registerUser";
import { ResetUser } from "../models/resetUser";
import { ResetUserGenerate } from "../models/ResetUserGenerate";
import { HttpHeaders } from "../../../node_modules/@angular/common/http";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router, NavigationEnd } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { CookieService } from "angular2-cookie/core";
import { Observable } from "../../../node_modules/rxjs";
import { UserProp } from "../models/userProp";
import { validateConfig } from "../../../node_modules/@angular/router/src/config";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  path = "https://localhost:44384/api/auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";
  loginUserName: string = "";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/Json");
    this.httpClient
      .post(this.path + "login", loginUser, { headers: headers })
      .subscribe(
        data => {
          this.saveToken(data);
          this.userToken = data;
          this.decodedToken = this.jwtHelper.decodeToken(data.toString());
          localStorage.setItem("isLogged", loginUser.userName); 
          this.cookieService.remove("loginUserName");
          this.cookieService.put(
            "loginUserName",
            this.decodedToken.unique_name
          );
          console.log(this.cookieService.get("loginUserName"));
          this.loginUserName = this.cookieService.get("loginUserName");
          this.alertifyService.success(
            "'" +
              this.cookieService.get("loginUserName").toUpperCase() +
              "'  Kullanıcısı ile Sisteme giriş yapıldı"
          );
          this.router.navigateByUrl("/city");
        },
        error => {
          this.alertifyService.warning(error.error.toString());
        }
      );
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "register", registerUser, { headers: headers })
      .subscribe(
        data => {
          // to do
          this.router.navigateByUrl("/city");
          this.alertifyService.success("Başarılı Bir Şekilde Kayıt Oldunuz..");
        },
        error => {
          // to do
          this.alertifyService.warning(error.error.toString());
          console.log(error.userName);
        }
      );
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem("isLogged");
    this.alertifyService.error("Sistemden çıkış yapıldı");
    this.router.navigate(["city"]);
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }

  logName() {
    return localStorage.getItem("isLogged");
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId() {
    alert("Hoşgeldin "+this.jwtHelper.decodeToken(this.token).userName);
    return this.jwtHelper.decodeToken(this.token).nameid; 
  }

  userProp(): Observable<UserProp[]> {
    return this.httpClient.get<UserProp[]>(this.path + "UserProp");
  }

  resetPassword(resetUser: ResetUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "reset", resetUser, { headers: headers })
      .subscribe(
        data => {
          // to do
          this.router.navigateByUrl("/city");
          // this.alertifyService.success("Şifre sıfırlama linkiniz başarılı bir şekilde mail adresinize gönderildi.");
          this.alertifyService.success(data.toString());
        },
        error => {
          // to do
          this.alertifyService.warning(error.error.toString());
        }
      );
  }

  resetUserPassword(resetUserGenerate: ResetUserGenerate) {
    // generate link e tıklayarak gelinen method..
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "resetUserPassword", resetUserGenerate, {
        headers: headers
      })
      .subscribe(
        data => {
          // to do
          this.router.navigateByUrl("/city");
          // this.alertifyService.success("Şifre sıfırlama linkiniz başarılı bir şekilde mail adresinize gönderildi.");
          this.alertifyService.success(data.toString());
        },
        error => {
          // to do
          this.alertifyService.warning(error.error.toString());
        }
      );
  }

  userExist(resetUserGenerate: ResetUserGenerate) { 
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "decodingMailExist", resetUserGenerate, { headers: headers })
      .subscribe(
        data => {
          // to do
          // this.alertifyService.success("Şifre sıfırlama linkiniz başarılı bir şekilde mail adresinize gönderildi.");
          this.alertifyService.success(data.toString());
        },
        error => {
          // to do
          this.alertifyService.warning(error.error.toString());
          this.router.navigateByUrl("/city");
        }
      );
  }
}
