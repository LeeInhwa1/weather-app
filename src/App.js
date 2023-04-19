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

//과제
// 1. 유저가 current location버튼을 누르면 다시 현재 위치 날씨를 볼 수 있다.
// 2. 유저가 버튼을 클릭하면 클릭된 버튼이 표시가 된다.
// 3. try-catch를 이용한 api호출 에러 핸들링도 해보자

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  /**
   * 현재 위치 기반으로 날씨 정보를 받아옴
   */
  const getCurrentLocation = () => {
    console.log("getCurrentLocation");
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재위치 : ", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  /**
   * API 를 호출하여 위도/경도 값 지역의 날씨 정보를 받아온다
   * @param {*} lat 위도
   * @param {*} lon 경도
   */
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=71bc872e1530dfb6a71ab19c3b04d924&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  };

  /**
   * 해당 도시의 날씨 정보를 받아온다
   * @param {*} cityName 도시명
   */
  const getWeatherByCity = async (cityName) => {
    try {
      console.log("getWeatherByCity(", cityName, ")");
      setCity(cityName);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=71bc872e1530dfb6a71ab19c3b04d924&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    console.log("city", city);
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  /**
   * 페이지가 로딩되기 전 실행된다
   * city 값이 없는 경우 현재 위치 정보 날씨
   * city 값이 있는 경우 해당 도시 위치 정보 날씨
   * !! 첫 로딩 시 city 값이 없기 때문에 해당 부분을 판별해주지 않으면 에러가 발생한다
   */
  useEffect(() => {
    console.log("useEffect city", city);
    if (city === "current" || city === "" || city === null) {
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
      ) : !apiError ? (
        <div class="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={city}
            handleCityChange={handleCityChange}
          />
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
