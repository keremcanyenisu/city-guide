import { Component, OnInit, Injectable } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from "angular-6-social-login";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import {
  NgbDate,
  NgbDateStruct,
  NgbCalendar,
  NgbDatepickerI18n,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import * as $ from "jquery";

import { UserProp } from "../models/userProp";
import { Gender } from "../models/gender";
import { Occupation } from "../models/occupation";
import { References } from "../models/references";
import { Router, NavigationEnd } from "@angular/router";

const now = new Date();
const I18N_VALUES = {
  fr: {
    weekdays: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
    months: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Aou",
      "Sep",
      "Oct",
      "Nov",
      "Déc"
    ]
  },
  // other languages you would support
  tr: {
    weekdays: ["Pzt", "Salı", "Çarş", "Perş", "Cuma", "Cmt", "Pzr"],
    months: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık"
    ]
  }
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = "tr";
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {

    return `${date.day}-${date.month}-${date.year}`;
  }
}

const propGender = [];
const propOccupation = [];
const propReference = [];

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
  ]
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public socialAuthService: SocialAuthService,
    private router: Router,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  datePickModel: NgbDateStruct;
  modelDate: string;
  sub: any;
  user: any;

  registerForm: FormGroup;
  loginForm: FormGroup;
  resetForm: FormGroup;
  registerUser: any = {};
  loginUser: any = {};
  resetUser: any = {};
  userProperties: any = {};
  getUserProperties: UserProp;
  gender: Gender[];
  occupation: Occupation[];
  reference: References[];
  minDate = { year: 1950, month: 1, day: 1 };
  maxDate = { year: 2025, month: 1, day: 1 };

  ngOnInit() {
    this.createUserForms();
    this.userProp(); 
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") { 
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID; 
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      console.log(socialPlatform + " sign in data : ", userData);
      // Now sign-in with userData
      // ...
    });
  }

  userProp() {
    this.authService.userProp().subscribe(
      data => {
        this.userProperties = data;
        console.log(this.userProperties);
        this.getGenders(this.userProperties.genders);
        this.getReferences(this.userProperties.references);
        this.getOccupations(this.userProperties.occupations);

        console.log(this.userProperties.genders);
        console.log(data);
      },
      error => {}
    );
  }
  
  getGenders(res: any) {
    for (let i = 0; i < res.length; i++) {
      propGender.push({
        id: res[i].id,
        name: res[i].name
      });
    }
    this.gender = propGender;
  }

  getOccupations(res: any) {
    for (let i = 0; i < res.length; i++) {
      propOccupation.push({
        id: res[i].id,
        name: res[i].name
      });
    }
    this.occupation = propOccupation;
  }

  getReferences(res: any) {
    for (let i = 0; i < res.length; i++) {
      propReference.push({
        id: res[i].id,
        name: res[i].name
      });
    }
    this.reference = propReference;
  }

  createUserForms() {
    (this.registerForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        surName: ["", Validators.required],
        userName: ["", Validators.required],
        eMail: ["", [Validators.email, Validators.required]], //birden fazla gönderimler için [] dizi aç kapa.
        genderId: ["", Validators.required],
        occupationId: ["", Validators.required],
        referenceId: ["", Validators.required],
        birthDay: ["", Validators.required],
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
    )),
      (this.loginForm = this.formBuilder.group({
        userName: ["", Validators.required],
        password: ["", Validators.required]
      })),
      (this.resetForm = this.formBuilder.group({
        eMail: ["", [Validators.email, Validators.required]]
      }));
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      let _year = this.registerForm.value["birthDay"].year;
      let _month = this.registerForm.value["birthDay"].month;
      let _day = this.registerForm.value["birthDay"].day;
      this.registerForm.value["birthDay"] = _year + "-" + _month + "-" + _day;
      this.registerUser = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registerUser);
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.loginUser = Object.assign({}, this.loginForm.value);
      this.authService.login(this.loginUser);
    }
  }

  reset() {
    if (this.resetForm.valid) {
      this.resetUser = Object.assign({}, this.resetForm.value);
      this.authService.resetPassword(this.resetUser);
    }
  }
 
}
