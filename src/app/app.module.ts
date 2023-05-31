import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { CalendarModule } from 'primeng/calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { userReducer } from './state/reducers/user.reducer';
import { UsersListComponent } from './users-list/users-list.component';
import { DropdownCtrlDirective, DropdownDirective } from './shared/directives/dropdown.directive';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/effects/user.effect';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    SidebarComponent,
    DropdownDirective,
    DropdownCtrlDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      users: userReducer,
    }),
    EffectsModule.forRoot([UserEffects]),
    CalendarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
