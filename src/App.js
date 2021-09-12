import { useEffect, useState } from "react";

import axios from "axios";

const key = process.env.REACT_APP_GEO_KEY;

const reverseGeoUrl = "https://us1.locationiq.com/v1/reverse.php";

const App = () => {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({});
  const [liscenseReady, setliscenseReady] = useState(false);
  const stepDetails = ["Policy Location", "Driver Details", "Vehicle Model"];

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  const advanceStep = (e, step) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = (e, step) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  const advance = (e) => {
    e.preventDefault();
    setliscenseReady(!liscenseReady);
  };

  const getLocationDetails = async (url) => {
    try {
      const res = await axios.get(url);
      const { data } = res;
      const { county } = data.address;
      setInputs({ county });
    } catch (err) {
      console.error(err);
    }
  };

  const getCarModels = async (url) => {
    console.log("fetching models");
    try {
      const res = await axios.get(url);
      const { Results } = res.data;
      console.log("cars: ", Results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("geo not allowed");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const geoUrl = `${reverseGeoUrl}?key=${key}&lat=${latitude}&lon=${longitude}&format=json`;
        const carDataUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json`;
        getLocationDetails(geoUrl);
        getCarModels(carDataUrl);
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>{stepDetails[step - 1]}</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <input
              type="text"
              name="county"
              value={inputs.county || ""}
              onChange={handleChange}
            />
            <button onClick={(e) => advanceStep(e, step)}>Driver Name›</button>
          </div>
        )}
        {step === 2 && !liscenseReady ? (
          <div>
            <button onClick={(e) => prevStep(e, step)}>‹Policy Location</button>
            <div>
              <label>
                First Name{" "}
                <input
                  type="text"
                  name="fname"
                  value={inputs.fname || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Last Name{" "}
                <input
                  type="text"
                  name="lname"
                  value={inputs.lname || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button onClick={(e) => advance(e)}>Liscense Details›</button>
          </div>
        ) : step === 2 && liscenseReady ? (
          <div>
            <button onClick={(e) => advance(e, step)}>‹Driver Name</button>
            <div>
              <label>
                liscense Number{" "}
                <input
                  type="number"
                  name="liscense"
                  value={inputs.liscense || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Expired:
                <input
                  name="isExpired"
                  type="checkbox"
                  checked={inputs.isExpired || false}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button onClick={(e) => advanceStep(e, step)}>Vehicle Make›</button>
          </div>
        ) : null}
        {step === 3 && (
          <div>
            <button onClick={(e) => prevStep(e, step)}>‹Driver Details</button>
            <input
              type="text"
              name="vehicle"
              value={inputs.vehicle || ""}
              onChange={handleChange}
            />
            <input type="submit" value="Get Insurance Quote" />
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
