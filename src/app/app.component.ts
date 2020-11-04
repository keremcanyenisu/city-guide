import { Component , OnInit} from '@angular/core';
import { RouterStateSnapshot, Router, NavigationEnd } from "@angular/router";
import { CookieService } from "angular2-cookie/core";
import { AuthService } from './services/auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private cookieService:CookieService,
    private authService:AuthService,
    private route:Router
  ) {}

  showNavbar = true;
  
  ngOnInit() {  

  }
  
  title = 'sehir-rehberi-spa';

}


