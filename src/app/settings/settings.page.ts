import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption, IonButton, AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption, IonButton],
})
export class SettingsPage {
  constructor(private alertController: AlertController) {}

  toggleDarkMode(event: any) {
    document.body.classList.toggle('dark', event.detail.checked);
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

  resetApp() {
    console.log('App reset');
  }
}