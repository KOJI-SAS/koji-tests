import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import handlers from './handlers';
import controllers from './controllers';
import { JwtMiddleware } from './shared/middlewares';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherScheduler } from './schedulers/weather.scheduler';

@Module({
  imports: [
    InMemoryDBModule.forRoot({}),
    ScheduleModule.forRoot(),
    CqrsModule,
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
    HttpModule,
  ],
  controllers: controllers,
  providers: [...handlers, WeatherScheduler],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('');
  }
}
