import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { error } from 'console';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.scss'
})
export class BuyerDashboardComponent implements OnInit{
  all_products:any;
  show_checkout:boolean=false;

  constructor(private router:Router, private customerService:CustomerService){}
ngOnInit(): void {
  this.geALlProduct();
}

geALlProduct(){
  this.customerService.allProduct().subscribe(data=>{
    this.all_products=data;
  },error=>{
    console.log("my error", error)
  })
}

buyProduct(id:number){
  this.show_checkout=true;
  this.customerService.quickBuyProduct(id);
  this.router.navigateByUrl('/checkout')
}

addToCart(){
  alert('This is showcase')
}
}
