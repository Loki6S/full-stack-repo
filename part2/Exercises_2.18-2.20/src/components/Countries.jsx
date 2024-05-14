import Country from "./Country"
import DetailedCountryView from './DetailedCountryView';

const Countries = ({ countriesToShow }) => {
    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter.</p>;
    } else if (countriesToShow.length === 1) {
        return <DetailedCountryView country={countriesToShow[0]} />;
    } else {
        return (
            <div>
                {countriesToShow.map((country,index) => (
                    <Country key={index} country={country} /> // Assuming each country has a unique `id`
                ))}
            </div>
        );
    }
}

export default Countries;