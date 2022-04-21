import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCuComponent } from './contact-cu.component';

describe('ContactCuComponent', () => {
  let component: ContactCuComponent;
  let fixture: ComponentFixture<ContactCuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
