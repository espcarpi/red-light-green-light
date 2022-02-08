import { Component } from '@angular/core';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title: string;

  constructor(private readonly pageService: PageService) {
    this.pageService.pageInfo.subscribe((page) => (this.title = page.title));
  }
}
