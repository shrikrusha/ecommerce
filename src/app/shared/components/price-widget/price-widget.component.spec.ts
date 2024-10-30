import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceWidgetComponent } from './price-widget.component';

describe('PriceWidgetComponent', () => {
  let component: PriceWidgetComponent;
  let fixture: ComponentFixture<PriceWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
