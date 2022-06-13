import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AppErrorService } from './app.error.service';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {
        const errorService = this.injector.get(AppErrorService);
        const messageService = this.injector.get(MessageService);

        let message;

        if (error instanceof HttpErrorResponse) {
            // Server error
            message = errorService.getServerErrorMessage(error);
            messageService.add({ severity: 'error', summary: 'Server Error', detail: message });
        } else {
            // Client Error
            message = errorService.getClientErrorMessage(error);
            messageService.add({ severity: 'error', summary: 'Client Error', detail: message });
        }
        console.error(error);
    }
}
