import { Component, OnInit } from "@angular/core";
import { City } from "../models/city";
import { CityService } from "../services/city.service";
import { Location } from "@angular/common"; 
import { Router, NavigationEnd } from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.css"],
  providers: [CityService]
})
export class CityComponent implements OnInit {
  constructor(private cityService: CityService, private location: Location,private router: Router) {}

  cities: City[] = [];
  ngOnInit() { 
    this.getCities();
    this.ModalClose();
  }
  
  ModalClose(){
    $(document).ready(function(){  
        $( "#closeModal" ).trigger( "click" );   //modal ı kapatır sıfırlama sonrası.. 
    });
  }

  getCities() {
    return this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });
  }
}
