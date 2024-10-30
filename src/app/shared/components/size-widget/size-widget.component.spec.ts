import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeWidgetComponent } from './size-widget.component';

describe('SizeWidgetComponent', () => {
  let component: SizeWidgetComponent;
  let fixture: ComponentFixture<SizeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SizeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
