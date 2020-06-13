import { Observable, of, UnaryFunction, pipe } from 'rxjs';
import { Loader } from 'src/app/shared/helpers/loader';
import { tap, mergeMap, finalize, switchMap, take } from 'rxjs/operators';

export const trackExecution = <T, U>(key: string, source: (action: T) => Observable<U>, loader = Loader.instance):
    UnaryFunction<Observable<T>, Observable<U>>  => {
    const operator = pipe(
        tap<T>(_ => loader.lock(key)),
        switchMap(source),
        tap(_ => loader.unlock(key)),
        finalize(() => loader.unlock(key))
    )
    return operator;
}