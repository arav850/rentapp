import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';
import { RouterModule } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   *
   */
  user: User = new User();
  http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/createUser';
  // constructor(private user: User) {}
  isuserlogin: boolean = false;

  register(userDetails: User): Observable<User> {
    return this.http
      .post<User>('http://localhost:3000/createUser', userDetails)
      .pipe(
        catchError((error) => {
          console.error('Error creating user', error);
          // Rethrow the error to be handled by the caller
          return throwError(() => new Error('Error creating user'));
        })
      );
  }

  setLoginStatus(status: boolean) {
    this.isuserlogin = status;
  }
  getSingleUser() {}

  findUser(data: { email: string; password: string }): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((res: User[]) => {
        const user = res.find(
          (a: User) => a.email === data.email && a.password === data.password
        );

        return user || null;
      }),
      catchError((error) => {
        console.error('Error fetching user', error);
        return of(null);
      })
    );
  }

  getLoginStatus() {
    return this.isuserlogin;
  }
}
