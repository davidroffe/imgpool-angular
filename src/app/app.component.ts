import { Component } from '@angular/core';

import { UserStoreService } from './core/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  posts: any[] = [];
  constructor(public userStoreService: UserStoreService) {}
}
