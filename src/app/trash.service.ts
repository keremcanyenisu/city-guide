import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrashService {

constructor() { }

// ------Auth Service  --------- //
// setCookieForgotPwd(eMail:any){  
//   if(eMail.toString() !==""){
//     this.cookieService.put(
//       "forgotMail",eMail
//     );
//   }
// }

// removeCookieForgotPwd(){ 
//   alert("forgota mail cookie kaldırıldı..");
//   this.cookieService.remove(
//     "forgotMail"
//   );
// }


// ------ App Component.ts  --------- //
// removeCookies(){
//   alert("app-component remove cookies");
//   this.authService.removeCookieForgotPwd();  
// } 

// setCookie(){
//   this.authService.setCookieForgotPwd("");
// }

// cookieForgotPwd(){   
//   alert("nav-component set cookies");
//   if(this.cookieService.get("forgotMail") != undefined){   
//     //navbar ı kapatması  için.. reset password modal ı çalışıyor çünkü
//     alert("navbar false oldu..");
//     this.showNavbar=false;
//   }
//   else{
//     alert("navbar true oldu..");
//     this.showNavbar=true;
//   } 
// }



// // ------ forgot Password Component.ts  --------- //
// setCookie(){
//   var _decodeEmail = this.router.url.slice(16,this.router.url.length);  //sadece mail kısmını alıyoruz..
//   // TO DO !!
//   // bu mail url sini değiştirmiş olmasına karşın bir userExist kontrol methodu eklenicek.
//   this.authService.setCookieForgotPwd(_decodeEmail);
// }

//}


// import { AuthService as SocialAuthService } from 'angular2-social-login'

// facebookLoginFunction(){
//   this.sub = this.socialAuthService.login("facebook").subscribe(data=>{
//     console.log(data);
//     alert(JSON.stringify(data));
//     this.user=data;
//     this.router.navigateByUrl("/city");
//   },
//   error=>{

//   }
// )
// } 

// googleLoginFunction(){ 
//   this.sub = this.socialAuthService.login("google").subscribe(data=>{
//     console.log(data);
//     alert(JSON.stringify(data));
//     this.user=data;
//     this.router.navigateByUrl("/city");
//   },
//   error=>{

//   }
// )    
} 