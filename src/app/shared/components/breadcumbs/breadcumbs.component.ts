import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconModule } from '../../icon.module';

@Component({
  selector: 'app-breadcumbs',
  standalone: true,
  imports: [CommonModule,IconModule],
  templateUrl: './breadcumbs.component.html',
  styleUrl: './breadcumbs.component.scss'
})
export class BreadcumbsComponent implements OnInit{
  @Input() breadcrumbItems: Array<{ label: string, path: string }> = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.breadcrumbItems.length === 0) {
      // You can dynamically generate breadcrumb based on the route path
      this.setBreadcrumbsFromRoute();
    }
  }

  setBreadcrumbsFromRoute(): void {
    const urlSegments = this.router.url.split('/');
    let path = '';
    this.breadcrumbItems = urlSegments.map((segment, index) => {
      path += `/${segment}`;
      return { label: segment, path: path };
    }).filter(item => item.label); // Avoid empty segments
  }

  navigateTo(breadcrumb: any): void {
    this.router.navigate([breadcrumb.path]);
  }
}
