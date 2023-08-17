import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFilter, IUser } from '../shared/models/models';

import { UserActions } from '../store/actions';
import { AppState, filterFeature, userFeature } from '../store/features';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {

  @ViewChild('tableSearchFilter') set tableSearchFilter(value: ElementRef<HTMLInputElement>) {
    if (value) {
      value.nativeElement.focus();
    }
  }

  userList$: Observable<IUser[] | null> = this.store.select(userFeature.selectUsersState);
  filters$: Observable<IFilter> = this.store.select(filterFeature.selectFiltersState);

  tableSearchInput = '';
  openSidebar = false;

  constructor(private store: Store<AppState>) {
    store.dispatch(UserActions.startEffect());
  }

}
