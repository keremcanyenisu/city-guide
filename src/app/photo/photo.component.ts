import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Photo } from "../models/photo";
import { PhotoService } from "../services/photo.service";
import * as $ from "jquery";

const baseUrl = "http://localhost:44384/api/";

@Component({
  selector: "app-photo",
  templateUrl: "./photo.component.html",
  styleUrls: ["./photo.component.css"],
  providers: [PhotoService]
})
export class PhotoComponent implements OnInit {
  constructor(
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private authService: AuthService
  ) {}

  _userName: string = localStorage.getItem("isLogged");
  photos: Photo[] = [];
  hasBaseDropZoneOver = false;
  currentMain: Photo;
  currentCity: any;
  uploader: FileUploader;
  imageUrl: string = "../../assets/img/upload.png";
  fileToUpluad: File = null;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.currentCity = params["cityId"];
    });
  }

  startLoadingSpinner() { 
    $("#loadingSpinner").css("display", "block");
  }

  closeLoadingSpinner(){
    $("#loadingSpinner").css("display", "none");
  }
  
  handeleFileInput(File: FileList) { 
    this.fileToUpluad = File.item(0);
    const size = File.item(0).size; 
    if(size > 111111){
      alert("Resim 3mb tan büyük !");
      return false;
    }
    //Show image preview
    var reader = new FileReader();  
    reader.onerror = (event: any) => {  
    };
    reader.onload = (event: any) => {
      console.log(event);
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpluad);
  }

  OnSubmit(Description, Image) {
    this.photoService
      .postFile(
        Description.value,
        this.fileToUpluad,
        this.currentCity,
        this._userName
      )
      .subscribe(
        data => {
          console.log(data);
          Description.value = null;
          Image.value = null;
          location.reload();  //resim yükledikten sonra sayfa yenilensin ki eklenen foto görülsün.
        },
        error => {
          this.alertifyService.error(error.error.toString());
        }
      );
  }

  //tamamen ng2-file-uploader dökümantasyonu doğrultusunda ilerliyoruz...
  initializeUploader() {
    this.uploader = new FileUploader({
      url: baseUrl + "cities/" + this.currentCity + "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024 //,
      //headers: [{name:'Accept-Type', value:'application/json'}],
    });
  }
}
