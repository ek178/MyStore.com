import {Injectable, OnDestroy} from '@angular/core';
import {ConstantsService} from './constant.service';
import * as io from 'socket.io-client';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {share} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SocketIoService implements OnDestroy {
    socketIO: any;
    eventObservables$: Record<string, Observable<any>> = {};
    subscribersCounter: Record<string, number> = {};

    private isInitialized = new ReplaySubject<boolean>(1);

    constructor(private constants: ConstantsService) {
        constants.init();
    }

    init() {
        this.connect();
    }

    ngOnDestroy(): void {
        this.removeAllListener();
        this.disconnect();
    }

    of(namespace: string) {
        this.socketIO.of(namespace);
    }

    on(eventName: string, callback: () => void) {
        this.socketIO.on(eventName, callback);
    }

    once(eventName: string, callback: () => void) {
        this.socketIO.once(eventName, callback);
    }

    protected connect() {
        const options: any = {
            path: '/socket.io',
        };
        const ioFunc = (io as any).default ? (io as any).default : io;
        this.socketIO = ioFunc('ws://localhost:15006', options);
        this.socketIO.connect();
        this.isInitialized.next(true);
        this.isInitialized.complete();
    }

    disconnect(close ?: any) {
        this.socketIO.disconnect.apply(this.socketIO, arguments);
    }

    emit(eventName: string, data ?: any, callback ?: () => void) {
        this.socketIO.emit.apply(this.socketIO, arguments);
    }

    removeListener(eventName: string, callback: () => void) {
        return this.socketIO.removeListener.apply(this.socketIO, arguments);
    }

    removeAllListener(eventName?: string) {
        return this.socketIO.removeallListener.apply(this.socketIO, arguments);
    }

    SubscribeToEvent<T>(eventName: string, callback: any) {
        if (!this.subscribersCounter[eventName]) {
            this.subscribersCounter[eventName] = 0;
        }
        this.subscribersCounter[eventName]++;

        if (!this.eventObservables$[eventName]) {
            this.eventObservables$[eventName] = new Observable((observer: any) => {
                const listener = (data: T) => {
                    observer.next(data);
                };
                this.socketIO.on(eventName, listener);
                return () => {
                    this.subscribersCounter[eventName]--;
                    if (this.subscribersCounter[eventName] === 0) {
                        this.socketIO.removeListener(eventName, listener);
                        delete this.eventObservables$[eventName];
                    }
                };
            }).pipe(share());
        }

        this.eventObservables$[eventName].subscribe(callback);
    }
}
