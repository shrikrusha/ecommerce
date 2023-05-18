import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router'
import { SignUp } from '../data-type';



@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit{
  showLogin = false;
  authError:string = '';
  constructor(private sellerService:SellerService, private router:Router){}
  ngOnInit(){
    this.sellerService.reloadSeller();
   
  }
  signup(data:SignUp):void{
    this.sellerService.userSignUp(data)
  }
  login(data:SignUp):void{
    this.sellerService.userLogin(data);
    this.sellerService.isLoginError.subscribe((error)=>{
      if(error){
        this.authError = "Email or Password is not correct"
      }
    })
  }
  openLogin(){
    this.showLogin= true;
  }
  openSignup(){
    this.showLogin= false;
  }
}
