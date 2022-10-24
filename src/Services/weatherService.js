import { DateTime } from "luxon";

const API_KEY = "18e6efde484789eb87ce4c2920ffd03c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}&units=imperial

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecast = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((day) => {
    return {
      title: formatLocalTime(day.dt, timezone, "ccc"),
      temp: day.temp.day,
      icon: day.weather[0].icon,
    };
  });
  hourly = hourly.slice(1, 6).map((hour) => {
    return {
      title: formatLocalTime(hour.dt, timezone, "hh:mm a"),
      temp: hour.temp,
      icon: hour.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeather = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current, minutely, alerts",
    units: searchParams.units,
  }).then(formatForecast);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatLocalTime = (
  secs,
  zone,
  format = "cccc, LLL dd, yyyy' | Current Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const getIcon = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeather;

export { formatLocalTime, getIcon };
