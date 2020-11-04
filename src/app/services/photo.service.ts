import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { City } from "src/app/models/city";
import { Photo } from "src/app/models/photo";
import { AlertifyService } from "./alertify.service";
import { Router } from "@angular/router"; 

@Injectable({
  providedIn: "root"
})
export class PhotoService {
  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}
 
 
  path = "https://localhost:44384/api/";
  photos: Photo[] = [];

  postFile(description:string,fileToUpload:File,cityId:number,userName:string){  
    const endpoint = this.path + 'cities/'+cityId+'/'+userName+'/photos';
    const formData : FormData =  new  FormData();
    formData.append('File',fileToUpload,fileToUpload.name);  //Image
    formData.append('Description',description);  //ImageCaption
    var _photo = this.httpClient.post(endpoint,formData);
    console.log(_photo);
    return _photo;
  }

} 