import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeaDialogComponent } from './kea-dialog.component';

describe('KeaDialogComponent', () => {
  let component: KeaDialogComponent;
  let fixture: ComponentFixture<KeaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeaDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KeaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
