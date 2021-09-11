import { useEffect, useState } from "react";
import axios from "axios";
const key = process.env.REACT_APP_GEO_KEY;
const reverseGeoUrl = "https://us1.locationiq.com/v1/reverse.php";
function App() {
  const [LocationObject, setLocationObject] = useState();
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("geo not allowed");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const url = `${reverseGeoUrl}?key=${key}&lat=${latitude}&lon=${longitude}&format=json`;
        axios.get(url).then((res) => {
          // console.log(res);
          const { data } = res;
          setLocationObject(data);
        });
      });
    }
  }, []);
  console.log(LocationObject, " location object");
  return <div className="App">multi-step form</div>;
}

export default App;
