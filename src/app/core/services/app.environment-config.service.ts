import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InterceptorBasicSkipHeader } from '../../interceptors/http-basic-auth.interceptor';

@Injectable()
export class AppEnvironmentConfigService {
  private appConfig;

  constructor(private http: HttpClient) {
  }

  load(url: string) {
    return new Promise<void>((resolve) => {
      let headers = new HttpHeaders().set(InterceptorBasicSkipHeader, '');
      this.http.get(url, { headers })
        .subscribe((config) => {
          this.appConfig = config;
          resolve();
        });
    })
      .catch(error => {
        console.warn("Error loading environment-data.json, using envrionment file instead");
        // this.appConfig = environment;
      });
  }

  get config() {
    return this.appConfig;
  }
}
