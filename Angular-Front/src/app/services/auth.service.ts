import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenIsPresent } from 'ng2-bearer';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any;
  authtoken:any;
  authuser:any;
  authname:any;

  constructor(
     private http:Http,
     private router:Router

  ) { }

  registerUser(user){

     let headers = new Headers();
     headers.append('Content-Type','application/json');
     return this.http.post("http://localhost:3000/user/register",user,{headers:headers}).pipe(map(res=>res.json()));

  }

  loginUser(user){
     
     let headers = new Headers();
     headers.append('Content-Type','application/json');
     return  this.http.post("http://localhost:3000/user/login",user,{headers:headers}).pipe(map(res=>res.json()));

  }


  getProfile(){

     this.fetchToken();
     let headers = new Headers({"Authorization": this.authtoken}) 
     let options = new RequestOptions({ headers: headers}); 
     return this.http.get("http://localhost:3000/user/profile",options).pipe(map(res=>res.json()));

  }


  fetchToken(){
     const token = localStorage.getItem("tokenid");
     this.authtoken = token;

  }

  getName(){
    
       const person = localStorage.getItem("user");
       if(person != null){
           this.authuser = JSON.parse(person);
           this.authname = this.authuser.user_name;
           return this.authname;
       }  
       

  }

  storeData(token,userdata){

     localStorage.setItem("tokenid",token);
     localStorage.setItem("user",JSON.stringify(userdata));
     this.authtoken = token;
     this.user = userdata;

  }

  logout(){

     this.authtoken = null;
     this.user = null;
     localStorage.clear();

  }

  

  loggedIn() {
    this.fetchToken();
    if(this.authtoken != null ){
       return true;
    }

  }


}
