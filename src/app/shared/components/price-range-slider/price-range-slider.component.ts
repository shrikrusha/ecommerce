import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-range-slider',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './price-range-slider.component.html',
  styleUrl: './price-range-slider.component.scss'
})
export class PriceRangeSliderComponent {
  @Input() minLimit!: number;
  @Input() maxLimit!: number;
  @Input() minValue!: number;
  @Input() maxValue!: number;
  

  // @Output() sliderValueChanged = new EventEmitter<{
  //   min: number;
  //   max: number;
  // }>();

  cValue!: number;
  sliderKey!: string;
  constructor(private cdr: ChangeDetectorRef) {}

  @Output() sliderValueChanged = new EventEmitter<[number, number]>();

  onSliderChange(min: number, max: number) {
    this.sliderValueChanged.emit([min, max]);
  }
  ngOnInit() {}
  ngAfterViewInit() {
    this.initSlider();
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    // console.log(changes.maxValue.currentValue);
    // changes.minValue.currentValue !== undefined
    //   ? console.log(changes.minValue?.currentValue)
    //   : 'changes.minValue.currentValue';
    // changes.maxValue.currentValue !== undefined
    //   ? console.log(changes.maxValue?.currentValue)
    //   : '';
    // this.valueChanged();
  }

  initSlider() {
    this.sliderKey = this.generateUniqueId();
    setTimeout(() => {
      this.fillColor(this.minValue, this.maxValue, this.sliderKey);
    }, 200);
  }

  generateUniqueId(): string {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  }

  valueChanged(sliderKey: string) {
    console.log('Key', sliderKey);
    this.sliderValueChanged.emit([this.minValue, this.maxValue]);
    this.fillColor(this.minValue, this.maxValue, sliderKey);
  }
  

  fillColor(minInput: number, maxInput: number, id: string) {
    if (typeof window !== 'undefined' && document) {
      let minInputValue: number;
      let maxInputValue: number;
  
      let totalLimit = Math.abs(this.minLimit) + Math.abs(this.maxLimit);
  
      if (minInput < 0) {
        minInputValue = Math.abs(this.minLimit) - Math.abs(minInput);
      } else {
        minInputValue = Math.abs(this.minLimit) + minInput;
      }
  
      if (maxInput >= 0) {
        maxInputValue = Math.abs(this.minLimit) + maxInput;
      } else {
        maxInputValue = Math.abs(this.minLimit) - Math.abs(maxInput);
      }
  
      if (id) {
        let percent1 = (minInputValue / totalLimit) * 100;
        let percent2 = (maxInputValue / totalLimit) * 100;
        let sliderTrack: any = document.querySelector('#slider-' + id);
        if (sliderTrack) {
          sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
        }
      }
    }
  }
}
