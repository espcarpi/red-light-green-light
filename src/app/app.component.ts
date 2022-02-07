import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages = [{ title: 'Leave', url: '/login', icon: 'exit' }];

  constructor() {}
}
