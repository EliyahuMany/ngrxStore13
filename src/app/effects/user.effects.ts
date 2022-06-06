import { UsersService } from './../users.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {AddUsers, AddUsersSuccess, DeleteSpecificUserSuccess, DeleteSpecificUser, loadUsers, LoadUsersSuccess} from '../action/users.actions';
// import { LoadUsers, LoadUsersSuccess } from '../action/users.actions';


@Injectable()
export class UserEffects {


  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    mergeMap(() => this.usersService.getConfig()
      .pipe(
        map(data => (LoadUsersSuccess({data}))),
        catchError(() => EMPTY)
      ))
    )
  );

  addUsers$ = createEffect(() => this.actions$.pipe(
    ofType(AddUsers),
    mergeMap(() => this.usersService.getUser()
      .pipe(
        map(data => AddUsersSuccess({data})),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteSpecificUser$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteSpecificUser),
    mergeMap(() => this.usersService.getUser()
      .pipe(
        map(data => DeleteSpecificUserSuccess({data})),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {
    console.log("effects");

  }
}
