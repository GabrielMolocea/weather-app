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

			<h1 className="current-weather-main">{data.main.temp}°</h1>
			<span className="weather-detail-value">
				H:{Math.round(data.main.temp_max)}
			</span>
			<span className="weather-detail-value">
				L:{Math.round(data.main.temp_min)}
			</span>

			<div className="weather-images">
				{data.weather[0].description.toLowerCase().includes("clouds") ? (
					<img src="src/assets/cloud.png" alt="Cloud" className="cloud-img" />
				) : (
					<img src="src/assets/sun.png" alt="Sun" className="sun-img" />
				)}
			</div>

			<div className="current-weather-details">
				<span className="weather-detail-value">
					{data.name}, {data.sys.country}
				</span>
				<span className="weather-detail-label">Time:</span>
				<span className="weather-detail-value">{formatDateTime(new Date())}</span>
				<span className="weather-detail-label">Humidity:</span>
				<span className="weather-detail-value">{data.main.humidity}%</span>
				<span className="weather-detail-label">{data.weather[0].main}</span>
			</div>
		</div>
	);
}

export default CurrentWeather;
