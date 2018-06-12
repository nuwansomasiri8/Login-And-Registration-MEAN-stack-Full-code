import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user_name:String;
  shop_name:String;
  shop_address:String;
  registration_no:String;
  phone_no:String;
  email:String;
  password:String;

  constructor(
      private authService:AuthService,
      private flashMessage:FlashMessagesService,
      private router:Router

  ) { }

  ngOnInit() {
  }

  registerData(){
    
    const user = {
       user_name:this.user_name,
       shop_name:this.shop_name,
       shop_address:this.shop_address,
       registration_no:this.registration_no,
       phone_no:this.phone_no,
       email:this.email,
       password:this.password
    };

    this.authService.registerUser(user).subscribe(res=>{
       if(res.state) {
            this.flashMessage.show("You're Registered Successfully" , { cssClass: 'alert-success', times:3000});
            this.router.navigate(['/login']);
       }else {
            this.flashMessage.show("Something Went Wrong" , { cssClass: 'alert-success', times:3000});
            this.router.navigate(['/register']);
       }
       
    });

    
  }

}
