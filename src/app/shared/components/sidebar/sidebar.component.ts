import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { dateFilterActionUpdate } from 'src/app/state/actions/filter.action';
import { AppState } from 'src/app/state/app.state';
import { filtersSelector } from 'src/app/state/selectors/filter.selector';
import { userSelector } from 'src/app/state/selectors/user.selector';
import { IFilter, IRangeDate, IUser } from '../../models/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
      '[class.show]': 'openSidebar'
  }
})
export class SidebarComponent {

  userList$: Observable<IUser[]> =  this.store.select(userSelector);
  filters$: Observable<IFilter> =  this.store.select(filtersSelector);

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

  constructor(
    private store: Store<AppState>,
    ) { 
  }

  calendarChanged(event: IRangeDate){
    this.store.dispatch(dateFilterActionUpdate({dateFilter: event}));
  }

}
