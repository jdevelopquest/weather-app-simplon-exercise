import getWeatherDescription from "./getWeatherDescription";
import getWeatherIconName from "./getWeatherIconName";

/**
 * Converts weather data returned by **Open‑Meteo** into the **application’s expected format**.
 *
 * The app was originally built around the **OpenWeatherMap “Current weather” response shape**,
 * so this function produces an *OWM-compatible object* using values from an Open‑Meteo payload.
 * Fields that cannot be derived from the provided Open‑Meteo response (or are not used by the app)
 * are intentionally set to `undefined`.
 */
export default (openmeteoWeatherData) => {
    return {
        coord: {
            lon: undefined,
            lat: undefined
        },
        weather: [
            {
                id: openmeteoWeatherData.current.weather_code,
                main: undefined,
                description: getWeatherDescription(openmeteoWeatherData.current.weather_code),
                icon: getWeatherIconName(openmeteoWeatherData.current.weather_code, openmeteoWeatherData.current.is_day)
            }
        ],
        base: undefined,
        main: {
            temp: openmeteoWeatherData.current.temperature_2m,
            feels_like: openmeteoWeatherData.current.apparent_temperature,
            temp_min: undefined,
            temp_max: undefined,
            pressure: undefined,
            humidity: openmeteoWeatherData.current.relative_humidity_2m,
            sea_level: undefined,
            grnd_level: undefined
        },
        visibility: undefined,
        wind: {
            speed: openmeteoWeatherData.current.wind_speed_10m,
            deg: openmeteoWeatherData.current.wind_direction_10m
        },
        clouds: {
            all: undefined
        },
        dt: openmeteoWeatherData.current.valid_at,
        sys: {
            type: undefined,
            id: undefined,
            country: openmeteoWeatherData.country,
            sunrise: openmeteoWeatherData.daily.sunrise,
            sunset: openmeteoWeatherData.daily.sunset
        },
        timezone: openmeteoWeatherData.utc_offset_seconds,
        id: undefined,
        name: openmeteoWeatherData.city,
        cod: undefined
    };
}
