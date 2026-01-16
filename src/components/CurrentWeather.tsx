import type { WeatherData } from "./WeatherDisplay";
import "./currentWeather.css";

interface CurrentWeatherProps {
	data: WeatherData;
}

function CurrentWeather({ data }: CurrentWeatherProps) {
	const formatDateTime = (date: Date) => {
		return date.toLocaleString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: true,
		});
	};

	return (
		<div className="current-weather-container">
			<h2 className="current-weather-title">Today's Weather</h2>

			<div className="current-weather-city">{data.name}</div>

			<h1 className="current-weather-main">{data.weather[0].main}</h1>

			<div className="weather-images">
				{data.weather[0].description.toLowerCase().includes("clouds") ? (
					<img src="src/assets/cloud.png" alt="Cloud" className="cloud-img" />
				) : (
					<img src="src/assets/sun.png" alt="Sun" className="sun-img" />
				)}
			</div>

			<div className="current-weather-details">
				<div className="weather-detail-row">
					<span className="weather-detail-label">Description:</span>
					<span className="weather-detail-value">{data.weather[0].description}</span>
				</div>
				<div className="weather-detail-row">
					<span className="weather-detail-label">Temperature:</span>
					<span className="weather-detail-value">
						{Math.round(data.main.temp)}°C ~ {Math.round(data.main.feels_like)}°C
					</span>
				</div>
				<div className="weather-detail-row">
					<span className="weather-detail-label">Humidity:</span>
					<span className="weather-detail-value">{data.main.humidity}%</span>
				</div>
				<div className="weather-detail-row">
					<span className="weather-detail-label">Time:</span>
					<span className="weather-detail-value">{formatDateTime(new Date())}</span>
				</div>
			</div>
		</div>
	);
}

export default CurrentWeather;
