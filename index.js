const weatherform=document.querySelector(".weatherform");
const city=document.querySelector(".city");
const card=document.querySelector(".card");

weatherform.addEventListener("submit",async event=>
{
    event.preventDefault();//dont't refresh page
    const cityname=city.value;
    if(cityname)
    {
         try
         {
               const weatherdata= await getweather(cityname);
               displayinfo(weatherdata);
         }
         catch(error)
         {
            console.error(error);
            displayerror(error);
         }
    }
    else{
        displayerror("please enter city name !");
    }
}
);
async function getweather(city)
{
    
	const url = (`https://weather-api138.p.rapidapi.com/weather?city_name=${city}`);
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': 'baab83dcc4mshf11a325f54a40cfp1ce78djsn9333049bc808',
			'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
		}
	};
const response=await fetch(url,options);
    if(response.ok==true)
    {
        return await response.json();
        
    }
    else{
        throw new Error("city not found !");
    }
}
function displayinfo(data)
{
	console.log(data);
       const {name: city, main:{temp,temp_max,temp_min,humidity},weather:[{description,id}]}=data;
	   card.textContent="";
	   card.style.display="flex";
     const citydisplay=document.createElement("h1");
	 const tempdisplay=document.createElement("p");
     const mindisplay=document.createElement("p");
     const humidisplay=document.createElement("p");
	 const desdisplay=document.createElement("p");
	 const emojidisplay=document.createElement("p");
     const suggestdisplay=document.createElement("p");


	 citydisplay.textContent=city;
	 card.appendChild(citydisplay);


	 tempdisplay.textContent=`${(temp-273.14).toFixed(2)}℃`;
	 tempdisplay.classList.add("tempdisplay");
	 card.appendChild(tempdisplay);

     mindisplay.textContent=`Max:${(temp_max-273.14).toFixed(2)}℃  `+`Min:${(temp_min-273.14).toFixed(2)}℃`;
     mindisplay.classList.add("minmaxdisplay");
	 card.appendChild(mindisplay);
     


	 humidisplay.textContent=`Humidity:${humidity}%`;
	 card.appendChild(humidisplay);

	 desdisplay.textContent=description;
	 desdisplay.classList.add("description");
	 card.appendChild(desdisplay);

     emojidisplay.textContent=getweatheremoji(id);
	 emojidisplay.classList.add("weatheremoji");
	 card.appendChild(emojidisplay);

     suggestdisplay.textContent="Tip: "+getsuggestion(id);
	 suggestdisplay.classList.add("suggestion");
	 card.appendChild(suggestdisplay);
}
function getsuggestion(weatherid)
{
    if(weatherid>=200 && weatherid<=232)
    {
        return "bad weather to go trip 😔";
    }
    else if(weatherid>=300 && weatherid<=321)
    {
        return "likely raining stay indoor 🫠";
    }
    else if(weatherid>=500 && weatherid<=531)
    {
        return "Carry an umbrella ☔";
    }
    else if(weatherid>=600 && weatherid<=622)
    {
        return "cold trip 🥶";
    }
    else if(weatherid>=701 && weatherid<=781)
    {
        return "enjoy misty trip 😗";
    }
    else if(weatherid==800)
    {
        return "enjoy your trip 😉";
    }
    else if(weatherid>=801 && weatherid<=804)
    {
        return "Carry an umbrella and enjoy trip 🏖️";
    }
    else{
        return "❓";
    }

}
function getweatheremoji(weatherid)
{
    if(weatherid>=200 && weatherid<=232)
    {
        return "⛈️";
    }
    else if(weatherid>=300 && weatherid<=321)
    {
        return "🌧️";
    }
    else if(weatherid>=500 && weatherid<=531)
    {
        return "🌧️";
    }
    else if(weatherid>=600 && weatherid<=622)
    {
        return "❄️";
    }
    else if(weatherid>=701 && weatherid<=781)
    {
        return "🌫️";
    }
    else if(weatherid==800)
    {
        return "☀️";
    }
    else if(weatherid>=801 && weatherid<=804)
    {
        return "☁️";
    }
    else{
        return "❓";
    }
}
function displayerror(message)
{
    const errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");
  card.textContent="";
  card.style.display="flex";
  card.appendChild(errordisplay);
}


