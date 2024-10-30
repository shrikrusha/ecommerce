import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-widget',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './price-widget.component.html',
  styleUrl: './price-widget.component.scss'
})
export class PriceWidgetComponent {

}
