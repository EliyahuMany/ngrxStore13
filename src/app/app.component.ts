import {AppState, selectUsers} from './reducers/index';
import {UsersService} from './users.service';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AddUsers, AddUsersSuccess, loadUsers, DeleteSpecificUser, DeleteUser} from './action/users.actions';
import {User} from './models/user';
import {Observable} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrxStore';
  usersList: Observable<User[]> | undefined;

  constructor(private usersService: UsersService, private store: Store<AppState>) {
    this.usersList = this.store.select(selectUsers);
  }



// showConfig() {

//   this.usersService.getConfig()
//     .subscribe((data: any) => {
//       this.store.dispatch(LoadUsersSuccess({ data }));

//     } );
// }

  AddUser() {
    this.store.dispatch(AddUsers())
  }

  DeleteUser() {
    this.store.dispatch(DeleteUser())
  }

  DeleteSpecificUser() {
    this.store.dispatch(DeleteSpecificUser())
  }

  showConfig() {
    this.store.dispatch(loadUsers());
  }
}
