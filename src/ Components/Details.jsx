import React from "react";
import { UilArrowUp, UilArrowDown } from "@iconscout/react-unicons";
import { TbSunrise, TbSunset } from "react-icons/tb";
import { IoWaterOutline } from "react-icons/io5";
import { SiWindicss } from "react-icons/si";
import { FaThermometerHalf } from "react-icons/fa";
import { formatLocalTime, getIcon } from "../Services/weatherService";

function Details({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-2xl text-white">
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={getIcon(icon)} alt="" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <FaThermometerHalf size={18} className="mr-2" />
            Real Feel:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <IoWaterOutline size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <SiWindicss size={18} className="mr-3" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} mph`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <TbSunrise className="text-lg mb-1" />
        <p className="font-light">
          Rise:
          <span className="font-medium ml-1">
            {formatLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <TbSunset className="text-lg mb-1" />
        <p className="font-light">
          Set:
          <span className="font-medium ml-1">
            {formatLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilArrowUp className="text-lg" />
        <p className="font-light">
          High:
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <UilArrowDown className="text-lg" />
        <p className="font-light">
          Low:
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default Details;
