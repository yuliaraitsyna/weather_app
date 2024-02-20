import './style.css'
import { CALL_TYPE, GetData, SetData } from './search'

const searchButton = document.getElementById('search-btn')

document.addEventListener('DOMContentLoaded',async () => {
    try {
        const dayData = await GetData(CALL_TYPE.CURRENT)
        const weekData = await GetData(CALL_TYPE.WEEK_CURRENT)
        SetData(dayData);
    } catch (error) {
        console.error('Error:', error)
    }
} )

searchButton.addEventListener('click', async () => {
    console.log("Searching...")
    try {
        const dayData = await GetData(CALL_TYPE.CUSTOM)
        const weekData = await GetData(CALL_TYPE.WEEK_CUSTOM)
        SetData(dayData);
    } catch (error) {
        console.error('Error:', error)
    }
});

