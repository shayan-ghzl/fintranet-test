import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { userActionStartEffect, usersActionSet } from '../actions/user.action';
import { dateFilterActionUpdate } from '../actions/filter.action';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { IRangeDate } from 'src/app/shared/models/models';

@Injectable()
export class UserEffects {

    startUser$ = createEffect(() => {
        return this.action$.pipe(
            ofType(userActionStartEffect),
            mergeMap(() => this.storageService.getUsers()
                .pipe(
                    tap(response => {
                        this.store.dispatch(usersActionSet({ users: response.users }));
                        const birthDateRange = response.users.map(x => x.birthDate).sort();
                        if (birthDateRange.length) {
                            let range: IRangeDate;
                            if (birthDateRange.length === 1) {
                                range = [new Date(birthDateRange[0]), null];
                            }else{
                                range = [new Date(birthDateRange[0]), new Date(birthDateRange[birthDateRange.length - 1])];
                            }
                            this.store.dispatch(dateFilterActionUpdate({dateFilter: range}));
                        }
                    }),
                )
            )
        );
    }, { dispatch: false });

    constructor(
        private storageService: StorageService, 
        private action$: Actions,
        private store: Store<AppState>
        ) { }

}