import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeaTableComponent } from './kea-table.component';

describe('KeaTableComponent', () => {
  let component: KeaTableComponent;
  let fixture: ComponentFixture<KeaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeaTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
