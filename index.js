// index.js

// Your code here!
async function fetchWeather(state) {
    try {
        const weatherApi = `https://api.weather.gov/alerts/active?area=${state}`;
        console.log('inside fetchWeather');
        const response = await fetch(weatherApi);
        const data = await response.json();
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('inside fetchWeather after fetch');
        console.log(data);
        console.log(data['features'][1]['properties']['headline']);
        await displayAlerts(data).catch(error => {
            console.log('Error displaying alerts:', error);
            document.getElementById('error-message').textContent = error.message;
        });
        document.getElementById('pwaweru').value = '';
    }
    catch (error) {
        console.log('inside catch');
        console.log('Error fetching weather data:', error);
        document.getElementById('error-message').textContent = 'Error fetching weather data: ' + error.message;
    }

}
document.getElementById('fetch-alerts').addEventListener('click', () => {
    const stateInput = document.getElementById('pwaweru').value;

    fetchWeather(stateInput.toUpperCase());
    document.getElementById('pwaweru').value = '';
    
});
async function displayAlerts(data){
   const description =data['title'];
   document.getElementById('current_watches').textContent = `Description: ${description}`;

   document.getElementById('warnings').textContent =  `${data['features'][0]['properties']['description']}`;
   document.getElementById('headline').textContent =  "Headline: " + `${data['features'][0]['properties']['headline']}`;
}