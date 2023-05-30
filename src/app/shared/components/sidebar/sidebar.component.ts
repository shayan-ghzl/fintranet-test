import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
      '[class.show]': 'openSidebar'
  }
})
export class SidebarComponent {

  _openSidebar = false;

  @Input() set openSidebar(value: boolean){
    if (value) {
      document.body.classList.add('overfolow-hidden');
    } else {
      document.body.classList.remove('overfolow-hidden');
    }
    this._openSidebar = value;
  }

  get openSidebar(){
    return this._openSidebar;
  }

}
