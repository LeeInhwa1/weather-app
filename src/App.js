import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
// 1. 현재 위치 기반의 날씨가 보인다
// 2. 날씨 정보에는 도시, 섭씨, 화씨 날씨 상태정보가 들어간다
// 3. 다섯개의 버튼이 있다 (1개는 현재위치, 다른 4개는 다른 도시)
// 4. 도시 버튼을 클릭할 때 마다 도시별 날씨가 나온다
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const getCurrentLocation = () => {
    console.log("getCurrentLocation");
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재위치 : ", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=71bc872e1530dfb6a71ab19c3b04d924&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async (cityName) => {
    setCity(cityName);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=71bc872e1530dfb6a71ab19c3b04d924&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity(city);
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div class="container">
        <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div class="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      )}
    </div>
  );
}

export default App;
