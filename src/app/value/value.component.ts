import { Component, OnInit, NgZone } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Value } from "../models/value";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs";
import { RequestOptions } from "../../../node_modules/@angular/http";
import { PhotoService } from "../services/photo.service";
import { AlertifyService } from "../services/alertify.service";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import * as $ from "jquery";
import * as Winwheel from "Winwheel";

@Component({
  selector: "app-value",
  templateUrl: "./value.component.html",
  styleUrls: ["./value.component.css"],
  providers: [PhotoService]
})
export class ValueComponent implements OnInit {
  constructor(
    private Http: HttpClient,
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone
  ) {
    window["angularComponent"] = {   //javasciptten çağırılmasını sağlar..
      runThisFunctionFromOutside: this.runThisFunctionFromOutside,
      zone: zone
    };
  }

  runThisFunctionFromOutside(_value: any) {
    alert(_value);   // burada wheel dan gelen değer ile ekranda o kafenin verilerini göstereceğiz..
  }

  http: HttpClient;
  registerTestForm: FormGroup;
  Values: Value[] = [];
  test: object[] = [];

  ngOnInit() {
    this.getValues().subscribe(data => {
      this.Values = data;
    });
    this.createRegisterForm();
    this.testScript();
  }

  testScript() {
    this.test.push({ name: "ahmet", type: "Türk" });
    this.test.push({ name: "kerem", type: "Türk" });
    // alert(this.test[0].name);
  }

  createRegisterForm() {
    this.registerTestForm = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        password: [
          "",
          [
            Validators.required, //birden fazla gönderimler için [] dizi aç kapa.
            Validators.minLength(4),
            Validators.maxLength(8)
          ]
        ],
        confirmPassword: ["", Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }

  //Authorize ile token olmadan olmaz diyor :)
  getValues() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    return this.Http.get<Value[]>("https://localhost:44384/api/values", {
      headers: headers
    });
  }

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };

  data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    
    // ... list of items
    
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];

}
