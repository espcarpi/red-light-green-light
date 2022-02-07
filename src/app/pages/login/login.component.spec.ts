import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { UserService } from '../../services/user.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const userServiceMock = {
    setActualUser: jasmine.createSpy()
  };

  const username = 'any username';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          IonicModule.forRoot(),
          BrowserDynamicTestingModule,
          ReactiveFormsModule,
          RouterTestingModule
        ],
        providers: [
          FormBuilder,
          {
            provide: UserService,
            useValue: userServiceMock
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  describe('On initialization', () => {
    it('should create an instance of form group', () => {
      expect(component.loginForm).toBeInstanceOf(FormGroup);
    });

    it('should create a username form control', () => {
      expect(component.loginForm.controls.username).toBeTruthy();
    });
  });

  describe('Handling login button', () => {
    beforeEach(() => {
      userServiceMock.setActualUser.calls.reset();
    });

    describe('Having a valid form', () => {
      beforeEach(() => {
        component.loginForm.controls.username.setValue(username);
        component.handleLoginButton();
      });

      it('Should set actual user in userService', () => {
        expect(userServiceMock.setActualUser).toHaveBeenCalledWith(username);
      });
    });

    describe('Having an invalid form', () => {
      beforeEach(() => {
        component.loginForm.controls.username.setValue('');
        component.handleLoginButton();
      });

      it('Should set actual user in userService', () => {
        expect(userServiceMock.setActualUser).not.toHaveBeenCalled();
      });
    });
  });
});
