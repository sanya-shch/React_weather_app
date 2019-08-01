import React from 'react';
import './App.css';
import Info from "./components/info";
import Form from "./components/weather_form";
import WeatherInfo from "./components/weather_info";

const API_KEY = "4572b6f53eb7732d7bbd00c51edf3362";

class App extends React.Component{

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Input the city."
    };

    gettingWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        if(city){
            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();
            if(data.cod === 200){
                let sunTime = new Date();
                sunTime.setTime(data.sys.sunset);
                let sunset = `${sunTime.getHours()}: ${sunTime.getMinutes()}`;
                sunTime.setTime(data.sys.sunrise);
                let sunrise = `${sunTime.getHours()}: ${sunTime.getMinutes()}`;
                this.setState({
                    temp: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    sunrise: sunrise,
                    sunset: sunset,
                    error: undefined
                });
            }else if(data.cod === "404"){
                this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    sunrise: undefined,
                    sunset: undefined,
                    error: "Not Found"
                });
            }
        }else{
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                sunset: undefined,
                error: "Input the city."
            });
        }
    };

    render(){
        return (
            <div className="App">
                <div className="App-main container">
                    <div className="row">
                        <div className="App-info col-md-5">
                            <Info/>
                        </div>
                        <div className="col-md-7">
                            <div className="App-weather-form">
                                <Form gettingWeather={this.gettingWeather}/>
                            </div>
                            <div className="App-weather-info">
                                <WeatherInfo
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    sunrise={this.state.sunrise}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
