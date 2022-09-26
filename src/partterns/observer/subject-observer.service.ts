import { Injectable } from '@nestjs/common';
import { ObserverService } from './observer.service';

@Injectable()
export class SubjectObserverService {
  observerList: ObserverService[] = []

  constructor() {
    this.observerList = []
  }

  public addObserver(observer: ObserverService) {
    this.observerList.push(observer)
  }

  public notify(location: string): void {
    this.observerList.forEach( observer => {
      observer.updateStatus(location)
    })
  }
}
