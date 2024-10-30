import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit {
  signInFormValue:any;
  userData:any;
  constructor(private router:Router, private loginservice:LoginSignupService){}
  ngOnInit(): void {
    
  }

}
