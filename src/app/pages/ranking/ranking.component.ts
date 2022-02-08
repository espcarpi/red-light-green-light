import { Component } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent {
  ranking: User[];
  actualUser: string;

  constructor(private readonly userService: UserService) {
    this.ranking = this.userService.getRanking().slice(0, 10);
    this.actualUser = this.userService.getActualUser().username;
  }
}
