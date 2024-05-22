import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KodokComponent } from './kodok.component';

describe('KodokComponent', () => {
  let component: KodokComponent;
  let fixture: ComponentFixture<KodokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KodokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KodokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
