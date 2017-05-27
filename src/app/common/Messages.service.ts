import {Injectable}    from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Injectable()
export class Messages {

  constructor () {
    this.showMessage$ = new Observable(observer => this._observer = observer);
  }

  showMessage$: Observable<object>;
  private _observer: Observer<object>;

  showInfo = (msg: string, summary?: string, life?: number) => this.showMessage(msg, 'info', summary, life);

  showError = (msg: string, summary?: string, life?: number) => this.showMessage(msg, 'error', summary, life);

  showWarning = (msg: string, summary?: string, life?: number) => this.showMessage(msg, 'warn', summary, life);

  showSuccess = (msg: string, summary?: string, life?: number) => this.showMessage(msg, 'success', summary, life);

  private showMessage = (msg: string, severity: string, summary?: string, life?: number) =>
    this._observer.next({severity: severity, summary: summary || 'Info Message', detail: msg, life: life || 10000});

}
