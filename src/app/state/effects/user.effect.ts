import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { userActionStartEffect, usersActionSet } from '../actions/user.action';

@Injectable()
export class UserEffects {

    startUser$ = createEffect(() => {
        return this.action$.pipe(
            ofType(userActionStartEffect),
            mergeMap(() => this.storageService.getUsers()
                .pipe(
                    tap(console.log),
                    map(response =>
                        usersActionSet({ users: response.users })
                    ),
                )
            )
        );
    });

    constructor(
        private storageService: StorageService, 
        private action$: Actions,
        ) { }

}