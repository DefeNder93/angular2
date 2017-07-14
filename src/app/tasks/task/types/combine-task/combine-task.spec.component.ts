import {TestBed, async} from '@angular/core/testing';
import {CombineTaskComponent} from './combine-task.component';
import {TestComponentHelper} from '../../../../../helpers/test-component-helper.class';
import {CombineCard} from './combine-card.model';
import {iit} from 'selenium-webdriver/testing';


describe('CombineTask', () => {
  let fixture, comp, testHelper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CombineTaskComponent
      ],
      providers: [],
      imports: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombineTaskComponent);
    testHelper = new TestComponentHelper(fixture);
    comp = fixture.componentInstance;
  });

  it('should init combine task', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set current card', () => {
    const card = new CombineCard('card1');
    comp.dragCardStart(card);
    expect(comp.currentCard).toBe(card);
  });

  it('should set current card to null', () => {
    comp.currentCard = new CombineCard('card1');
    comp.dragCardEnd();
    expect(comp.currentCard).toBeNull();
  });

  it('should move current card to places', () => {
    const card1 = new CombineCard('card1'),
      card2 = new CombineCard('card2'),
      card3 = new CombineCard('card3'),
      card4 = new CombineCard('card4');
    comp.cards = [card1, card2];
    const place1 = [card3],
          place2 = [card4];
    comp.places = [place1, place2];
    comp.currentCard = card2;
    comp.dropToPlace(place1);
    expect(comp.cards).toEqual([card1]);
    expect(comp.places).toEqual([[card3, card2], [card4]]);
  });

  it('should set current place', () => {
    const place = [new CombineCard('card1')];
    comp.dragPlaceStart(place);
    expect(comp.currentPlace).toBe(place);
  });

  it('should set current place to null', () => {
    comp.currentPlace = new CombineCard('card1');
    comp.dragPlaceEnd();
    expect(comp.currentPlace).toBeNull();
  });

  it('should move card from place to cards', () => {
    const card1 = new CombineCard('card1'),
      card2 = new CombineCard('card2'),
      card3 = new CombineCard('card3'),
      card4 = new CombineCard('card4');
    comp.cards = [card1];
    const place1 = [card3, card2],
          place2 = [card4];
    comp.places = [place1, place2];
    comp.currentPlace = place1;
    comp.dropToCards();
    expect(comp.cards).toEqual([card1, card2]);
    expect(comp.places).toEqual([[card3], [card4]]);
  });

  it('should get current task by param id', function(){
    // TODO
  });

  it('the component should have init function', function(){
    // TODO
  });

});
