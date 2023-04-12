import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';
import {BehaviorSubject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'vex-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductSearchComponent implements AfterViewInit{
  icSearch = icSearch;
  readonly inputAsObs = new BehaviorSubject<string>('');
  @Output() searchProducts: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onKeyUp(newInput: string) {
    this.inputAsObs.next(newInput);
  }

  ngAfterViewInit() {
    this.inputAsObs
        .pipe(debounceTime(150))
        .subscribe(data =>
        this.emitSearchProducts(data)
    );
  }

  emitSearchProducts(data: string) {
    this.searchProducts.emit(data);
  }

}
