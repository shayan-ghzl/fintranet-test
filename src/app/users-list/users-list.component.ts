import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFilter, IUser } from '../shared/models/models';
import { userActionStartEffect } from '../state/actions/user.action';
import { AppState } from '../state/app.state';
import { filtersSelector } from '../state/selectors/filter.selector';
import { userSelector } from '../state/selectors/user.selector';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {

  @ViewChild('tableSearchFilter') set tableSearchFilter(value: ElementRef<HTMLInputElement>){
    if(value){
      // why we use it here instead of afterViewInit:
      // because this.userList$ initial value is null and so search input will not be rendered
      // so at first it is undefined and we want to check if at next change detection cycle it 
      // changed 
      // but if it was in the afterViewInit it would be called once during the cd cycles
      value.nativeElement.focus();
      // setTimeout(() => {
      //   value.nativeElement.focus();
      // }, 0);
    }
  }

  userList$: Observable<IUser[] | null> = this.store.select(userSelector);
  filters$: Observable<IFilter> = this.store.select(filtersSelector);
  tableSearchInput = '';
  openSidebar = false;

  constructor(private store: Store<AppState>) { 
      store.dispatch(userActionStartEffect());
  }

}
