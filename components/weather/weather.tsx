
export default async function Weather() {

    const OPENWEATHER_API_KEY = process.env['OPENWEATHER_API_KEY']
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=53.4631&lon=2.2913&appid=${OPENWEATHER_API_KEY}`, { next: { revalidate: 300 } });
        const data = await response.json();
        console.log(data);
        if (data.cod === 401) {
            return <div>-- C</div>
        }
        else {
            return(<div className="text-white">{`Weather in ${data.name}: ${data.weather[0].description}, ${Math.round(data.main.temp - 273.15)}°C `}</div>) 
        }

    } catch (error) {
        console.log("Error")
    }



}