import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { catchError, map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

    // Use a cache key based on the request
    const cacheKey = `weather:${location}:${date1 ?? ''}:${date2 ?? ''}`;
    const cached = await this.cacheManager.get<string>(cacheKey);
    console.log(cached ? 'CACHE HIT' : 'CACHE MISS');
    if (cached) {
      return JSON.parse(cached);
    }

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
      const data = await lastValueFrom(response$);
      // Cache for 10 minutes
      await this.cacheManager.set(cacheKey, JSON.stringify(data), 600);
      console.log('CACHE SET');
      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
