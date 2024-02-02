import { Injectable } from '@angular/core';
import {AxiosService} from "./axios.service";
import {Observable} from "rxjs";

const AUTH_API = '/api/v1/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private axiosService: AxiosService) {}

  login(username: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.axiosService.request(
        'POST',
        AUTH_API + 'authenticate',
        { username, password }
      ).then(
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            const { access_token, refresh_token } = response.data;
            this.axiosService.setAuthTokens(access_token, refresh_token);
            console.log('Authentication successful');
            observer.next(response);
            observer.complete();
          } else {
            console.error('Authentication failed with status code: ' + response.status);
            observer.error(response);
          }
        }
      ).catch(
        (error) => {
          if (error.response && error.response.status === 401) {
            this.axiosService.setAuthTokens(null, null);
          }
          observer.error(error);
        }
      );
    });
  }
  register(firstname: string, lastname: string, username: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.axiosService.request(
        'POST',
        AUTH_API + 'register',
        {
          firstname,
          lastname,
          username,
          password
        }
      ).then(
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            const { access_token, refresh_token } = response.data;
            this.axiosService.setAuthTokens(access_token, refresh_token);
            console.log('Registration successful');
            observer.next(response);
            observer.complete();
          } else {
            console.error('Registration failed with status code: ' + response.status);
            observer.error(response);
          }
        }
      ).catch(
        (error) => {
          if (error.response && error.response.status === 401) {
            this.axiosService.setAuthTokens(null, null);
          }
          observer.error(error);
        }
      );
    });
  }

  logout(): Observable<any> {
    return new Observable((observer) => {

      this.axiosService.request(
        'POST',
        AUTH_API + 'logout',
        {}
      ).then(
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            this.axiosService.setAuthTokens(null, null);
            observer.next(response);
            observer.complete();
          } else {
            observer.error(response);
          }
        }
      ).catch(
        (error) => {
          observer.error(error);
        }
      );
    });

  }

}
