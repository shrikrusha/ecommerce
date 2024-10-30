import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.scss']
})
export class SigninSignupComponent implements OnInit {
  userForm: FormGroup;
  signInForm: FormGroup;
  languages = ["English", "Hindi", "Marathi"];
  isSignUp = true; // Toggle to display Sign Up or Sign In form based on route

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router:Router, private _loginSignupService:LoginSignupService) {
    // Sign Up Form
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
      language: [[], this.requiredArrayValidator],  // Use the custom validator
      gender: ['', Validators.required],
      aboutYou: [''],
      uploadPhoto: [''],
      agreetc: [false, Validators.requiredTrue],
      role: ['user', Validators.required]
    });

    // Sign In Form
    this.signInForm = this.fb.group({
      useremail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
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
    // Determine form to display based on route
    this.route.url.subscribe(urlSegment => {
      this.isSignUp = urlSegment.some(segment => segment.path === 'sign-up');
    });
  }

  onLanguageChange(event: any): void {
    const selectedLanguages = this.userForm.get('language')?.value || [];
    const language = event.target.value;
  
    if (event.target.checked) {
      // Add the language if checked and it's not already in the array
      if (!selectedLanguages.includes(language)) {
        selectedLanguages.push(language);
      }
    } else {
      // Remove the language if unchecked
      const index = selectedLanguages.indexOf(language);
      if (index > -1) {
        selectedLanguages.splice(index, 1);
      }
    }
  
    // Update the form control with the new array and validate
    this.userForm.get('language')?.setValue([...selectedLanguages]);
    this.userForm.get('language')?.updateValueAndValidity();
  }
  

  onSubmitSignUp(): void {
    if (this.userForm.valid) {
      // Map form values to the desired format
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
        language: formValue.language, // Assuming this has been handled by `onLanguageChange()`
        gender: formValue.gender,
        aboutYou: formValue.aboutYou,
        uploadPhoto: formValue.uploadPhoto,
        agreetc: formValue.agreetc,
        role: formValue.role,
        id: '1' // Add static ID or generate dynamically
      };

      this._loginSignupService.userRegister(formattedData).subscribe(data=>{
        alert("User Register Successfully");
        this.router.navigateByUrl('/sign-in')
      })
  
      console.log('Formatted Sign Up Data:', formattedData);
    } else {
      console.error('Sign Up Form is invalid');
      this.userForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }
  
  user_data:any;
  onSubmitSignIn(): void {
    if (this.signInForm.valid) {
      console.log('Sign In Form Data:', this.signInForm.value);
  
      // Call login without hardcoding the role
      this._loginSignupService.login(this.signInForm.value.useremail, this.signInForm.value.password).subscribe(data => {
        this.user_data = data;
  
        // Check if the user exists in the response
        if (this.user_data.length == 1) {
          const user = this.user_data[0];
          sessionStorage.setItem("user_session_id", user.id);
          sessionStorage.setItem("username", user.name);
          sessionStorage.setItem("role", user.role);
          sessionStorage.setItem("profile_photo", user.uploadPhoto); // Dynamically set role
  
          // Navigate based on the user's role
          if (user.role === "seller") {
            this.router.navigateByUrl('/seller/dashboard');
          } else if (user.role === "buyer") {
            this.router.navigateByUrl('');
          } else if (user.role === "admin") {
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            alert("Invalid role, please contact support.");
          }
        } else {
          alert("Invalid login credentials.");
        }
      });
    } else {
      console.error('Sign In Form is invalid');
      this.signInForm.markAllAsTouched(); // Show validation messages
    }
  }
  
}
