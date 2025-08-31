import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";
import countryService from "./services/countries.js";
import CountryItem from "./components/CountryItem.jsx";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [countryToShow, setCountryToShow] = useState(null);

  // Fetch all countries in API
  useEffect(() => {
    countryService.getAll().then((returnedData) => setCountries(returnedData));
  }, []);

  const handleQuery = (event) => {
    setQuery(event.target.value);
    setCountryToShow(null);
  };

  const getFilteredCountries = () =>
    countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

  const handleContent = () => {
    const filtered = getFilteredCountries();
    const filteredLength = filtered.length;

    if (query.length === 0) return;

    if (filteredLength === 0) return;
    else if (filteredLength === 1) {
      return <CountryItem country={filtered[0]} />;
    } else if (filteredLength >= 2 && filteredLength <= 10) {
      return filtered.map((country) => (
        <p key={country.cca3}>
          {country.name.common}
          <button onClick={() => setCountryToShow(country)}>Show</button>
        </p>
      ));
    } else return <p>Too many matches, specify another filter</p>;
  };

  console.log(countryToShow);
  return (
    <>
      <div>
        <Filter query={query} onChange={handleQuery} />

        {countryToShow ? (
          <CountryItem country={countryToShow} />
        ) : (
          <CountriesList content={handleContent()} />
        )}
      </div>
    </>
  );
}

export default App;
