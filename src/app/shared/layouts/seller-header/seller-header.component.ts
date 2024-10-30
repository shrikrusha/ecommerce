import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-seller-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './seller-header.component.html',
  styleUrl: './seller-header.component.scss'
})
export class SellerHeaderComponent implements OnInit{
  role: string | null = '';
  profilePhoto!: string | null;
  username!: string | null;
  constructor(private storageService: StorageService,private router: Router){}
ngOnInit(): void {
    this.role = this.storageService.getSessionStorageItem("role");
    this.profilePhoto = this.storageService.getSessionStorageItem("profile_photo");
    this.username = this.storageService.getSessionStorageItem("username")
}
logout(): void {
  this.storageService.removeSessionStorageItem("user_session_id");
  this.storageService.removeSessionStorageItem("role");
  this.storageService.removeSessionStorageItem("username");
  this.storageService.removeSessionStorageItem("profile_photo");
  this.router.navigateByUrl("/sign-in");
}
}
