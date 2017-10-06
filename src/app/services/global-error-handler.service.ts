import { ErrorHandler, Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import { LogServiceService } from '../services/log-service.service';

// export class GlobalErrorHandlerService extends ErrorHandler {

//   constructor() {
//     super();
//   }
//     handleError(error: any) {
//     super.handleError(error);
//     alert(`Error occurred:${error.message}`);
//   }
// }
@Injectable()
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor(private LogServiceService: LogServiceService) {
    super();
  }
  handleError(error: any) {
    this.LogServiceService.logService(error);
    // alert(`Error occurred:${error.message}`);
  }
}
