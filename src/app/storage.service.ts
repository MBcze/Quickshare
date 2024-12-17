import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root' // ensures it's available globally
})
export class AppStorageService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    let result = await this._storage?.set(key, value);
    console.log(result);
    //await this.storage.set(key, value);
  }

  public async get(key: string) {
    let value = await this.storage?.get(key);
    console.log(value);
    return value;
  }

  public async remove(key: string) {
    let value = await this.storage?.remove(key);
  }
  
  public async clear() {
    let value = await this.storage?.clear();
  }

  public async keys() {
    let value = await this.storage?.keys();
    console.log(value);
    return value;
  }
}
