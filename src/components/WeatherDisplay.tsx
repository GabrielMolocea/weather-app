import { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import ListOfCities from "./ListOfCities";
import "./weatherDisplay.css"

export interface WeatherData {
	name: string;
	main: {
		temp: number;
		temp_max: number;
		temp_min: number;
		humidity: number;
		pressure: number;
	};
	weather: Array<{
		main: string;
		description: string;
	}>;
	sys: {
		country: string;
	};
}

interface WeatherDisplayProps {
	data: WeatherData | null;
	loading: boolean;
	error: string | null;
	onSearch: (city: string, country: string) => void;
}

function WeatherDisplay({
	data,
	loading,
	error,
	onSearch,
}: WeatherDisplayProps) {
	const [searchHistory, setSearchHistory] = useState<
		Array<{ city: string; timestamp: Date }>
	>([]);

	useEffect(() => {
		if (data) {
			const cityEntry = data.name;
			setSearchHistory((prevHistory) => {
				const updatedHistory = [
					{ city: cityEntry, timestamp: new Date() },
					...prevHistory.filter((entry) => entry.city !== cityEntry),
				];
				return updatedHistory.slice(0, 5);
			});
		}
	}, [data]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div style={{ color: "red" }}>Error: {error}</div>;
	}

	if (!data) {
		return <div className="no-search-data">Search for a city to see weather information</div>;
	}

	const handleDeleteCity = (city: string) => {
		setSearchHistory((prevHistory) =>
			prevHistory.filter((entry) => entry.city !== city)
		);
	};

	return (
		<div className="container">
			<CurrentWeather data={data}/>
			<ListOfCities
				searchHistory={searchHistory}
				onSearch={onSearch}
				onDelete={handleDeleteCity}
			/>
		</div>
	);
}
export default WeatherDisplay;
