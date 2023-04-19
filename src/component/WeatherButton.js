import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, handleCityChange }) => {
  return (
    <div>
      <Button
        id="cl-button"
        variant={`${setCity == null ? "dark" : "warning"}`}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>
      {cities.map((item, index) => (
        <Button
          variant={`${setCity === item ? "dark" : "warning"}`}
          key={index}
          onClick={() => handleCityChange(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
