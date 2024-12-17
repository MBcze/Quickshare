import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonToggle, IonButton, AlertController } from '@ionic/angular/standalone';
import { AppStorageService } from '../storage.service'; // Import the StorageService
import { FormsModule } from '@angular/forms'; // Import FormsModule to use ngModel

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonToggle, IonButton, FormsModule // Add FormsModule here
  ],
})
export class SettingsPage implements OnInit {
  darkMode: boolean = false;

  constructor(
    private alertController: AlertController, 
    private storageService: AppStorageService // Inject StorageService
  ) {}

  async ngOnInit() {
    this.darkMode = await this.storageService.get('darkMode') || false;
    this.updateDarkModeClass();
  }

  async toggleDarkMode(event: any) {
    this.darkMode = event.detail.checked;
    await this.storageService.set('darkMode', this.darkMode);
    this.updateDarkModeClass();
  }

  private updateDarkModeClass() {
    document.body.classList.toggle('dark', this.darkMode);
  }

  async showAbout() {
    const alert = await this.alertController.create({
      header: 'QuickShare',
      subHeader: 'Version 1.0.0',
      message: 'Michal Bradávka UTB',
      buttons: ['OK'],
      cssClass: 'about-alert'
    });

    await alert.present();
  }

  async resetApp() {
    console.log('App reset');
    await this.storageService.clear();
    this.darkMode = false;
    this.updateDarkModeClass();
  }
}
