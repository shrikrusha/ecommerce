import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { IconModule } from '../../../shared/icon.module';
import { AdminSidebarComponent } from '../../../shared/layouts/admin-sidebar/admin-sidebar.component';
import { AdminDashboardContentComponent } from '../../../admin/admin-dashboard/admin-dashboard-content/admin-dashboard-content.component';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,IconModule,AdminSidebarComponent,AdminDashboardContentComponent,RouterLink,RouterOutlet],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class SellerDashboardComponent implements OnInit{
  order_dashboard_data:any;
  total_order:any;
  last_order_date:any;
  product_dashboard_Data:any;
  total_product:number=0;
  publish_product:number=0;
  inactive_product:number=0;
  draft_product:number=0;
  constructor(private customerService:CustomerService, private router:Router){}
  ngOnInit(): void {
    this.sellerOrderDashboardData();
    this.sellerProductDashboardData();
  }

  sellerProductDashboard(){
    this.router.navigateByUrl("/seller/product")
  }
  
  sellerOrderDashboard(){
    alert("this option for only vip candidate")
  }

  sellerOrderDashboardData(){
    this.customerService.orderDashboardData().subscribe(data=>{
      this.order_dashboard_data=data;
      console.log("order dashboard data",this.order_dashboard_data);
      this.total_order=Number(this.order_dashboard_data.length);
      this.last_order_date=this.order_dashboard_data[this.total_order - 1].dateTime;
    },error=>{
      console.log(error)
    })
  }

  sellerProductDashboardData(){
    this.customerService.productDashboardData().subscribe(data=>{
      this.product_dashboard_Data=data;
      for(status in this.product_dashboard_Data){
        console.log(this.product_dashboard_Data[status].status)
        if(this.product_dashboard_Data[status].status=='publish'){
          ++this.publish_product;
        }else if(this.product_dashboard_Data[status].status=='inactive'){
          ++this.inactive_product;
        }else if(this.product_dashboard_Data[status].status=='draft'){
          ++this.draft_product;
        }
        ++this.total_product;
      }
    },error=>{
      console.log(error)
    })
  }
}
