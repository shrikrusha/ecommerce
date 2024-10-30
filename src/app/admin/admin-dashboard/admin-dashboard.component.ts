import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { IconModule } from '../../shared/icon.module';
import { AdminSidebarComponent } from '../../shared/layouts/admin-sidebar/admin-sidebar.component';
import { AdminDashboardContentComponent } from './admin-dashboard-content/admin-dashboard-content.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,IconModule,AdminSidebarComponent,AdminDashboardContentComponent,RouterLink,RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class AdminDashboardComponent implements OnInit{

user_dasboard_data:any;

total_user:number=0;
admin_user:number=0;
seller_user:number=0;
buyer_user:number=0;

product_dashboard_data:any;
total_product:number=0;
publish_product:number=0;
inactive_product:number=0;
draft_product:number=0;

constructor(private router:Router, private adminService:AdminService){}

ngOnInit(): void {
  this.adminProductDashboard();
  this.adminUserDashboardData();

  if (typeof document !== 'undefined') {
    let container = document.querySelector('.canvas');
    let toggleButton = document.querySelector('.toggle-button');

    toggleButton?.addEventListener('click', (e) => {
      e.preventDefault();
      container?.classList.toggle('show-nav');   

    });
  } else {
    console.warn('document is not available in this environment');
  }
}

userDashboard(){
  this.router.navigateByUrl("/admin/user");
}

productDashboard(){
  this.router.navigateByUrl("/admin/product");
}

adminUserDashboardData(){
  this.adminService.userDashboardData().subscribe(data=>{
    this.user_dasboard_data = data;
    for(let user in this.user_dasboard_data){
      if(this.user_dasboard_data[user].role=='admin'){
        ++this.admin_user;
      }else if(this.user_dasboard_data[user].role=='seller'){
        ++this.seller_user;
      }else if(this.user_dasboard_data[user].role=='buyer'){
        ++this.buyer_user;
      }
      ++this.total_user;
    }
  },error=>{
    console.log("My error",error)
  })
}

adminProductDashboard(){
  this.adminService.productDashboardData().subscribe(data=>{
    this.product_dashboard_data=data;
    for( let status in this.product_dashboard_data){
      if(this.product_dashboard_data[status].status=='publish'){
        ++this.publish_product;
      }else if(this.product_dashboard_data[status].status=='inactive'){
        ++this.inactive_product;
      }else if(this.product_dashboard_data[status].status=='draft'){
        ++this.draft_product;
      }
      ++this.total_product;
    }
  },error=>{
    console.log("My error",error)
  })
}




}
