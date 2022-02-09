import { Component, HostListener, OnDestroy } from '@angular/core';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy {
  user: User;
  available = false;

  private timeOutSuscriber;

  constructor(
    private readonly userService: UserService,
    private readonly vibration: Vibration
  ) {
    this.user = this.userService.getActualUser();
    this.initLight();
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.setScore(0);
  }

  ngOnDestroy(): void {
    this.userService.saveUser(this.user);
    clearTimeout(this.timeOutSuscriber);
  }

  setScore(score: number): void {
    if (score < 0) {
      this.vibration.vibrate(1000);
    }

    if (this.available && this.user.score >= 0) {
      this.user.score += score;
    } else {
      this.vibration.vibrate(1000);
      this.user.score = 0;
    }

    this.checkScore();
  }

  private changeLight(): void {
    this.available = !this.available;
  }

  private checkScore(): void {
    this.user.record =
      this.user.record < this.user.score ? this.user.score : this.user.record;
    this.userService.saveUser(this.user);
  }

  private getGreenLightTime = (): number =>
    Math.max(10000 - this.user.score * 100, 2000) +
    this.getRandomIntInclusive(-1500, 1500);

  private getLightTime = (): number =>
    this.available ? this.getGreenLightTime() : 3000;

  private getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private initLight(): void {
    this.changeLight();
    const lightTime = this.getLightTime();

    this.timeOutSuscriber = setTimeout(() => {
      this.initLight();
    }, lightTime);
  }
}
