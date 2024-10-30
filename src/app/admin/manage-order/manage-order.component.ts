import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreadcumbsComponent } from '../../shared/components/breadcumbs/breadcumbs.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [CommonModule,BreadcumbsComponent,MatPaginatorModule,MatTableModule],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss'
})
export class ManageOrderComponent implements OnInit,AfterViewInit{
  breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Order', path: '' },
    // { label: 'Products', path: '/products' }
  ];

  allOrders:any;
  displayedColumns: string[] = ['productId','productName', 'productDescription','sellerName','buyerName','buyerMobile', 'orderDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.getAllOrders();
  }
  ngAfterViewInit(): void {
    // Link the paginator with the dataSource after the view initializes
    this.dataSource.paginator = this.paginator;
  }
  getAllOrders() {
    this.orderService.allOrders().subscribe(
      (data) => {
        this.allOrders = data;
        this.dataSource.data = this.allOrders;
      },
      (error) => {
        console.log('Error fetching users:', error);
      }
    );
  }

}
