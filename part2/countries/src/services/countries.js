import axios from "axios";

/*
/api/all	            All countries
/api/name/{name}	    Search by country’s full name. It can be the common or official value
*/
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

const getByName = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then((response) => response.data);
};

export default { getAll, getByName };
