import React from "react";
import { formatLocalTime } from "../Services/weatherService";

function TimeAndSpace({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-light">
          {formatLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-2xl font-medium">{`${name}`}</p>
      </div>
    </div>
  );
}

export default TimeAndSpace;
