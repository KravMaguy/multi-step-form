import { useEffect, useState } from "react";
import axios from "axios";
const key = process.env.REACT_APP_GEO_KEY;
const reverseGeoUrl = "https://us1.locationiq.com/v1/reverse.php";
function App() {
  const [LocationObject, setLocationObject] = useState();
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setCity(value);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("geo not allowed");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const url = `${reverseGeoUrl}?key=${key}&lat=${latitude}&lon=${longitude}&format=json`;
        axios.get(url).then((res) => {
          const { data } = res;
          const { city } = data.address;
          setLocationObject(data);
          setCity(city);
        });
      });
    }
  }, []);
  // console.log("location object= ", LocationObject);
  return (
    <div className="App">
      <form>
        <label>
          Policy Location
          <input
            type="text"
            name="policy location"
            value={city}
            onChange={handleChange}
          />
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
    </div>
  );
}

export default App;
