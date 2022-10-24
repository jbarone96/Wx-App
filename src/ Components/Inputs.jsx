import React, { useState } from "react";
import { UilSearchAlt, UilLocationArrow } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  // if (reviewData.text == "") {
  //   const toaster = toast.loading(
  //     "Please wait...",
  //     setTimeout(() => {
  //       toast.update(toaster, {
  //         render: "Please fill out all fields!",
  //         type: "error",
  //         isLoading: false,
  //         autoClose: 5000,
  //       });
  //     }, 1500)
  //   );
  // } else {
  //   const toaster = toast.loading(
  //     "Please wait...",
  //     setTimeout(() => {
  //       toast.update(toaster, {
  //         render: "Review posted successfully!",
  //         type: "success",
  //         isLoading: false,
  //         autoClose: 5000,
  //       });
  //     }, 1000)
  //   );
  // }

  const handleSearch = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      const toaster = toast.loading("Getting your current location...", {
        isLoading: true,
      });

      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        toast.update(toaster, {
          render: "Getting weather for current location...",
          hideProgressBar: true,
          isLoading: false,
          autoClose: 2000,
        });

        // toast.update(toaster, {
        //   render: `Successfully loaded weather for ${city.name}, ${city.country}!`,
        //   type: "success",
        //   isLoading: false,
        //   autoClose: 3000,
        // });

        // setTimeout(() => {
        //   toast.update(toaster, {
        //     render: `Successfully loaded weather for ${city.name}`,
        //     type: "success",
        //     isLoading: false,
        //     autoClose: 3000,
        //   });
        // }, 2000);

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
    }
  };

  return (
    <div className="flex flex-row justify-center ">
      <div className="flex flex-row w-3/4 my-6 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          className="text-lg font-light p-2 w-full shadow-lg focus:outline-none capitalize"
          placeholder="Search for city..."
        />
        <UilSearchAlt
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearch}
        />
        <UilLocationArrow
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocation}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="imperial"
          className="text-xl text-white font-light hover:scale-125 transition ease-out"
          onClick={handleUnitChange}
        >
          °F
        </button>
        <p className="text-xl text-white mx-2">|</p>
        <button
          name="metric"
          className="text-xl text-white font-light hover:scale-125 transition ease-out"
          onClick={handleUnitChange}
        >
          °C
        </button>
      </div>
    </div>
  );
}

export default Inputs;
