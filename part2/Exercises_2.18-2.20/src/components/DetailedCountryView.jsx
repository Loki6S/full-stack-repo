import useWeather from "./Weather";

const DetailedCountryView = ({country}) =>{
    const lat = country.capitalInfo?.latlng[0];
    const long = country.capitalInfo?.latlng[1];
    const { weather,error} = useWeather(lat,long)
    if (error) return <p>Error fetching weather: {error.message}</p>;

    return (<div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital? country.capital[0] : 'No capital available.'}</p>
        <p>area {country.borders? country.area: 'Area not available.'}</p>

        <h3>languages:</h3>
        <Languages country={country}/>
        <img src={country.flag ? country.flag : 'path_to_default_image.jpg'}/>
        <h2> Weather in {country.capital}</h2>
        <p> temperature: {weather} °C</p>
    </div>
    );
    
}

export default DetailedCountryView;


const Languages =({country})=>{
    const langs = Object.values(country.languages)
    return(
        <ul>
        {langs.map((lang,index) => <li key={index}>{lang}</li>)}
        </ul>
    )
}