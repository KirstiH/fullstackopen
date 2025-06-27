// export enum Weather {
//   Sunny = 'sunny',
//   Rainy = 'rainy',
//   Cloudy = 'cloudy',
//   Stormy = 'stormy',
//   Windy = 'windy',
// }

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export const WeatherOptions : Record<Weather, string> = {
    sunny: 'sunny',
    rainy: 'rainy',
    cloudy: 'cloudy',
    stormy: 'stormy',
    windy: 'windy',
}

export const VisibilityOptions : Record<Visibility, string> = {
    great: 'great',
    good: 'good',
    ok: 'ok',
    poor: 'poor',
}

// export enum Visibility {
//   Great = 'great',
//   Good = 'good',
//   Ok = 'ok',
//   Poor = 'poor',
// }

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}