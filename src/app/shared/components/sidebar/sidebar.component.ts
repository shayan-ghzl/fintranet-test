import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FilterActions } from 'src/app/store/actions';
import { AppState, filterFeature, userFeature } from 'src/app/store/features';
import { IFilter, IRangeDate, IUser } from '../../models/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    '[class.show]': 'openSidebar'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  userList$: Observable<IUser[] | null> = this.store.select(userFeature.selectUsersState);
  filters$: Observable<IFilter> = this.store.select(filterFeature.selectFiltersState);
  // userList$: Observable<IUser[] | null> = this.store.select(userSelectFeature);
  // filters$: Observable<IFilter> = this.store.pipe(
  //   select(filterSelectFeature),
  // );

  _openSidebar = false;

  @Input() set openSidebar(value: boolean) {
    if (value) {
      document.body.classList.add('overfolow-hidden');
    } else {
      document.body.classList.remove('overfolow-hidden');
    }
    this._openSidebar = value;
  }

  get openSidebar() {
    return this._openSidebar;
  }

  constructor(
    private store: Store<AppState>,
  ) { }

  calendarChanged(event: IRangeDate) {
    this.store.dispatch(FilterActions.dateUpdate({ dateFilter: event }));
  }

}
