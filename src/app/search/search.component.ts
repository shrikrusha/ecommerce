import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  searchResult:undefined|product[];
  constructor(private activatedroute:ActivatedRoute, private productservice:ProductService){

  }
  ngOnInit(): void {
    debugger
    let query=this.activatedroute.snapshot.paramMap.get('query');
    console.log(query, this.activatedroute.url);
    query && this.productservice.searchProduct(query).subscribe((result)=>{
      this.searchResult=result;
    })
  }
}
