import { Controller, Get } from '@nestjs/common';
import { RunObserverService } from './run-observer.service';

@Controller('observer')
export class ObserverController {
  constructor(private readonly runObserverService: RunObserverService) {}

  @Get('ping')
  async runObserver(): Promise<void> {
    const localtion = 'Ha Noi'
    return this.runObserverService.runObserver(localtion)
  }
}
