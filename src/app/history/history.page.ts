import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonButton, IonItemDivider } from '@ionic/angular/standalone';
import { AppStorageService } from '../storage.service';
import { UploadedPhoto } from '../model/uploadedphoto';
import { FormsModule } from '@angular/forms'; // Import FormsModule to use ngModel

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonButton, IonItemDivider],
})
export class HistoryPage implements OnInit {
  uploadArray: UploadedPhoto[] = [];
  groupedUploads: { key: string, value: UploadedPhoto[] }[] = [];

  constructor(private appStorageService: AppStorageService) {}

  async ngOnInit() {
    const data = await this.appStorageService.get('uploadedPhotos');
    if (data) {
      this.uploadArray = data;
      this.groupedUploads = this.getGroupedUploads();
    }
  }

  copyToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      console.log('Photo URL copied to clipboard');
    });
  }

  getGroupedUploads() {
    const groupedUploads: { [key: string]: UploadedPhoto[] } = {};
    this.uploadArray.forEach(upload => {
      const hour = new Date(upload.date).getHours().toString();
      if (!groupedUploads[hour]) {
        groupedUploads[hour] = [];
      }
      groupedUploads[hour].push(upload);
    });
    return Object.entries(groupedUploads).map(([key, value]) => ({ key, value }));
  }
}