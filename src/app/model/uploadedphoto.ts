export class UploadedPhoto{
  photoUrl: string = '';
  photoName: string = '';
  date: Date;

  constructor(photoUrl: string, photoName: string, date: Date = new Date()){
    this.photoUrl = photoUrl;
    this.photoName = photoName;
    this.date = date;
  }
}