import { Module } from '@nestjs/common';
import { ObserverService } from './observer/observer.service';
import { ObserverController } from './observer/observer.controller';
import { RunObserverService } from './observer/run-observer.service';

@Module({
  providers: [ObserverService, RunObserverService, RunObserverService],
  controllers: [ObserverController]
})
export class PartternsModule {}
