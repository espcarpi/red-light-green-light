import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent {
  @Output() scoreEvent = new EventEmitter<number>();
  private steps = 0;

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
