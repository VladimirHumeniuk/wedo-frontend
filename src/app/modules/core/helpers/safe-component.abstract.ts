import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class SafeComponent implements OnDestroy {
    protected unsubscriber: Subject<{}> = new Subject();
    ngOnDestroy(): void {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }
}
