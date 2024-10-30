import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BannerComponent } from '../../shared/components/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent {

}
