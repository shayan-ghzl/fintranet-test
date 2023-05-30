import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { IUser } from '../shared/models/models';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit{

  userList$: Observable<IUser[]> = of([]);
  
  // userList$: Observable<IUser[]> = this.storageService.getUsers().pipe(
  //   map(x => x.users)
  // );

  openSidebar = false;

  constructor(
    private storageService: StorageService
    ) { }
    
  ngOnInit(): void {
    
  }

  search(value: string, list: IUser[]){
    console.log(value, list);
  }
}
