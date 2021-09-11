import { useEffect } from "react";
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GEO_KEY);

function App() {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("geo not allowed");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(latitude, longitude);
        Geocode.fromLatLng(latitude, longitude).then(
          (response) => {
            const address = response.results[0].formatted_address;
            console.log(address);
          },
          (error) => console.log(error)
        );
      });
    }
  }, []);
  return <div className="App">multi-step form</div>;
}

export default App;
