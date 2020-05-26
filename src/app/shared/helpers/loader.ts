import { of, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

type Dictionary<T extends DictionaryKey, U> = {
    [K in T]?: U;
}

type DictionaryKey = string | number | symbol;

export class Loader {
    private static _instance: Loader;
    private lockers: Dictionary<string, boolean> = {};

    constructor() {
    }

    public static wrap<T>(observable: Observable<T>, key: string, instance: Loader): Observable<T> {
        return of({}).pipe(
            tap(_ => instance.lock(key)),
            switchMap(_ => observable),
            tap(_ => instance.unlock(key))
        );
    }

    public isLoading(key: string): boolean {
        return this.lockers[key];
    }

    public lock(key: string): void {
        this.set(key, true);
        console.log("Lock", new Date(), key, this.lockers);
    }

    public unlock(key: string): void {
        this.set(key, false);
        console.log("UnLock", new Date(), key, this.lockers);
    }

    public set(key: string, value: boolean) {
        this.lockers[key] = value;
    }

    public static get instance(): Loader {
        return this._instance = Boolean(this._instance)
            ? this._instance
            : new Loader();
    }
}