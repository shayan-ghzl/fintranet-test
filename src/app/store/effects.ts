import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs';
import { IRangeDate } from 'src/app/shared/models/models';
import { ApiService } from 'src/app/shared/services/api.service';
import { FilterActions, UserActions } from './actions';


@Injectable()
export class UserEffects {

  startUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserActions.startEffect),
      mergeMap(() => this.ApiService.getUsers()
        .pipe(
          switchMap(response => {
            const temp: { type: string; }[] = [UserActions.set({ users: response.users })];
            const birthDateRange = response.users.map(x => x.birthDate).sort();
            if (birthDateRange.length) {
              let range: IRangeDate;
              if (birthDateRange.length === 1) {
                range = [new Date(birthDateRange[0]), null];
              } else {
                range = [new Date(birthDateRange[0]), new Date(birthDateRange[birthDateRange.length - 1])];
              }
              temp.push(FilterActions.dateUpdate({ dateFilter: range }));
              return temp;
            }
            return temp;
          }),
        )
      )
    );
  });

  constructor(
    private ApiService: ApiService,
    private action$: Actions,
  ) { }

}
