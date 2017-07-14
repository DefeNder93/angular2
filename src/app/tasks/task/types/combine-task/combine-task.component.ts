import {Component, OnInit} from '@angular/core';
import {ITask} from '../task.interface';
import {CombineCard} from './combine-card.model';
import {CombineTaskService} from './combine-task.service';
import {Task} from '../../../../models/task.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Api} from '../../../../core/api.service';

@Component({
  selector: 'app-combine-task',
  templateUrl: 'combine-task.html',
  styleUrls: ['combine-task.component.scss']
})
export class CombineTaskComponent implements OnInit, ITask {
  id: string;
  name: string;
  task: Task;
  currentCard: CombineCard;
  currentPlace: Array<CombineCard>;
  cards: Array<CombineCard> = [
    new CombineCard('Card1'),
    new CombineCard('Card2')
  ];
  places: Array<Array<CombineCard>> = [
    [new CombineCard('Card1 place')],
    [new CombineCard('Card2 place')]
  ];

  constructor(private api: Api, private route: ActivatedRoute) {
  }

  dropToPlace = (place: Array<CombineCard>) => {
    this.cards.splice(this.cards.indexOf(this.currentCard), 1);
    place.push(this.currentCard);
  };

  dragCardStart = (card) => this.currentCard = card;

  dragCardEnd = () => this.currentCard = null;

  dragPlaceStart = (place) => this.currentPlace = place;

  dragPlaceEnd = () => this.currentPlace = null;

  dropToCards = () => {
    this.cards.push(this.currentPlace[1]);
    this.currentPlace.splice(1, 1);
  };

  getTask() {
    return this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.api.getTask(params.get('id')))
  }

  ngOnInit() {
    this.id = 'tasks.Combine';
    this.name = 'Combine';

    this.getTask().subscribe((task: Task) => {
      this.task = task;
    });
  }

}
