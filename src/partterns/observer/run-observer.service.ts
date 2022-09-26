import { Injectable } from "@nestjs/common";
import { ObserverService } from "./observer.service";
import { SubjectObserverService } from "./subject-observer.service";

@Injectable()
export class RunObserverService {

  runObserver(localtion: string) {
    const subject = new SubjectObserverService()
  
    //create member
    const ironMan = new ObserverService('iron Man')
    const spiderMan = new ObserverService('spider Man')

    //add to Teams
    subject.addObserver(ironMan)
    subject.addObserver(spiderMan)

    //push location
    subject.notify(localtion)
  }
}