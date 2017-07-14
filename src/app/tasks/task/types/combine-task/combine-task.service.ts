import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Api} from '../../../../core/api.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Task} from '../../../../models/task.model';

@Injectable()
export class CombineTaskService {

  constructor() {
  }
}
