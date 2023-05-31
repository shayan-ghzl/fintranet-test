import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { userSelector } from 'src/app/state/selectors/user.selector';
import { IUser } from '../../models/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
      '[class.show]': 'openSidebar'
  }
})
export class SidebarComponent implements OnInit{

  userList$: Observable<IUser[]> =  this.store.select(userSelector);
  rangeDates: Date[] = [];
  _openSidebar = false;

  @Input() set openSidebar(value: boolean){
    if (value) {
      document.body.classList.add('overfolow-hidden');
    } else {
      document.body.classList.remove('overfolow-hidden');
    }
    this._openSidebar = value;
  }

  get openSidebar(){
    return this._openSidebar;
  }

  constructor(private store: Store<AppState>) { 
  }

  ngOnInit(): void {
    // set last 24 hours to datepicker
    const temp = new Date();
    temp.setDate(temp.getDate() - 1);
    this.rangeDates = [new Date(), temp];
  }
}
