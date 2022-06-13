import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const InterceptorBasicSkipHeader = 'AS-Skip-Interceptor';

@Injectable()
export class HttpBasicAuthInterceptor implements HttpInterceptor {

  constructor(private router: Router
            ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.headers.has(InterceptorBasicSkipHeader)) {
        console.log('API Call without token');
        const headers = request.headers.delete(InterceptorBasicSkipHeader);
        return next.handle(request.clone({ headers }))
        .pipe(catchError(this.handleError));
    }

    debugger;
    const token = localStorage.getItem('token');
    const authType = 'Basic';

    request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
    if (token) {
        console.log('API Call with token');
        console.log(request.url);
        console.log(token);
        request = request.clone({ headers: request.headers.set('Authorization', `${authType} ${token}`) });
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    return next.handle(request)
    .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    // switch (err.status) {
        // case 400:
        //   this.handleBadRequest(err);
        //   break;

        // case 401:
        //   this.handleUnauthorized(err);
        //   break;

        // case 403:
        //   this.handleForbidden();
        //   break;

        // case 404:
        //   this.handleNotFound(err);
        //   break;

        // case 500:
        //   this.handleServerError();
        //   break;

    //     default:
    //
    //         if (err.error instanceof Error) {
    //             console.log('An error occurred:', err.error.message);
    //         } else {
    //             console.log(`Backend returned code ${err.status} :  ${err.statusText}, message : ${err.error.Message} ${err.statusText} body was: ${err.error}`);
    //         }
    //         break;
    //   }

    // return Observable.throw(err);
    return throwError(err);
  }
}
