import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { takeLast, map, takeUntil, tap } from 'rxjs/operators';
import { SafeComponent } from '../../helpers';

@Component({
  selector: 'wd-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.12s ease-in', style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class RatingComponent extends SafeComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() name: string;
  @Input() rating: number;
  @Input() value: number;
  @Input() voters: number;
  @Input() business: string;

  public isInvalid: boolean;

  constructor() {
    super();
  }

  public rate(event: Event, index: number): void {
    event.preventDefault()

    this.rating = index;
    this.parentForm.controls[this.name].patchValue(index)
  }

  public getWidth(index: number): number | void {
    const rating = this.rating + 1

    if (rating <= index) return null

    if (rating - index < 1) return parseFloat((rating - index * 1).toFixed(2)) * 100

    return 100
  }

  ngOnInit(): void {

    if (this.parentForm) {
      this.parentForm.valueChanges.pipe(
        takeUntil(this.unsubscriber),
        tap(val => {
          return this.isInvalid = val.text.length && val[this.name] === 0
        })
      ).subscribe()
    }

    if (this.value) {
      this.rating = parseFloat(this.value.toFixed(1))

      if (this.parentForm) this.parentForm.controls[this.name].patchValue(this.value)
    }
  }

}
