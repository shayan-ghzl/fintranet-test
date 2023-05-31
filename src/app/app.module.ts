import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CalendarModule } from 'primeng/calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgeFilterComponent } from './shared/components/age-filter/age-filter.component';
import { EyeFilterComponent } from './shared/components/eye-filter/eye-filter.component';
import { GenderFilterComponent } from './shared/components/gender-filter/gender-filter.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DropdownCtrlDirective, DropdownDirective } from './shared/directives/dropdown.directive';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { UniquePipe } from './shared/pipes/unique.pipe';
import { UserEffects } from './state/effects/user.effect';
import { filtersReducer } from './state/reducers/filter.reducer';
import { userReducer } from './state/reducers/user.reducer';
import { UsersListComponent } from './users-list/users-list.component';
import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    SidebarComponent,
    DropdownDirective,
    DropdownCtrlDirective,
    UniquePipe,
    FilterPipe,
    GenderFilterComponent,
    AgeFilterComponent,
    EyeFilterComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      users: userReducer,
      filters: filtersReducer,
    }),
    EffectsModule.forRoot([UserEffects]),
    CalendarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
