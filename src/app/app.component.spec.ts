import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have menu labels', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(3); // Expecting 3 menu items: Upload, History, Settings
    expect(menuItems[0].textContent).toContain('Upload');
    expect(menuItems[1].textContent).toContain('History');
    expect(menuItems[2].textContent).toContain('Settings');
  });

  it('should have urls', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(3); // Expecting 3 menu items: Upload, History, Settings
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/history');
    expect(menuItems[2].getAttribute('ng-reflect-router-link')).toEqual('/settings');
  });
});