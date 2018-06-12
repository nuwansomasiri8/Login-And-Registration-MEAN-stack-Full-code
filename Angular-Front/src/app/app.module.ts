import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PhoneComponent } from './components/phone/phone.component';
import { LaptopComponent } from './components/laptop/laptop.component';
import { TabletComponent } from './components/tablet/tablet.component';
import { SmartwatchComponent } from './components/smartwatch/smartwatch.component';
import { AddpostComponent } from './components/addpost/addpost.component';

import { AuthService } from './services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';




const applicationRoutes:Routes = [
    
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'profile',component:ProfileComponent},
    {path:'phone',component:PhoneComponent},
    {path:'laptop',component:LaptopComponent},
    {path:'tablet',component:TabletComponent},
    {path:'smartwatch',component:SmartwatchComponent},
    {path:'addpost',component:AddpostComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PhoneComponent,
    LaptopComponent,
    TabletComponent,
    SmartwatchComponent,
    AddpostComponent,
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(applicationRoutes),
    FlashMessagesModule
    
  ],
  providers: [AuthService, FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
