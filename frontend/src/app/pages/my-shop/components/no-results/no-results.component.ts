import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'vex-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoResultsComponent {

  constructor() { }

}
