import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  menuType:string = 'default';
  sellerName:string = '';
  constructor( private router:Router){}

  ngOnInit(): void {
   this.router.events.subscribe((val:any)=>{
    
    if(val.url){
      if(localStorage.getItem('seller') && val.url.includes('seller')){
        console.log('in seller area');
        this.menuType="seller";
        if(localStorage.getItem('seller')){
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
        }
      }
      else{
        console.log('not in seller area');
        this.menuType='default'
      }
    }
   })
  }

  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  
}
