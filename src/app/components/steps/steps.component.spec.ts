import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StepsComponent } from './steps.component';

describe('StepsComponent', () => {
  let component: StepsComponent;
  let fixture: ComponentFixture<StepsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StepsComponent],
        imports: [IonicModule.forRoot()]
      }).compileComponents();

      fixture = TestBed.createComponent(StepsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  describe('Handling steps button', () => {
    it('Should emit 1 when steps are between -1 and 1', () => {
      spyOn(component.scoreEvent, 'emit');
      component.handleStepsButton(1);
      expect(component.scoreEvent.emit).toHaveBeenCalledWith(1);
    });

    it('Should emit -1 when steps are more than 1', () => {
      component.handleStepsButton(1);
      spyOn(component.scoreEvent, 'emit');
      component.handleStepsButton(1);
      expect(component.scoreEvent.emit).toHaveBeenCalledWith(-1);
    });

    it('Should emit -1 when steps are less than -1', () => {
      component.handleStepsButton(-1);
      spyOn(component.scoreEvent, 'emit');
      component.handleStepsButton(-1);
      expect(component.scoreEvent.emit).toHaveBeenCalledWith(-1);
    });
  });

  describe('Handling keyboard', () => {
    let event: KeyboardEvent;

    describe('left arrow key', () => {
      beforeEach(() => {
        event = new KeyboardEvent('keypress', {
          code: 'ArrowLeft'
        });
      });

      it('Should emit 1 when steps are between -1 and 1 with left arrow key', () => {
        spyOn(component.scoreEvent, 'emit');
        component.keyEvent(event);
        expect(component.scoreEvent.emit).toHaveBeenCalledWith(1);
      });

      it('Should emit -1 when steps are less than -1', () => {
        component.handleStepsButton(-1);
        spyOn(component.scoreEvent, 'emit');
        component.keyEvent(event);
        expect(component.scoreEvent.emit).toHaveBeenCalledWith(-1);
      });
    });

    describe('right arrow key', () => {
      beforeEach(() => {
        event = new KeyboardEvent('keypress', {
          code: 'ArrowRight'
        });
      });

      it('Should emit 1 when steps are between -1 and 1 with left arrow key', () => {
        spyOn(component.scoreEvent, 'emit');
        component.keyEvent(event);
        expect(component.scoreEvent.emit).toHaveBeenCalledWith(1);
      });

      it('Should emit -1 when steps are more than 1', () => {
        component.handleStepsButton(1);
        spyOn(component.scoreEvent, 'emit');
        component.keyEvent(event);
        expect(component.scoreEvent.emit).toHaveBeenCalledWith(-1);
      });
    });

    it('Should emit 0 when other key has been clicked', () => {
      event = new KeyboardEvent('keypress', {
        code: 'other'
      });
      spyOn(component.scoreEvent, 'emit');
      component.keyEvent(event);
      expect(component.scoreEvent.emit).toHaveBeenCalledWith(0);
    });
  });
});
