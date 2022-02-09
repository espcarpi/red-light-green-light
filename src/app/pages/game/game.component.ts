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
  private audio: HTMLAudioElement;

  constructor(
    private readonly userService: UserService,
    private readonly vibration: Vibration
  ) {
    this.user = this.userService.getActualUser();
    this.initAudio();
    this.initLight();
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.setScore(0);
  }

  ngOnDestroy(): void {
    this.userService.saveUser(this.user);
    clearTimeout(this.timeOutSuscriber);
    this.audio.pause();
  }

  setScore(score: number): void {
    if (this.available) {
      if (score < 0) {
        this.vibration.vibrate(250);
      }
      this.user.score += score;
    } else {
      this.setGameLost();
    }

    this.checkScore();
  }

  private changeLight(): void {
    this.available = !this.available;
  }

  private checkScore(): void {
    if (this.user.score <= 0) {
      this.setGameLost();
    } else {
      this.user.record =
        this.user.record < this.user.score ? this.user.score : this.user.record;
    }

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

  private initAudio(): void {
    this.audio = new Audio();
    this.audio.src = '../../../assets/song.mp3';
    this.audio.load();
  }

  private initLight(): void {
    this.changeLight();
    const lightTime = this.getLightTime();
    if (this.available) {
      this.playAudio(lightTime);
    }

    this.timeOutSuscriber = setTimeout(() => {
      this.initLight();
    }, lightTime);
  }

  private playAudio(time: number) {
    const rate = 5000 / time;
    this.audio.playbackRate = rate;
    this.audio.play();
  }

  private setGameLost(): void {
    this.user.score = 0;
    this.vibration.vibrate(500);
  }
}
