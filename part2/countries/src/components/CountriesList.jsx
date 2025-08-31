const CountriesList = ({ content }) => {
  return (
    <div>
      {/* {countries.map((country) => (
        <p key={country.cca3}>{country.name.common}</p>
      ))} */}
      {content}
    </div>
  );
};

export default CountriesList;
