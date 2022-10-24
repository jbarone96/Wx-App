import { useEffect, useState } from "react";
import "./App.css";
import TopButtons from "./ Components/TopButtons";
import Inputs from "./ Components/Inputs";
import TimeAndSpace from "./ Components/TimeAndSpace";
import Details from "./ Components/Details";
import Forecast from "./ Components/Forecast";
import getFormattedWeather from "./Services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "New York" });
  const [units, setUnits] = useState("imperial");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location...";

      const toaster = toast.loading("Getting weather for " + message);

      await getFormattedWeather({ ...query, units }).then((data) => {
        toast.update(toaster, {
          render: `Successfully loaded weather for ${data.name}, ${data.country}!`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        // setTimeout(() => {
        //   toast.update(toaster, {
        //     render: `Successfully loaded weather for ${data.name}, ${data.country}`,
        //     type: "success",
        //     isLoading: false,
        //     autoClose: 3000,
        //   });
        // }, 500);

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  // const formatBackground = () => {
  //   if (!weather) {
  //     return "from-cyan-500 to-blue-600";
  //   } else {
  //     const threshold = units === "imperial" ? 40 : 85;

  //     if (weather.temp <= threshold) {
  //       return "from-cyan-500 to-blue-600";
  //     } else {
  //       return "from-yellow-700 to-orange-700";
  //     }
  //   }
  // };

  return (
    <>
      <div
        className={`mx-auto max-w-screen-lg shadow-xl mt-4 py-5 px-32 bg-gradient-to-b from-cyan-600 to-blue-500 h-fit shadow-gray-500
        `}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndSpace weather={weather} />
            <Details weather={weather} />
            <Forecast title="HOURLY FORECAST" items={weather.hourly} />
            <Forecast title="DAILY FORECAST" items={weather.daily} />
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // style={{
        //   marginRight: "-100px",
        //   padding: "20px",
        //   width: "375px",
        //   overflow: "hidden",
        // }}
      />
    </>
  );
}

export default App;
