import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LogServiceService } from '../services/log-service.service';

@Injectable()
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor(private LogServiceService: LogServiceService) {
    super();
  }

  public handleError(error: any) {
    this.LogServiceService.logService(error);
    // alert(`Error occurred:${error.message}`);
  }
}
