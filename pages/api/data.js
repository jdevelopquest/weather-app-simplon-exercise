import {fetchWeatherApi} from "openmeteo";
import openmeteoFormatToAppFormat from "../../services/openmeteoFormatToAppFormat";

export default async function handler(req, res) {
    try {
        const params = req.body;
        const openMeteoParams = {
            "latitude": params.coordinates.latitude,
            "longitude": params.coordinates.longitude,
            "daily": ["sunrise", "sunset"],
            "current": [
                "temperature_2m",
                "relative_humidity_2m",
                "apparent_temperature",
                "is_day",
                "weather_code",
                "wind_speed_10m",
                "wind_direction_10m"
            ],
            "timezone": "auto",
            "wind_speed_unit": "ms",
            "temperature_unit": "celsius",
            "precipitation_unit": "mm"
        };

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, openMeteoParams);

// Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

// Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();

        const current = response.current();
        const daily = response.daily();

// Define Int64 variables so they can be processed accordingly
        const sunrise = daily.variables(0);
        const sunset = daily.variables(1);

// Note: The order of weather variables in the URL query and the indices below need to match!
        const openmeteoWeatherData = {
            city: params.city,
            country: params.country,
            utc_offset_seconds: utcOffsetSeconds,
            current: {
                valid_at: Number(current.time()), // BigInt to Number
                temperature_2m: current.variables(0).value(),
                relative_humidity_2m: current.variables(1).value(),
                apparent_temperature: current.variables(2).value(),
                is_day: current.variables(3).value(),
                weather_code: current.variables(4).value(),
                wind_speed_10m: current.variables(5).value(),
                wind_direction_10m: current.variables(6).value(),
            },
            daily: {
                sunrise: Number(sunrise.valuesInt64(0)),
                sunset: Number(sunset.valuesInt64(0)),
            },
        };

        res.status(200).json(openmeteoFormatToAppFormat(openmeteoWeatherData));
    } catch (error) {
        res.status(500).json({message: "Cloudy with a chance of technical difficulties."});
    }
}
