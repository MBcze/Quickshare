import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudUploadOutline, cloudUploadSharp, timeOutline, timeSharp, settingsOutline, settingsSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Upload', url: '/', icon: 'cloud-upload' },
    { title: 'History', url: '/history', icon: 'time' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ];
  public labels = ['Test 1', 'Test 2', 'Test 3'];
  constructor() {
    addIcons({ cloudUploadOutline, cloudUploadSharp, timeOutline, timeSharp, settingsOutline, settingsSharp });
  }
}