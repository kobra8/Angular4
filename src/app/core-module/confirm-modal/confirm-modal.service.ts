import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ConfirmModalService {
    confirmSource$ = new Subject<boolean>();

    confirm(): void {
        this.confirmSource$.next(true);
    }

    decline(): void {
        this.confirmSource$.next(false);
    }
}