import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchWeather = async (city: string, country: string) => {
		const apiUrl = ` https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${
			import.meta.env.VITE_WEATHER_API_KEY
		}&units=metric`;

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error("City not found");
			}
			const data = await response.json();
			setWeatherData(data);
		} catch (err) {
			setError((err as Error).message);
			setWeatherData(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<SearchBar onSearch={fetchWeather} />
			<WeatherDisplay
				data={weatherData}
				loading={loading}
				error={error}
				onSearch={fetchWeather}
			/>
		</div>
	);
}

export default App;
