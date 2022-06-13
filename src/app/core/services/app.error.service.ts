import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorMessage } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class AppErrorService {
  errorMessages: ErrorMessage[] = null;

  constructor(private http: HttpClient) {

      this.loadErrorMessages();
  }

  
  loadErrorMessages() {
    return this.http.get<any>('assets/demo/data/errors.json')
    .toPromise()
    .then(res => res.data as ErrorMessage[])
    .then(data => this.errorMessages = data);
}  

  getClientErrorMessage(error: Error): string {
    return error.message ? error.message : error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    const sError = (error.error && error.error.Message ? this.getErrorMessage(error.error.Message) : error.message);
    return (navigator.onLine ? sError : 'No Internet Connection');
  }

  getErrorMessage(errCode) : string  {
    const e: ErrorMessage = (this.errorMessages ? this.errorMessages.find(i => i.Code === errCode): null);
    if(!e){ return errCode;}    
    return e.Description;
  }
}
