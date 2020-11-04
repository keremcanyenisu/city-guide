import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "../../../node_modules/@angular/router";
import { ResetUserGenerate } from "../models/ResetUserGenerate";
import * as $ from 'jquery';


@Component({
  selector: "app-forgotPassword",
  templateUrl: "./forgotPassword.component.html",
  styleUrls: ["./forgotPassword.component.css"],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resetForm: FormGroup;
  resetUserGenerate:ResetUserGenerate;
  resetGenerateArray =  new ResetUserGenerate(); 

  ngOnInit() { 
    this.activatedRoute.params.subscribe(params => {
      this.getUserExist(params["Val"]); 
    });
    this.createUserForms();   
    this.modalOpenAuto();
  }
  
  modalOpenAuto(){
    $(document).ready(function(){ 
        $( "#btnResetPwd" ).trigger( "click" );   //modal ı otomatik açar.. 
    });
  }
  getUserExist(Val) {    
    this.resetGenerateArray.eMail=Val;
    this.authService.userExist(this.resetGenerateArray); 
  }

  createUserForms() {
    this.resetForm = this.formBuilder.group(
      {
        eMail:[""],
        password: [
          "",
          [
            Validators.required,
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

  resetPwd(){  
    if (this.resetForm.valid) {   
      this.resetForm.value["eMail"] = this.router.url.slice(16,this.router.url.length);
      this.resetUserGenerate = Object.assign({}, this.resetForm.value); 
      this.authService.resetUserPassword(this.resetUserGenerate);
    }
  }
 
    openVerticallyCentered(content) {
      this.modalService.open(content, { centered: true });
  }
}
 