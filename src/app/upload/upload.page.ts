import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonInput } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonInput],
})
export class UploadPage {
  photoUrl: string = '';
  photo: any;
  photoName: string = 'none';

  constructor() {}

  async selectPhoto() {
    if (isPlatform('hybrid')) {
      // Použijte Capacitor Camera plugin pro mobilní zařízení
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt, // Vyskočí dialog s výběrem zda chceme vyfotit nebo vybrat fotku
      });

      this.photo = image;
      this.photoName = image.path?.split('/').pop() || 'Photo';
    } else {
      // Použití HTML5 API pro web
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.photo = file;
            this.photoName = file.name;
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  }

  uploadPhoto() {
    // Implement the logic to upload the selected photo
    // After uploading, set the photoUrl to the URL of the uploaded photo
    this.photoUrl = 'https://example.com/photo.jpg'; // Replace with actual URL after upload
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.photoUrl).then(() => {
      console.log('Photo URL copied to clipboard');
    });
  }
}