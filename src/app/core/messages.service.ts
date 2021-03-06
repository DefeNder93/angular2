import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class MessagesService {

  showMessage$: Observable<object>;
  private observer: Observer<object>;

  constructor() {
    this.showMessage$ = new Observable(observer => this.observer = observer);
  }

  showInfo = (msg: string, summary?: string, life?: number) => this.showMessage(msg, 'info', summary, life);

  showError = (msg: string, summary?: string, life?: number) => this.showMessage(msg, 'error', summary, life);

  showWarning = (msg: string, summary?: string, life?: number) => this.showMessage(msg, 'warn', summary, life);

  showSuccess = (msg: string, summary?: string, life?: number) => this.showMessage(msg, 'success', summary, life || 4000);

  private showMessage = (msg: string, severity: string, summary?: string, life?: number) =>
    this.observer.next({severity: severity, summary: summary || this.getMessageType(severity) + ' Message', detail: msg, life: life || 10000});

  private getMessageType = (severity: string) => severity.charAt(0).toUpperCase() + severity.substr(1);

  showServerError = (msg) => this.showError(msg, 'Server Error', 10000);

  rejectWithError = (reject: any, msg: string, summary?: string, life?: number) => {
    this.showError(msg, summary, life);
    reject();
  };
}
