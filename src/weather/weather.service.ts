import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeather(location: string, date1?: string, date2?: string): Promise<any> {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    if (!apiKey) {
      throw new HttpException('Weather API key not configured', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}`;
    if (date1) {
      url += `/${date1}`;
      if (date2) {
        url += `/${date2}`;
      }
    }
    url += `?key=${apiKey}`;
    try {
      const response$ = this.httpService.get(url).pipe(
        map((res) => res.data),
        catchError((err) => {
          if (err.response && err.response.status === 400) {
            throw new HttpException('Invalid city or date', HttpStatus.BAD_REQUEST);
          }
          throw new HttpException('Failed to fetch weather data', HttpStatus.SERVICE_UNAVAILABLE);
        })
      );
      return await lastValueFrom(response$);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
