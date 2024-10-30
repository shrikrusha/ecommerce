import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { BreadcumbsComponent } from '../../shared/components/breadcumbs/breadcumbs.component';


@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,MatPaginatorModule,MatTableModule,BreadcumbsComponent],
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss'] 
})
export class UserCrudComponent implements OnInit,AfterViewInit {
  all_user_data: any;
  displayedColumns: string[] = ['name', 'email', 'mobNumber', 'city', 'role', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'User', path: '' },
    // { label: 'Products', path: '/products' }
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fb: FormBuilder, private adminService: AdminService,private router:Router) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  ngAfterViewInit(): void {
    // Link the paginator with the dataSource after the view initializes
    this.dataSource.paginator = this.paginator;
  }


  getAllUser() {
    this.adminService.allUser().subscribe(
      (data) => {
        this.all_user_data = data;
        this.dataSource.data = this.all_user_data;
      },
      (error) => {
        console.log('Error fetching users:', error);
      }
    );
  }


  addUser() {
    this.router.navigateByUrl('admin/add-user')
  }

  editUser(user_id: any) {
    this.router.navigate(['admin/edit-user',user_id])
  }

  deleteUser(user_id: any) {
    let conf = confirm("Do you want to delete this user id" +user_id)
    if(conf){
      this.adminService.deleteUser(user_id).subscribe(
        (res) => {
          this.getAllUser();
        },
        (error) => console.log('Error deleting user:', error)
      );
    }else{
      alert("You pressed cancel !")
    }
    
  }

}
