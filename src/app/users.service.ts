import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  userUrl = 'assets/user.json';
  adduserUrl = 'assets/addUser.json';

getConfig() {
  return this.http.get<any>(this.userUrl);
}

getUser() {
  return this.http.get<any>(this.adduserUrl);
}
}
