import { useState } from "react";
import "./searchBar.css";
import SearchSVG from "./searchSVG";

interface SearchBarProps {
	onSearch: (city: string, country: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [step, setStep] = useState<"city" | "country">("city");

	const handleSearch = () => {
		if (step === "city" && city.trim()) {
			setStep("country");
		} else if (step === "country" && country.trim()) {
			onSearch(city, country);
			setCity("");
			setCountry("");
			setStep("city");
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className="search-bar-container">
			{step === "city" && (
				<input
					className="city-input"
					type="text"
					placeholder="Enter city name"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					onKeyDown={handleKeyPress}
				/>
			)}
			{step === "country" && (
				<input
					className="country-input"
					type="text"
					placeholder="Country name"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					onKeyDown={handleKeyPress}
				/>
			)}
			<button className="search-button" onClick={handleSearch}>
				<SearchSVG />
			</button>
		</div>
	);
}
export default SearchBar;
