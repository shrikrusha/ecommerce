import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcumbsComponent } from '../../../shared/components/breadcumbs/breadcumbs.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [CommonModule,BreadcumbsComponent,ReactiveFormsModule],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss'
})
export class AddEditUserComponent implements OnInit{
  userId:any;
  pagetitle!:string;
  userForm!: FormGroup;
  breadcrumbItems!: any[];
  photoPreview: string | ArrayBuffer | null = null;  // For photo preview
  constructor(private route:ActivatedRoute,private fb: FormBuilder,private adminService:AdminService, private router:Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
      this.userId=param.get('id')

      if (this.userId) {
        this.pagetitle = 'Update a User'
        this.breadcrumbItems = [
          { label: 'Home', path: '/' },
          { label: 'Users', path: '/admin/users' },
          { label: 'Edit User', path: `admin/edit-user/${this.userId}` },
        ];
        this.loadUserData();
      } else {
        this.pagetitle = 'Add a new User'
        this.breadcrumbItems = [
          { label: 'Home', path: '/' },
          { label: 'Users', path: '/admin/users' },
          { label: 'Add User', path: 'admin/add-user' },
        ];
      }
    })

    this.userForm = this.fb.group({
      name: [null, Validators.required],
      mobNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: [18, [Validators.required, Validators.min(18)]],
      dob: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      address: this.fb.group({
        addLine1: [null, Validators.required],
        addLine2: [null],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, [Validators.required, Validators.pattern('^[0-9]{6}$')]]
      }),
      language: [[], Validators.required],
      gender: ['Male', Validators.required],
      aboutYou: [null],
      uploadPhoto: [],
      role: ['admin']
    });
  }

 // Fetch user data if editing
 loadUserData() {
  if (this.userId) {
    this.adminService.singleUser(this.userId).subscribe(
      (res) => {
        this.userForm.patchValue(res[0]);
        if (res[0].uploadPhoto) {
          this.photoPreview = res[0].uploadPhoto;  // Show existing photo preview
        }
      },
      (error) => {
        console.log('Error fetching user data:', error);
      }
    );
  }
}
onSubmit() {
  if (this.userForm.invalid) return;

  const formValue = this.userForm.value;
  const formattedData = {
    ...formValue,
    address: {
      addLine1: formValue.address.addLine1,
      addLine2: formValue.address.addLine2,
      city: formValue.address.city,
      state: formValue.address.state,
      zipCode: formValue.address.zipCode
    }
  };

  // Call the appropriate API based on the user action
  if (this.userId) {
    // Edit User
    this.adminService.editUser(this.userId, formattedData).subscribe(
      (res) => {
        this.router.navigateByUrl('admin/users');
        console.log("User updated successfully");
      },
      (error) => {
        console.log('Error updating user:', error);
      }
    );
  } else {
    // Add User
    this.adminService.addUser(formattedData).subscribe(
      (res) => {
        this.router.navigateByUrl('admin/users');
        console.log("User added successfully");
      },
      (error) => {
        console.log('Error adding user:', error);
      }
    );
  }
}
 // Convert file to base64 and display preview
 handleFileUpload(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photoPreview = e.target.result;  // For photo preview
      this.userForm.patchValue({
        uploadPhoto: e.target.result  // Save base64 in the form control
      });
    };
    reader.readAsDataURL(file);  // Convert file to base64
  }
}
}
