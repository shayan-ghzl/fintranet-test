import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFilter, IUser } from '../shared/models/models';
import { userActionStartEffect } from '../state/actions/user.action';
import { AppState } from '../state/app.state';
import { userSelector } from '../state/selectors/user.selector';
import { filtersSelector } from '../state/selectors/filter.selector';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  @ViewChild('tableSearchFilter') set tableSearchFilter(value: ElementRef<HTMLInputElement>){
    if(value){
      value.nativeElement.focus();
    }
  }

  userList$: Observable<IUser[]> = this.store.select(userSelector);
  filters$: Observable<IFilter> = this.store.select(filtersSelector);
  tableSearchInput = '';
  openSidebar = false;

  constructor(private store: Store<AppState>) { 
      store.dispatch(userActionStartEffect());
  }

}
