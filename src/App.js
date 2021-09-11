import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log(process.env.REACT_APP_GEO_KEY);
  });
  return <div className="App">multi-step form</div>;
}

export default App;
