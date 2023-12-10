
export default async function Weather() {

    const OPENWEATHER_API_KEY = process.env['OPENWEATHER_API_KEY']
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=28.7041&lon=77.1025&appid=${OPENWEATHER_API_KEY}`, { next: { revalidate: 300 } });
        const data = await response.json();
        console.log(data);
        if (data.cod === 401) {
            return <div>-- C</div>
        }
        else {
            return <div className="text-white">34</div>
        }

    } catch (error) {
        console.log("Error")
    }



}