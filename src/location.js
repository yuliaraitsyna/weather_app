
const GetCustomLocation = () => {
    const search = document.getElementById('search')
    console.log(search)
    let city = search.value.trim()
    console.log("The current location is:" + city)
    return city;
}

const GetCurrentLocation = () => {
    return 'minsk'
}

export {
    GetCurrentLocation,
    GetCustomLocation
};