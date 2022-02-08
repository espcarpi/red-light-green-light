import { Component, EventEmitter, HostListener, Output } from '@angular/core';

enum KeyCode {
  rigthArrow = 'ArrowRight',
  leftArrow = 'ArrowLeft'
}

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent {
  @Output() scoreEvent = new EventEmitter<number>();
  private steps = 0;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.code) {
      case KeyCode.leftArrow:
        this.handleStepsButton(-1);
        break;
      case KeyCode.rigthArrow:
        this.handleStepsButton(1);
        break;
      default:
        this.scoreEvent.emit(0);
        break;
    }
  }

  handleStepsButton(steps: number) {
    this.steps = this.steps + steps;
    this.sendScore();
  }

  private sendScore() {
    if (-1 > this.steps || this.steps > 1) {
      this.steps = this.steps > 1 ? 1 : -1;
      this.scoreEvent.emit(-1);
    } else {
      this.scoreEvent.emit(+1);
    }
  }
}
