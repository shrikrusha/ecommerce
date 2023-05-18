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
  constructor(private sellerService:SellerService, private router:Router){}
  ngOnInit(){
    this.sellerService.reloadSeller()
  }
  signup(data:SignUp):void{
    console.log(data);
    this.sellerService.userSignUp(data)
  }
}
