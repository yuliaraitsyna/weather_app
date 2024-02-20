import {GetCurrentLocation, GetCustomLocation} from './location'
import GetImage from './img'
const CALL_TYPE = {
    CURRENT: 0,
    CUSTOM: 1,
    WEEK_CURRENT: 2,
    WEEK_CUSTOM: 3,
}

const apiKey = 'e3cfc1d42a0145258d7183312240902'

const GetAPI_url = (location, is_week) => {
    if (is_week) {
        return `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`
    }
    return `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
}

/*function Geocode_url(latitude, longitude, apiKey) {
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
}*/

async function GetData(call_type) {
    try {
        let url
        let location
        switch (call_type) {
            case CALL_TYPE.CURRENT:
                console.log("Current location call")
                location = GetCurrentLocation()
                url = GetAPI_url(location, false)
                    /*.then(async (coordinates) => {
                        let latitude = coordinates.latitude
                        let longitude = coordinates.longitude
                        let google_url = Geocode_url(latitude, longitude, apiKey)
                        const response = await fetch(google_url)
                        if(!response.ok) {
                            throw new Error('Google API respose was not ok')
                        }
                        const data = await response.json()
                        console.log(data)
                    })
                    .catch(error => {
                        console.error('Error:', error.message)
                    })*/
                break;

            case CALL_TYPE.CUSTOM:
                console.log("Custom location call")
                location = GetCustomLocation()
                url = GetAPI_url(location, false)
                break;

            case CALL_TYPE.WEEK_CURRENT:
                console.log("Week current call")
                location = GetCurrentLocation()
                url = GetAPI_url(location, true)
                break;

            case CALL_TYPE.WEEK_CUSTOM:
                console.log("Week custom call")
                location = GetCustomLocation()
                url = GetAPI_url(location, true)
                break;

            default:
                throw new Error('Wrong call type')
        }

        const response = await fetch(url)
        if(!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log(data)
        return data
    }
    catch (error) {
        console.error('Error:', error)
        //show error message under the searchbar
    }
}


const SetData = async (dayData, weekData) => {

    const weatherTypeImg = document.querySelector('.weather-type-img')
    weatherTypeImg.src = dayData.current.condition.icon

    const weatherTypeText = document.querySelector('.weather-type-text')
    weatherTypeText.textContent = dayData.current.condition.text

    const weatherTempC = document.querySelector('.weather-temp-c')
    weatherTempC.textContent = dayData.current.temp_c

    const weatherTempF = document.querySelector('.weather-temp-f')
    weatherTempF.textContent = dayData.current.temp_f

    const weatherHumidity = document.querySelector('.weather-humidity')
    weatherHumidity.textContent = dayData.current.humidity

    const weatherWind = document.querySelector('.weather-wind-speed')
    weatherWind.textContent = dayData.current.wind_kph

    const weatherImg = document.querySelector('.weather-type-img')
    const code = await dayData.current.condition.code
    weatherImg.src = 'weather_app/src/img/day/' + GetImage(code) 
    //array of days
    //setting data with for including temperature and weather type img
    const days = document.querySelectorAll('.day-div')
    days.forEach(async (day, index) => {
        const tempElement = day.querySelector('.temp_c')
        const text = await weekData.forecast.forecastday[index].day.avgtemp_c
        tempElement.textContent = text
        const imgElement = day.querySelector('.weather_condition')
        const code = await weekData.forecast.forecastday[index].day.condition.code
        imgElement.src = 'weather_app/src/img/day/' + GetImage(code) 
    } )

}
export {
    CALL_TYPE,
    GetData,
    SetData,
}