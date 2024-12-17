import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonInput } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { isPlatform } from '@ionic/angular';
import { AppStorageService } from '../storage.service';
import { UploadedPhoto } from '../model/uploadedphoto';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonInput],
})
export class UploadPage {
  photoUrl: string = '';
  photo: any;
  photoName: string = 'none';
  uploadArray: UploadedPhoto[] = [];

  constructor(private http: HttpClient, private appStorageService:AppStorageService) {}

  async ionViewDidEnter() {
    const data = await this.appStorageService.get('uploadedPhotos');
    if (data) {
      this.uploadArray = data;
    }
  }

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
    if (!this.photo) {
      console.error('No photo selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.photo, this.photoName);

    const apiKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    const uploadUrl = `/api/?apiKey=${apiKey}`;

    this.http.post(uploadUrl, formData).subscribe(
      async (response: any) => {
        if (response.status === 'success') {
          this.photoUrl = response.file_url;
          console.log('File uploaded successfully:', response.file_url);
          // Načtení existujícího pole z úložiště
          const existingPhotos = await this.appStorageService.get('uploadedPhotos') || [];

          // Vytvoření nového objektu UploadedPhoto
          const newUpload = new UploadedPhoto(this.photoUrl, this.photoName);

          // Přidání nového objektu do pole
          existingPhotos.push(newUpload);

          // Uložení aktualizovaného pole do úložiště
          await this.appStorageService.set('uploadedPhotos', existingPhotos);
        } else {
          console.error('Upload failed:', response.message);
        }
      },
      (error) => {
        console.error('Upload error:', error);
      }
    );
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.photoUrl).then(() => {
      console.log('Photo URL copied to clipboard');
    });
  }
}