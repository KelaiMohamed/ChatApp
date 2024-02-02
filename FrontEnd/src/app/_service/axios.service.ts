import { Injectable } from '@angular/core';
import axios, {AxiosRequestConfig, AxiosError} from 'axios';

@Injectable({
  providedIn: 'root'
})

export class AxiosService {

  private baseURL = 'http://localhost:8080';
  private authTokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    axios.defaults.baseURL = this.baseURL;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    // Initialize tokens from local storage
    this.accessToken = window.localStorage.getItem(this.authTokenKey);
    this.refreshToken = window.localStorage.getItem(this.refreshTokenKey);
  }

  private saveToken(tokenKey: string, token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem(tokenKey, token);
    } else {
      window.localStorage.removeItem(tokenKey);
    }
  }

  private getAuthToken(): string | null {
    return this.accessToken;
  }

  private getRefreshToken(): string | null {
    return window.localStorage.getItem(this.refreshTokenKey);
  }

  public setAuthTokens(accessToken: string | null, refreshToken: string | null): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this.saveToken(this.authTokenKey, accessToken);
    this.saveToken(this.refreshTokenKey, refreshToken);
  }

  private async requestWithRefreshToken(method: string, url: string, data: any): Promise<any> {
    const headers: any = { 'Content-Type': 'application/json' };

    if (this.getAuthToken()) {
      headers['Authorization'] = 'Bearer ' + this.getAuthToken();
    }

    const config: AxiosRequestConfig = { method, url, data, headers };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      const responseError = error as AxiosError;

      if (responseError.isAxiosError && responseError.response && responseError.response.status === 401 && this.getRefreshToken()) {
        await this.refreshTokenAndRetry(config);
      } else {
        throw error;
      }
    }
  }


  private async refreshTokenAndRetry(originalRequestConfig: AxiosRequestConfig): Promise<void> {
    try {
      const response = await axios.post(  this.baseURL + "/api/v1/auth/refresh-token", { refresh_token: this.getRefreshToken() });
      const newAccessToken = response.data.access_token;
      this.setAuthTokens(newAccessToken, this.getRefreshToken()!);

      if (originalRequestConfig.headers) {
        // Ensure headers is not null or undefined before accessing 'Authorization'
        originalRequestConfig.headers['Authorization'] = 'Bearer ' + newAccessToken;
      }

      await this.requestWithRefreshToken(
        originalRequestConfig.method!,
        originalRequestConfig.url!,
        originalRequestConfig.data!
      );
    } catch (refreshError) {
      // Handle refresh error or logout the user
      throw refreshError;
    }
  }

  public async request(method: string, url: string, data: any): Promise<any> {
    return this.requestWithRefreshToken(method, url, data);
  }
}
