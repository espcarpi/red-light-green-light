import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private static storageKey = 'RedLightGreenLigth';
  private storage: Storage | null = null;

  constructor(private readonly ionicStorage: Storage) {}

  set(value: any): any {
    this.storage.set(StorageService.storageKey, value);
  }

  get = (): Promise<any> => this.storage.get(StorageService.storageKey);

  async init(): Promise<void> {
    this.storage = await this.ionicStorage.create();
  }
}
