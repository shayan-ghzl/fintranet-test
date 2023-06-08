import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgeFilterComponent } from './shared/components/age-filter/age-filter.component';
import { EyeFilterComponent } from './shared/components/eye-filter/eye-filter.component';
import { GenderFilterComponent } from './shared/components/gender-filter/gender-filter.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { UniquePipe } from './shared/pipes/unique.pipe';
import { UsersListComponent } from './users-list/users-list.component';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    SidebarComponent,
    DropdownDirective,
    UniquePipe,
    FilterPipe,
    GenderFilterComponent,
    AgeFilterComponent,
    EyeFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CalendarModule,
    FormsModule,
    StateModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
