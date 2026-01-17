import GarbageSVG from "./garbageSVG";
import SearchSVG from "./searchSVG";
import "./listOfCities.css";

interface ListOfCitiesProps {
	searchHistory: Array<{ city: string; country: string; timestamp: Date }>;
	onSearch: (city: string, country: string) => void;
	onDelete: (city: string) => void;
}

function ListOfCities({
	searchHistory,
	onSearch,
	onDelete,
}: ListOfCitiesProps) {
	const handleCityClick = (city: string) => {
		const [cityName, country] = city.split(", ");
		onSearch(cityName, country || "");
	};

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: true,
		});
	};

	if (searchHistory.length === 0) {
		return null;
	}

	return (
		<div className="search-history-container">
			<h3 className="search-history-title">Search History</h3>
			<div className="list-cities">
				{searchHistory.map((entry, index) => (
					<div key={index} className="history-item">
						<div className="history-item-content">
							<button
								onClick={() => handleCityClick(entry.city)}
								className="history-item-city-button"
							>
								{entry.city}, {entry.country}
							</button>
							<span className="history-item-timestamp">
								{formatTime(entry.timestamp)}
							</span>
						</div>

						<div className="history-item-actions">
							<button
								onClick={() => handleCityClick(entry.city)}
								className="history-item-search-button"
								title="Search again"
							>
								<SearchSVG />
							</button>
							<button
								onClick={() => onDelete(entry.city)}
								className="history-item-delete-button"
								title="Delete"
							>
								<GarbageSVG />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
export default ListOfCities;
