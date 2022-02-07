import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
  private actualUser: User;
  private users: User[] = [];

  constructor(private readonly storageService: StorageService) {
    this.storageService.get().then((users) => {
      this.users = users;
    });
  }

  getActualUser = (): User => this.actualUser;

  setActualUser(name: string): void {
    const previousUser = this.getUser(name);
    if (previousUser) {
      this.actualUser = previousUser;
    } else {
      this.actualUser = this.getNewUser(name);
      this.users = [...this.users, this.actualUser];
      this.storageService.set(this.users);
    }
  }

  private getNewUser = (username: string): User => ({
    record: 0,
    username,
    score: 0
  });

  private getUser = (name: string): User =>
    this.users?.find(({ username }) => username === name);
}
