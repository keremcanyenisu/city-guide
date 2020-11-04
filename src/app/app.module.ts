import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import {
  NgbPaginationModule,
  NgbAlertModule
} from "@ng-bootstrap/ng-bootstrap";
import "hammerjs";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { appRoutes } from "./routes";
import { CityDetailComponent } from "src/app/city/city-detail/city-detail.component";
import { CityAddComponent } from "src/app/city/city-add/city-add.component";
import { NgxGalleryModule } from "ngx-gallery";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertifyService } from "./services/alertify.service";
import { NgxEditorModule } from "ngx-editor";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { MatSelectModule } from "@angular/material/select";
import { AngularFontAwesomeModule } from "angular-font-awesome";
 
import { FileUploadModule } from 'ng2-file-upload';
import { PendingChangesGuard } from "./guards/pending-changes.guard";
import { LoginGuard } from "./login.guard";
import { AppComponent } from "./app.component";
import { ValueComponent } from "./value/value.component";
import { NavComponent } from "./nav/nav.component";
import { CityComponent } from "./city/city.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgotPassword/forgotPassword.component";
 
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from "angular-6-social-login";
import { MyNgbDateParserFormatter } from "./myNgbDateParserFormatter";
import { PhotoComponent } from "./photo/photo.component";

import { Ng2SmartTableModule } from 'ng2-smart-table';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("184486052426992")
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        "956333637307-im5h9a2ov72ob4ensv56et47qibbidea.apps.googleusercontent.com"
      )
    },
    {
      id: LinkedinLoginProvider.PROVIDER_ID,
      provider: new LinkedinLoginProvider("77j10whdck8cwd")
    }
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    CityComponent,
    CityDetailComponent,
    CityAddComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbModule.forRoot(),
    NgbPaginationModule,
    NgbAlertModule,
    MatSelectModule,
    NoopAnimationsModule,
    AngularFontAwesomeModule,
    SocialLoginModule,
    Ng2SmartTableModule,
    FileUploadModule
  ],
  providers: [
    AlertifyService,
    CookieService,
    LoginGuard,
    PendingChangesGuard,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    {
      provide: NgbDateParserFormatter,
      useFactory: () => new MyNgbDateParserFormatter("longDate")
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
