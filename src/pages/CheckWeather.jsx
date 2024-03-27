import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';

export default function CheckWeather() {
    const [realTime, setRealTime] = useState(null);
    const [ForeCast, setForeCast] = useState(null);
    const [Search, setSearch] = useState("");
    const [city,setCity]=useState("")
    const [position, setPosition] = useState(null);
  	const [error, setError] = useState(null);


    const fetchRealTime=async ()=>{
        //CHECK IF Search Is Empty
        if(Search === ""){
            alert("Search field is empty");
            return;
        }
        //CHECK IF Search contain number or not
        if(containsNumbers(Search)){
            alert("City Name Contains Numeric contains");
            return;
        }
        //Using fetch api
        const response = await fetch(`https://api.tomorrow.io/v4/weather/realtime?timelines=current&location=${Search}&apikey=EKAqHHJk2tXHA17ui8sP9Mb72Jsrz8dJ`);
        console.log(response);
        if(!response.ok){
            alert("Enter Vaild City Name");
            return;
        }
        const dataJSON = await response.json();
        setRealTime(dataJSON.data);
        setCity(Search)
    }
    //CHECK ForeCast weather
    const fetchForeCast= async ()=>{
        //CHECK IF Search Is Empty
        if(Search === ""){
            alert("Search field is empty");
            return;
        }
        //CHECK IF Search contain number or not
        if(containsNumbers(Search)){
            alert("City Name Contains Numeric contains");
            return;
        }
        const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${Search}&timesteps=1h&units=metric&apikey=EKAqHHJk2tXHA17ui8sP9Mb72Jsrz8dJ`);
        console.log(response);
        //If response is not ok
        if(!response.ok){
            alert("Enter Vaild City Name");
            return;
        }
        const dataJSON = await response.json();
        const hourlyData=dataJSON.timelines.hourly
        const filteredData = [23, 46, 69, 92, 115].map(index => hourlyData[index]);
        setForeCast(filteredData)
        setCity(Search)
    }
    //regex function to check city name contains number
    function containsNumbers(str) {
        return /\d/.test(str);
      }
    //function to execut both fns at ones
    const fetchData = async () => {
        await Promise.all([fetchRealTime(), fetchForeCast()]);
    }

    //options for navigator module of browser
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	  };
    //Navigator Sucess
    function success(pos) {
        const crd = pos.coords;
        setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        accuracy: crd.accuracy
        });
  }
  //function for navigator error
  function errors(err) {
    setError(`ERROR(${err.code}): ${err.message}`);
  }
    //function to get coordinate of user using navigator module
    const getLocation=async()=>{
        if (navigator.geolocation) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                if (result.state === "granted" || result.state === "prompt") {
                  navigator.geolocation.getCurrentPosition(success, errors, options);
                } else if (result.state === "denied") {
                  // Handle denied state
                  setError("Geolocation permission denied.");
                }
              });
          } else {
            setError("Geolocation is not supported by this browser.");
          }console.log(position);

    }
    //using navigator to featch weather using coordinates
    const fetchByCoord=async()=>{
        getLocation();
        if(position==null){
            console.log(error)
            return
        }
        //REALTIME
        const response = await fetch(`https://api.tomorrow.io/v4/weather/realtime?timelines=current&location=${position.latitude},${position.longitude}&apikey=EKAqHHJk2tXHA17ui8sP9Mb72Jsrz8dJ`);
        console.log(response);
        if(!response.ok){
            alert("Enter Vaild Coordinates");
            return;
        }
        const dataJSON1 = await response.json();
        setRealTime(dataJSON1.data);
        //FORECAST
        const response1 = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${position.latitude},${position.longitude}&timesteps=1h&units=metric&apikey=EKAqHHJk2tXHA17ui8sP9Mb72Jsrz8dJ`);
        console.log(response1);
        if(!response1.ok){
            alert("Enter Vaild Coordinates");
            return;
        }
        const dataJSON = await response1.json();
        console.log(dataJSON1)
        const hourlyData=dataJSON.timelines.hourly
        const filteredData = [23, 46, 69, 92, 115].map(index => hourlyData[index]);
        setForeCast(filteredData)
        setCity("Coordinates")
    }

    

  return (
    <div>
        <div class="max-w-md mx-auto mt-5">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input onChange={(e) => setSearch(e.target.value)} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                <div className='absolute end-2.5 bottom-2.5'>
                <button onClick={fetchData} class="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                <button onClick={fetchByCoord} class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Location</button>
                </div>
            </div>
        </div>
        <div>
            {realTime && (
                
               <div className='mt-6 mx-auto flex justify-center items-center'>
                <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt=""/>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{city}'s Real Time Weather:</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Temperature: {realTime.values.temperature}°C</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Humidity: {realTime.values.humidity}</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Wind Direction: {realTime.values.windDirection}</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">WindSpeed: {realTime.values.windSpeed}</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">UvIndex: {realTime.values.uvIndex}</p>
                    </div>
                </a>
               </div> 

            )}
            <h2 className='mt-6 font-bold mx-auto flex justify-center items-center'>FORECAST INFO:</h2>
           {ForeCast && ForeCast.map((forecast, index) => (
                <div key={index} className='mt-6 mx-auto flex justify-center items-center'>
                    <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt="" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{format(new Date(forecast.time), 'dd:MM:yyyy HH:mm:ss')}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Temperature: {forecast.values.temperature}°C</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Humidity: {forecast.values.humidity}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Wind Direction: {forecast.values.windDirection}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Wind Speed: {forecast.values.windSpeed}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">UV Index: {forecast.values.uvIndex}</p>
                        </div>
                    </a>
                </div>
            ))}
            
        </div>
    </div>
  )
}
