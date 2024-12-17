import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudUploadOutline, cloudUploadSharp, timeOutline, timeSharp, settingsOutline, settingsSharp, starOutline, starSharp } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { AppStorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive, 
    CommonModule, 
    IonApp, 
    IonSplitPane, 
    IonMenu, 
    IonContent, 
    IonList, 
    IonListHeader, 
    IonNote, 
    IonMenuToggle, 
    IonItem, 
    IonIcon, 
    IonLabel, 
    IonRouterLink, 
    IonRouterOutlet, 
    IonButtons, 
    IonMenuButton
  ],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Upload', url: '/', icon: 'cloud-upload' },
    { title: 'History', url: '/history', icon: 'time' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ];
  public labels = ['Test 1', 'Test 2', 'Test 3'];

  constructor(private storage: Storage, private appStorageService: AppStorageService) {
    addIcons({ cloudUploadOutline, cloudUploadSharp, timeOutline, timeSharp, settingsOutline, settingsSharp, starOutline, starSharp });
  }

  async ngOnInit() {
    await this.storage.create();
    const darkMode = await this.appStorageService.get('darkMode');
    if (darkMode) {
      document.body.classList.toggle('dark', darkMode);
    }
  }
}