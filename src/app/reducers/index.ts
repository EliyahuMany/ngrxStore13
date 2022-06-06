import {
  ActionReducerMap,
  MetaReducer,
  Action,
  on,
  createReducer, createSelector,
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import * as UsersActions from '../action/users.actions';
import {StaticReflector} from '@angular/compiler';
import {DeleteSpecificUserSuccess, DeleteUser} from "../action/users.actions";

export interface UserData {
  data: User[];
}

const initialUserState: UserData = {
  data: []
};

export interface AppState {
  users: UserData;
}

export const userdReducer = createReducer(
  initialUserState,
  //   on(UsersActions.LoadUsersSuccess, (state, action) => {
  //     console.log("users",action)
  //     return state;
  // })

  // on(UsersActions.LoadUsersSuccess, (state, users) => ({
  //   users: users.data,
  // })),

  on(UsersActions.LoadUsersSuccess, (state, action) => ({
    ...state,
    data: action.data
  })),
  on(UsersActions.AddUsersSuccess, (state, action) => ({
    ...state,
    data: state.data.concat(action.data)
  })),
  on(UsersActions.DeleteUser, (state) => ({
    ...state,
    data: state.data.slice(0, state.data.length - 1)
  })),
  on(UsersActions.DeleteSpecificUserSuccess, (state, action) => {
    console.log(action, action.data);
    const user = action.data[0];
    return {
      ...state,
      data: state.data.filter(data => data._id !== user._id)
    }
  })
);

// export function userReducer(state: UserState = initialWeatherState, action: WeatherAction): UserState {
//   switch (action.type) {
//     case WeatherActionTypes.LoadWeather:
//       return {
//         weatherData: action.payload.weatherData
//       };

//     default:
//       return state;
//   }
// }

export const reducers: ActionReducerMap<AppState> = {
  users: userdReducer,
};

// export const selectUser = (state: AppState) => state.weather.weatherData;
const selectUsersState = (state: AppState) => state.users.data;
export const selectUsers = createSelector(selectUsersState, (state: User[]) => state);


// export const selectError = (state: AppState) => state.location.error;

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];
