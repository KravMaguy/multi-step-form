import axios from "axios";
const key = process.env.REACT_APP_GEO_KEY;

export async function fetchUserById(id = 1) {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return data;
}

export const getLocationDetails = async (latitude, longitude) => {
  const reverseGeoUrl = "https://us1.locationiq.com/v1/reverse.php";
  const geoUrl = `${reverseGeoUrl}?key=${key}&lat=${latitude}&lon=${longitude}&format=json`;
  const res = await axios.get(geoUrl);
  const { data } = res;
  const { county } = data.address;
  return county;
};
