
const GetCustomLocation = () => {
    const search = document.getElementById('search')
    console.log(search)
    let city = search.value.trim()
    console.log("The current location is:" + city)
    return city;
}

/*const options = {
    enableHighAccuracy: true,
    timeout: 10000, // Increased timeout to 10 seconds
    maximumAge: 0,
};

function success(pos) {
    const crd = pos.coords;
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    // Provide feedback to the user if geolocation retrieval fails
    // For example, display an error message on the UI
}*/

const GetCurrentLocation = () => {
    /*return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position.coords),
            error => reject(error),
            options
        )
    })*/
    return 'minsk'
}

export {
    GetCurrentLocation,
    GetCustomLocation
};