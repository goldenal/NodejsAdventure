import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':location')
  async getWeather(@Param('location') location: string) {
    return this.weatherService.getWeather(location);
  }

  @Get(':location/:date1')
  async getWeatherByDate(
    @Param('location') location: string,
    @Param('date1') date1: string,
    @Query('date2') date2?: string,
  ) {
    return this.weatherService.getWeather(location, date1, date2);
  }
}
