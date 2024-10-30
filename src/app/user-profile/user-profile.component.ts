import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  userForm!: FormGroup;
  user_Id: any;
  languages = ["English", "Hindi", "Marathi"];
  selectedImage: string | ArrayBuffer | null = null; // To store the base64 image

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      addLine1: ['', Validators.required],
      addLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: [[], this.requiredArrayValidator],
      gender: ['', Validators.required],
      aboutYou: [''],
      uploadPhoto: [''], // Field to store base64 photo
    });
  }

  requiredArrayValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (Array.isArray(value) && value.length > 0) {
      return null; // Valid
    }
    return { required: true }; // Invalid
  }

  ngOnInit(): void {
    this.user_Id = this.storageService.getSessionStorageItem('user_session_id');
    if(this.user_Id){
      this.getUserInfo();
    }
    
  }

  onLanguageChange(event: any): void {
    const selectedLanguages = this.userForm.get('language')?.value || [];
    const language = event.target.value;

    if (event.target.checked) {
      if (!selectedLanguages.includes(language)) {
        selectedLanguages.push(language);
      }
    } else {
      const index = selectedLanguages.indexOf(language);
      if (index > -1) {
        selectedLanguages.splice(index, 1);
      }
    }

    this.userForm.get('language')?.setValue([...selectedLanguages]);
    this.userForm.get('language')?.updateValueAndValidity();
  }

  getUserInfo() {
    this.userService.singleUser(this.user_Id).subscribe(
      (data) => {
        const userData = data[0];
        this.userForm.patchValue({
          name: userData?.name,
          mobNumber: userData?.mobNumber,
          email: userData?.email,
          password: userData?.password,
          age: userData?.age,
          dob: userData?.dob,
          addLine1: userData?.address?.addLine1 || '',
          addLine2: userData?.address?.addLine2 || '',
          city: userData?.address?.city || '',
          state: userData?.address?.state || '',
          zipCode: userData?.address?.zipCode || '',
          gender: userData?.gender,
          agreetc: userData?.agreetc,
          language: userData?.language || [],
          aboutYou: userData?.aboutYou,
          uploadPhoto: userData?.uploadPhoto || ''
        });

        // If photo exists, set it to the selectedImage variable for preview
        this.selectedImage = userData?.uploadPhoto || null;
      },
      (error) => {
        console.log('Error fetching user data:', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result; // Base64 image string
        this.userForm.patchValue({
          uploadPhoto: this.selectedImage, // Set the base64 image in the form
        });
      };
      reader.readAsDataURL(file); // Convert image to base64 format
    }
  }

  onSubmitSignUp(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      const formattedData = {
        name: formValue.name,
        mobNumber: formValue.mobNumber,
        age: formValue.age,
        dob: formValue.dob,
        email: formValue.email,
        password: formValue.password,
        address: {
          addLine1: formValue.addLine1,
          addLine2: formValue.addLine2,
          city: formValue.city,
          state: formValue.state,
          zipCode: formValue.zipCode,
        },
        language: formValue.language,
        gender: formValue.gender,
        aboutYou: formValue.aboutYou,
        uploadPhoto: formValue.uploadPhoto, // Base64 photo string
        id: '1',
      };

      this.userService.editUser(this.user_Id, formattedData).subscribe(
        (res) => {
          this.getUserInfo();
        },
        (error) => console.log('Error updating user:', error)
      );

      console.log('Formatted Sign Up Data:', formattedData);
    } else {
      console.error('Sign Up Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }
}
