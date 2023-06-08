import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './reducers/user.reducer';
import { filtersReducer } from './reducers/filter.reducer';
import { UserEffects } from './effects/user.effect';

@NgModule({
  imports: [
    StoreModule.forRoot({
      users: userReducer,
      filters: filtersReducer,
    }),
    EffectsModule.forRoot([UserEffects]),
  ]
})
export class StateModule {}